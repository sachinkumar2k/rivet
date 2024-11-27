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
pub struct CloudBootstrapResponse {
    #[serde(rename = "access")]
    pub access: crate::models::CloudBootstrapAccess,
    #[serde(rename = "captcha")]
    pub captcha: Box<crate::models::CloudBootstrapCaptcha>,
    #[serde(rename = "cluster")]
    pub cluster: crate::models::CloudBootstrapCluster,
    #[serde(rename = "deploy_hash")]
    pub deploy_hash: String,
    #[serde(rename = "domains")]
    pub domains: Box<crate::models::CloudBootstrapDomains>,
    #[serde(rename = "login_methods")]
    pub login_methods: Box<crate::models::CloudBootstrapLoginMethods>,
    #[serde(rename = "origins")]
    pub origins: Box<crate::models::CloudBootstrapOrigins>,
}

impl CloudBootstrapResponse {
    pub fn new(access: crate::models::CloudBootstrapAccess, captcha: crate::models::CloudBootstrapCaptcha, cluster: crate::models::CloudBootstrapCluster, deploy_hash: String, domains: crate::models::CloudBootstrapDomains, login_methods: crate::models::CloudBootstrapLoginMethods, origins: crate::models::CloudBootstrapOrigins) -> CloudBootstrapResponse {
        CloudBootstrapResponse {
            access,
            captcha: Box::new(captcha),
            cluster,
            deploy_hash,
            domains: Box::new(domains),
            login_methods: Box::new(login_methods),
            origins: Box::new(origins),
        }
    }
}

