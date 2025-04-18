use serde::{Deserialize, Serialize};
use std::ops::Deref;

/// Represents the location of an event in history.
#[derive(Debug, Clone, Hash, PartialOrd, Ord, PartialEq, Eq, Serialize, Deserialize)]
pub struct Location(Box<[Coordinate]>);

impl Location {
	pub fn new(raw: Box<[Coordinate]>) -> Self {
		Location(raw)
	}

	pub fn empty() -> Self {
		Location(Box::new([]))
	}

	pub fn root(&self) -> Location {
		self.0
			.iter()
			.take(self.0.len().saturating_sub(1))
			.cloned()
			.collect()
	}

	pub fn tail(&self) -> Option<&Coordinate> {
		self.0.last()
	}

	pub fn join(&self, coordinate: Coordinate) -> Location {
		self.0
			.iter()
			.cloned()
			.chain(std::iter::once(coordinate))
			.collect()
	}
}

impl std::fmt::Display for Location {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(f, "{{")?;

		for (i, coord) in self.0.iter().enumerate() {
			write!(f, "{}", coord)?;

			if i != self.0.len() - 1 {
				write!(f, ", ")?;
			}
		}

		write!(f, "}}")
	}
}

impl Deref for Location {
	type Target = [Coordinate];

	fn deref(&self) -> &Self::Target {
		&self.0
	}
}

impl IntoIterator for Location {
	type Item = Coordinate;
	type IntoIter = std::vec::IntoIter<Coordinate>;

	fn into_iter(self) -> Self::IntoIter {
		self.0.into_vec().into_iter()
	}
}

impl FromIterator<Vec<usize>> for Location {
	fn from_iter<I: IntoIterator<Item = Vec<usize>>>(iter: I) -> Self {
		Location(
			iter.into_iter()
				.map(|v| Coordinate::new(v.into_boxed_slice()))
				.collect(),
		)
	}
}

impl FromIterator<Box<[usize]>> for Location {
	fn from_iter<I: IntoIterator<Item = Box<[usize]>>>(iter: I) -> Self {
		Location(iter.into_iter().map(Coordinate::new).collect())
	}
}

impl FromIterator<Coordinate> for Location {
	fn from_iter<I: IntoIterator<Item = Coordinate>>(iter: I) -> Self {
		Location(iter.into_iter().collect())
	}
}

/// Represents a position within a location.
#[derive(Debug, Clone, Hash, PartialOrd, Ord, PartialEq, Eq, Serialize, Deserialize)]
pub struct Coordinate(Box<[usize]>);

impl Coordinate {
	pub fn new(raw: Box<[usize]>) -> Self {
		Coordinate(raw)
	}

	pub fn simple(int: usize) -> Self {
		Coordinate(Box::new([int]))
	}

	pub fn with_tail(&self, tail: usize) -> Self {
		self.0
			.iter()
			.take(self.0.len().saturating_sub(1))
			.cloned()
			.chain(std::iter::once(tail))
			.collect()
	}

	pub fn head(&self) -> usize {
		*self.0.first().expect("empty coordinate")
	}

	pub fn tail(&self) -> usize {
		*self.0.last().expect("empty coordinate")
	}
}

impl std::fmt::Display for Coordinate {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		for (i, x) in self.0.iter().enumerate() {
			write!(f, "{}", x)?;

			if i != self.0.len() - 1 {
				write!(f, ".")?;
			}
		}

		Ok(())
	}
}

impl IntoIterator for Coordinate {
	type Item = usize;
	type IntoIter = std::vec::IntoIter<usize>;

	fn into_iter(self) -> Self::IntoIter {
		self.0.into_vec().into_iter()
	}
}

impl FromIterator<usize> for Coordinate {
	fn from_iter<I: IntoIterator<Item = usize>>(iter: I) -> Self {
		Coordinate(iter.into_iter().collect())
	}
}

impl Deref for Coordinate {
	type Target = [usize];

	fn deref(&self) -> &Self::Target {
		&self.0
	}
}

// Implements sqlx types for `Location`
mod sqlx {
	use super::Location;

	impl<DB> sqlx::Type<DB> for Location
	where
		DB: sqlx::Database,
		serde_json::Value: sqlx::Type<DB>,
	{
		fn type_info() -> DB::TypeInfo {
			<serde_json::Value as sqlx::Type<DB>>::type_info()
		}

		fn compatible(ty: &DB::TypeInfo) -> bool {
			<serde_json::Value as sqlx::Type<DB>>::compatible(ty)
		}
	}

	impl<'q, DB> sqlx::Encode<'q, DB> for Location
	where
		serde_json::Value: sqlx::Encode<'q, DB>,
		DB: sqlx::Database,
	{
		fn encode_by_ref(
			&self,
			buf: &mut DB::ArgumentBuffer<'q>,
		) -> Result<sqlx::encode::IsNull, sqlx::error::BoxDynError> {
			<serde_json::Value as sqlx::Encode<'q, DB>>::encode(serialize_location(self)?, buf)
		}
	}

	impl<'r, DB> sqlx::Decode<'r, DB> for Location
	where
		sqlx::types::Json<Box<[Box<[usize]>]>>: sqlx::Decode<'r, DB>,
		DB: sqlx::Database,
	{
		fn decode(value: DB::ValueRef<'r>) -> Result<Self, sqlx::error::BoxDynError> {
			let value =
				<sqlx::types::Json<Box<[Box<[usize]>]>> as sqlx::Decode<'r, DB>>::decode(value)?;

			Ok(IntoIterator::into_iter(value.0).collect())
		}
	}

	/// Convert location to json as `number[][]`.
	fn serialize_location(location: &Location) -> Result<serde_json::Value, serde_json::Error> {
		serde_json::to_value(location)
	}
}
