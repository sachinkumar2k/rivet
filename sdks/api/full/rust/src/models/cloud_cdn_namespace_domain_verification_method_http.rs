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
pub struct CloudCdnNamespaceDomainVerificationMethodHttp {
	#[serde(rename = "cname_record")]
	pub cname_record: String,
}

impl CloudCdnNamespaceDomainVerificationMethodHttp {
	pub fn new(cname_record: String) -> CloudCdnNamespaceDomainVerificationMethodHttp {
		CloudCdnNamespaceDomainVerificationMethodHttp { cname_record }
	}
}
