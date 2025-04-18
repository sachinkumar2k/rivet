# Gotchas

## Timestamps

Use timestamps with care when passing them between activity inputs/outputs. Because activity inputs need to be
consistent for replays, use `util::timestamp::now()` only within activities and not workflow bodies.

If you need a timestamp in a workflow body, use `ctx.create_ts()` for the creation of the workflow. Using
`ctx.ts()` is also inconsistent because it marks the start of the current workflow run (which is different
between replays).

If you need a consistent current timestamp, create a new activity that just returns `util::timestamp::now()`.
This will be the current timestamp on the first execution of the activity and won't change on replay.

> **When an activity's input doesn't produce the same hash as the first time it was executed (i.e. its input
> changed), the entire workflow will error with "History Diverged" and will not restart.**

## Randomly generated content

Randomly generated content like UUIDs should be placed in activities for consistent history.

## Stale data

When fetching data for use in a workflow, you will most often put it in an activity for retryability. However,
depending on how much later the data from the activity is used, it may become stale. Make sure to add another
activity where needed when you need more up-to-date info.

## Spawning a thread

You should not use `tokio::spawn` to execute workflow code. Instead, dispatch a new workflow and await it for
its output.

## Consistency with concurrency

When you need to run multiple workflow events (like activities or signals) in parallel, be careful that you
ensure the state of the context is consistent between replays.

Take this example trying to concurrently run multiple activities:

```rust
let iter = actions.into_iter().map(|action| {
	let ctx = ctx.clone();

	async move {
		ctx.activity(MyActivityInput {
			action,
		}).await?;
	}
	.boxed()
});

futures_util::stream::iter(iter)
	.buffer_unordered(16)
	.try_collect::<Vec<_>>()
	.await?;
```

This will error because of the `ctx.clone()`; each activity has the same internal location because none of the
ctx's know about each other\*.

Instead, you can increment the location preemptively with `ctx.step()`:

```rust
let iter = actions.into_iter().map(|action| {
	let mut ctx = ctx.step();

	async move {
		ctx.activity(MyActivityInput {
			action,
		}).await?;
	}
	.boxed()
});

futures_util::stream::iter(iter)
	.buffer_unordered(16)
	.try_collect::<Vec<_>>()
	.await?;
```

If you plan on running more than one workflow step in each future, use a `closure` stub.

Note that the first example would also work with a `closure`, but its a bit overkill as it creates a new layer
in the internal location.

> **\*** Even if they did know about each other via atomics, there is no guarantee of consistency from
> `buffer_unordered`. Preemptively incrementing the location ensures consistency regardless of the order or
> completion time of the futures.

## Hashmaps in activity inputs/outputs

`std::collections::HashMap` does not implement `Hash`. To get around this, use `util::serde::HashableMap`:

```rust
use util::serde::AsHashableExt;
ctx
	.activity(MyActivityInput {
		map: input.map.as_hashable(),
	})
	.await?;
```

## Nested options with serde

Nested options do not serialize/deserialize consistently with serde.

```rust
Some(Some(1234)) -> "1234" -> Some(Some(1234))
Some(None)		 -> "null" -> None
None			 -> "null" -> None
```

Be careful when writing your struct definitions.

## Force waking a sleeping workflow

When force waking a sleeping workflow by setting `wake_immediate = true`, know that if the workflow is
currently on a `sleep` step it will go back to sleep if it has not reached its `wake_deadline` yet. For all
other steps, the workflow will continue normally (usually just go back to sleep).

## Long-lived tasks in `ctx.join`

When executing multiple long-lived activities in a `ctx.join` call using a tuple, remember that internally it
uses `tokio::join!` and not `tokio::try_join`. This means it will wait until all items finish and does not
short circuit when an `Err` is returned from any branch.

So if you have an activity that errors immediately and another that takes a while to finish, the `ctx.join`
call will wait until the long task is complete (or errors) before returning.

## Adding a new sub workflow or closure (branching steps) to an existing workflow

Be careful that your correctly set the version of new branching steps (sub workflows, closures) so as to not
corrupt the history state.

Branching steps are unique in that it is possible to corrupt the workflow if you incorrectly set their version
when patching a workflow. For all other step types, the workflow engine will error before any changes to the
history are made.

**Example**

```rust
fn my_workflow() {
	ctx.activity(Foo);

	ctx.workflow(OtherWorkflow).run();

	ctx.activity(Lorem);
}

fn other_workflow() {
	ctx.activity(Bar);
	ctx.activity(Baz);
}
```

**After patching**

```rust
fn my_workflow() {
	ctx.activity(Foo);

	// Forgot to update version to 2
	ctx.workflow(OtherWorkflow2).run();
	ctx.workflow(OtherWorkflow).run();

	ctx.activity(Lorem);
}

fn other_workflow() {
	ctx.activity(Bar);
	ctx.activity(Baz);
}

fn other_workflow2() {
	ctx.v(2).activity(UpdatedBar);
	// No baz
}
```

The workflow engine does not know the difference between one branch or another. When running `OtherWorkflow2`,
it will enter a branched context which it assumes is the same as the `OtherWorkflow` branch it ran previously.
It will proceed to add `UpdatedBar` as a patch, and then error after it sees that `Bar` and `Baz` no longer
exist in the branch.

This means the history is now corrupt, as `UpdatedBar` was inserted before an error was thrown.

**Correct Code**

```rust
fn my_workflow() {
	ctx.activity(Foo);

	ctx.v(2).workflow(OtherWorkflow2).run();
	ctx.workflow(OtherWorkflow).run();

	ctx.activity(Lorem);
}

fn other_workflow() {
	ctx.activity(Bar);
	ctx.activity(Baz);
}

fn other_workflow2() {
	ctx.v(2).activity(UpdatedBar);
	// No baz
}
```

> Closures and sub workflows function in the same way. They create a new branch in history.

## Hashes for single-variant enum values

Rust does not hash the enum discriminant for single-variant enums. This means when you add another variant in
the future, the hash of the existing variant will change.

This can be fixed with a custom `Hash` impl when you only have 1 variant:

```rust
impl Hash for ENUM {
	fn hash<H: Hasher>(&self, state: &mut H) {
		std::mem::discriminant(self).hash(state);
		// ... Hash enum fields, if any
	}
}
```
