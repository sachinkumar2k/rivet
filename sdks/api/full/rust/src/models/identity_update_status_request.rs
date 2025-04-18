/*
 * Rivet API
 *
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.0.1
 *
 * Generated by: https://openapi-generator.tech
 */

#[derive(Clone, Debug, PartialEq, Default, Serialize, Deserialize)]
pub struct IdentityUpdateStatusRequest {
	#[serde(rename = "status")]
	pub status: crate::models::IdentityStatus,
}

impl IdentityUpdateStatusRequest {
	pub fn new(status: crate::models::IdentityStatus) -> IdentityUpdateStatusRequest {
		IdentityUpdateStatusRequest { status }
	}
}
