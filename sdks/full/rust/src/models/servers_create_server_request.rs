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
pub struct ServersCreateServerRequest {
    #[serde(rename = "arguments", skip_serializing_if = "Option::is_none")]
    pub arguments: Option<Vec<String>>,
    #[serde(rename = "datacenter")]
    pub datacenter: uuid::Uuid,
    #[serde(rename = "environment", skip_serializing_if = "Option::is_none")]
    pub environment: Option<::std::collections::HashMap<String, String>>,
    #[serde(rename = "image")]
    pub image: uuid::Uuid,
    /// The duration to wait for in milliseconds before killing the server. This should be set to a safe default, and can be overridden during a DELETE request if needed.
    #[serde(rename = "kill_timeout", skip_serializing_if = "Option::is_none")]
    pub kill_timeout: Option<i64>,
    #[serde(rename = "network")]
    pub network: Box<crate::models::ServersCreateServerNetworkRequest>,
    #[serde(rename = "resources")]
    pub resources: Box<crate::models::ServersResources>,
    #[serde(rename = "tags", deserialize_with = "Option::deserialize")]
    pub tags: Option<serde_json::Value>,
    /// A url to send to which events from the server running will be sent
    #[serde(rename = "webhook_url", skip_serializing_if = "Option::is_none")]
    pub webhook_url: Option<String>,
}

impl ServersCreateServerRequest {
    pub fn new(datacenter: uuid::Uuid, image: uuid::Uuid, network: crate::models::ServersCreateServerNetworkRequest, resources: crate::models::ServersResources, tags: Option<serde_json::Value>) -> ServersCreateServerRequest {
        ServersCreateServerRequest {
            arguments: None,
            datacenter,
            environment: None,
            image,
            kill_timeout: None,
            network: Box::new(network),
            resources: Box::new(resources),
            tags,
            webhook_url: None,
        }
    }
}

