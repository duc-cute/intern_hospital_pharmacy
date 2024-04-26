import axios from "axios";
import localStorageService from "./localStorageService";
import Config from "app/appConfig";
import UserService from "../services/UserService";
import { getListStoreByCurrentUser } from "app/views/User/UserService"
import history from "history.js";

const API_PATH = Config.API_ENPOINT + "/api/store-user/ext";
const config = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: "Basic Y29yZV9jbGllbnQ6c2VjcmV0",
  },
};
class JwtAuthService {

  getCurrentUser = async () => {
    let url = API_PATH + "/getCurrentUserName";
    let response = await axios.get(url);
    await this.setUser(response.data)
    return response.data;
  };

  loginWithUserNameAndPassword = (username, password) => {
    let requestBody = "client_id=core_client&grant_type=password&client_secret=secret";
    requestBody = requestBody + "&username=" + username + "&password=" + password;
    return axios.post(Config.API_ENPOINT + "/oauth/token", requestBody, config)
      .then((response) => {
        const tokenExpriredTime = new Date(Date.now() + response.data.expires_in * 1000);

        localStorageService.setItem("tokenExpiredTime", tokenExpriredTime);

        this.setSession(response.data.access_token);
        this.setLoginUser(response.data);
      });
  };

  loginWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(this.user), 1000);
    }).then((data) => {
      this.setUser(data);
      this.setSession(data.token);
      return data;
    });
  };

  loginWithToken = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(this.user), 100);
    }).then((data) => {
      this.setSession(data.token);
      this.setUser(data);
      return data;
    });
  };

  logout = async () => {
    try {
      await axios.post(API_PATH + "/remove-permission");
    } catch (err) {
      console.error(err);
    }

    if (Config.AUTH_MODE === "Keycloak") {
      UserService.doLogout();
    }

    this.setSession(null);
    this.removeUser();

    if (Config.LOGOUT_URL) {
      window.location.href = Config.LOGOUT_URL;
    } else {
      history.push(Config.HOME_PAGE);
    }
  };

  setSession(token) {
    if (token) {
      localStorageService.setItem("jwt_token", token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    } else {
      localStorage.removeItem("jwt_token");
      delete axios.defaults.headers.common["Authorization"];
    }
  }

  setLoginUser = (data) => {
    let user = {};
    user.token = data.access_token;
    localStorageService.setItem("auth_user", user);
    return user;
  };

  //set token
  setLoginToken = (data) => {
    localStorageService.setItem("auth_token", data);
  };

  setUser = async (user) => {
    try {
      this.removeUser();

      if (!user?.userPermissionDto?.orgId) {
        const org = user?.userPermissionDto?.orgs?.find(item => item.orgProductType === Config.PRODUCT_TYPE);

        if (org) {
          axios.post(API_PATH + '/select-org/' + org.id);
          user.userPermissionDto.orgId = org.id;
          user.userPermissionDto.orgName = org.name;
          user.userPermissionDto.productType = org.productType;
        }
      }

      if (!user?.userPermissionDto?.orgId && Config.REDIRECT_URL) {
        history.push(Config.REDIRECT_URL);
      }

      document.title = "Quản lý kho | " + user.userPermissionDto.orgName;

      localStorageService.setItem("auth_user", user);
      if (user?.roles?.some(role => role.authority === "ROLE_ADMIN")) {
        localStorageService.setItem("is_admin", true);
      }

      const res = await getListStoreByCurrentUser();
      localStorageService.setItem("list_store", res?.data);

      if (res?.data?.length >= 0) {
        localStorageService.setItem("current_store", res?.data?.[0]);
        localStorageService.setItem("is_store", true);
      }

    } catch (error) {
      console.error(error);
    }
  };

  removeUser = () => {
    localStorage.removeItem("auth_user");
    localStorage.removeItem("is_admin");
    localStorage.removeItem("list_store");
    localStorage.removeItem("current_store");
    localStorage.removeItem("is_store");

    sessionStorage.removeItem("shiftWorkChange")
  };
}

const jwtAuthService = new JwtAuthService();
export default jwtAuthService;
