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
pub struct AdminLoginResponse {
    #[serde(rename = "url")]
    pub url: String,
}

impl AdminLoginResponse {
    pub fn new(url: String) -> AdminLoginResponse {
        AdminLoginResponse {
            url,
        }
    }
}

