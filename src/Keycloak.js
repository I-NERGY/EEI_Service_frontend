import Keycloak from "keycloak-js";

// local configuration
const my_keycloak = new Keycloak({
    "realm": "inergy",
    "url": "https://oblachek.eu:8443/",
    "clientId": "uc13"
})

// ICCS deployment configuration
// const my_keycloak = new Keycloak({
//     "realm": "inergy",
//     "url": "https://oblachek.eu:8443/",
//     "clientId": "uc13_iccs_deployment"
// })

export default my_keycloak