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
pub struct GamesServersGetServerResponse {
    #[serde(rename = "server")]
    pub server: Box<crate::models::GamesServersServer>,
}

impl GamesServersGetServerResponse {
    pub fn new(server: crate::models::GamesServersServer) -> GamesServersGetServerResponse {
        GamesServersGetServerResponse {
            server: Box::new(server),
        }
    }
}

