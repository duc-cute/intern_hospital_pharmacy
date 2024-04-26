import axios from "axios";
import ConstantList from "../../appConfig";
import UserService from "app/services/UserService";
const API_PATH = ConstantList.API_ENPOINT + "/api/users/";
const API_PATH_ROLE = ConstantList.API_ENPOINT + "/api/roles/";
const API_NEW_PATH = ConstantList.API_ENPOINT + "/api/store-user/ext/";
const API_PATH_STORE = ConstantList.API_ENPOINT + "/api/store-user/";
const API_STORE_ORG = ConstantList.API_ENPOINT + "/api/storeOrganizationUser/";
const API_PATH_USER_ORGANIZATION = ConstantList.API_ENPOINT + "/api/user_health_organization/";
const API_PATH_USER_ADMINISTRATIVE_UNIT = ConstantList.API_ENPOINT + "/api/user-administrative-unit/";

export const pagingStoreOrganizationUser = obj => axios.post(API_STORE_ORG + "searchUserDto", obj)
export const pagingUsers = (obj) => {
  var url = API_PATH + obj.pageIndex + "/" + obj.pageSize;
  return axios.get(url);
};

export const pagingUsersSearch = (obj) => {
  var url = API_PATH + 'search/' + obj.pageIndex + "/" + obj.pageSize;
  return axios.post(url, obj);
};

export const findUserByUserName = (username, page, pageSize) => {
  var params = "username/" + username + "/" + page + "/" + pageSize;
  var url = API_PATH + params;
  return axios.get(url);
};
export const pagingNewUsers = (searchObject) => {
  var url = API_NEW_PATH + "pagingUsers";
  return axios.post(url, searchObject);
};

export const getAllRoles = () => {
  var url = API_PATH_ROLE + 'all';
  return axios.get(url);
};

export const getUser = id => {
  var url = API_PATH + id;
  return axios.get(url);
};

export const getUserByUsername = (username) => {
  const config = { params: { username: username } };
  var url = API_PATH;
  return axios.get(url, config);
};

export const getUserByEmail = (email) => {
  var params = "e/" + email;
  var url = API_PATH + params;
  return axios.get(url);
};

export const saveUser = user => {
  return axios.post(API_PATH, user);
};

export const deleteUser = id => {
  return axios.delete(API_PATH + id);
};
export const deleteById = id => {
  return axios.delete(API_NEW_PATH + "deleteById/" + id);
}
export const deleteListUser = (listIds) => {
  var url = API_NEW_PATH + "deleteList";
  return axios.delete(url, listIds);
};
export const saveUserKeyCloak = user => {
  return axios.post(API_NEW_PATH + "createUserKeyCloak", user);
};
export const createUserOrganizationKeyCloak = user => {
  return axios.post(API_NEW_PATH + "create-user-organization-key-cloak", user);
}
export const getCurrentUserName = () => {
  return axios.get(API_NEW_PATH + "get-current-user-name");
};

export const getCurrentUser = () => {
  return axios.get(API_NEW_PATH + "getCurrentUserName");
};

export const saveStoreManagement = (obj) => {
  var url = API_PATH_STORE + "save-list-store";
  return axios.post(url, obj);
}

export const getListStoreByUser = (userId) => {
  var url = API_PATH_STORE + "getByUser/" + userId;
  return axios.get(url);
}

export const getListStoreByCurrentUser = () => {
  var url = API_PATH_STORE + "get-list-store-by-current-user";
  return axios.get(url);
}

export const deleteStoreUser = (idStore) => {
  var url = API_PATH_STORE + "delete/" + idStore;
  return axios.delete(url);
}

export const updateViewAble = (obj) => {
  var url = API_PATH_STORE + "update-view-able";
  return axios.post(url, obj);
}

export const updateEditAble = (obj) => {
  var url = API_PATH_STORE + "update-edit-able";
  return axios.post(url, obj);
}

export const updateViewAbleAll = (obj) => {
  var url = API_PATH_STORE + "update-view-able-all";
  return axios.post(url, obj);
}

export const updateEditAbleAll = (obj) => {
  var url = API_PATH_STORE + "update-edit-able-all";
  return axios.post(url, obj);
}

export const changePasswordSelf = user => {
  var url = API_NEW_PATH + "resetPassword/self";
return axios.put(url, user);
};

export const resetPasswordUserKeyCloak = user => {
  var url = API_NEW_PATH + "resetPasswordUserKeyCloak";
return axios.post(url, user);
};

const uninterceptedAxiosInstance = axios.create();
uninterceptedAxiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${UserService.getToken()}`;
  return Promise.resolve(config);
});
export const getNotification = () => {
  return uninterceptedAxiosInstance.post(API_NEW_PATH + "getNotification");
};


export const getListStoreOrganizationByUser = (userId) => {
  var url = API_STORE_ORG + "getByUser/" + userId;
  return axios.get(url);
}

export const createUserOrganizationKeyCloakSuper = user => {
  return axios.post(API_NEW_PATH + "create-user-organization-key-cloak/" + user.storeOrganizationId, user);
}

export const pagingUserStoreOrganization = (searchObject) => {
  var url = API_NEW_PATH + "pagingUserStoreOrganization";
  return axios.post(url, searchObject);
};

export const pagingUserHealthOrg = (searchObject) => {
  var url = API_PATH_USER_ORGANIZATION + "pagingUserHealthOrg";
  return axios.post(url, searchObject);
};

export const getListUserHealthOrgByUserId = (userId) => {
  var url = API_PATH_USER_ORGANIZATION + "getListUserHealthOrg/" + userId;
  return axios.get(url);
}

export const getListUserAdministrativeUnitByUserId = (userId) => {
  var url = API_PATH_USER_ADMINISTRATIVE_UNIT + "get-list-user-administrative-unit/" + userId;
  return axios.get(url);
};

export const saveListStoreOrganizationByUser = (obj) => {
  var url = API_STORE_ORG + "save-list-store-organization";
  return axios.post(url, obj);
}

export const deleteStoreOrganizationUser = (id) => {
  var url = API_STORE_ORG + id;
  return axios.delete(url);
}