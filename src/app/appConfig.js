const APPLICATION_PATH = "/";
module.exports = Object.freeze({
    AUTH_MODE: window.Configs.AUTH_MODE || "Keycloak",
    ROOT_PATH: window.Configs.ROOT_PATH || APPLICATION_PATH,
    ACTIVE_LAYOUT: window.Configs.ACTIVE_LAYOUT || "layout1", //layout1 = vertical, layout2=horizontal
    //  API_ENPOINT: window.Configs.API_ENPOINT || "https://storedemo.globits.net:8072", //online
    API_ENPOINT: window.Configs.API_ENPOINT || "http://localhost:8073", //local
    LOGIN_PAGE: APPLICATION_PATH + "session/signin", //Nếu là Spring
    HOME_PAGE: APPLICATION_PATH + "manage/stock-in", //Nếu là Spring
    LOGOUT_URL: window.Configs.LOGOUT_URL,
    REDIRECT_URL: window.Configs.REDIRECT_URL,
    API_EN_POINT_EMR: window.Configs.API_EN_POINT_EMR || "https://emr-api.globits.net", //local
    EMR_URL: window.Configs.EMR_URL || "https://emr.globits.net",
    PRODUCT_TYPE: window.Configs.PRODUCT_TYPE || "Medicine",
});