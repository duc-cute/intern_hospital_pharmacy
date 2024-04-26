import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/store-administrative-unit";
// const API_PATH_2 = ConstantList.API_ENPOINT + "/api/administrative-unit";

export const pagingAdministratives = (searchObject) => {
  var url = API_PATH + "/searchByDto";
  return axios.post(url, searchObject);
};

export const getAdministrative = (id) => {
  let url = API_PATH + "/" + id;
  return axios.get(url);
};

export const createAdministrative = (obj) => {
  let url = API_PATH;
  return axios.post(url, obj);
};

export const editAdministrative = (obj) => {
  let url = API_PATH + "/" + obj.id;
  return axios.put(url, obj);
};

export const deleteAdministrative = (id) => {
  let url = API_PATH + "/" + id;
  return axios.delete(url);
};

export const checkCode = (dto) => {
  var url = API_PATH + "/checkCode";
  return axios.post(url, { ...dto });
};

export const getAllAdministratives = () => {
  var url = API_PATH + "/getAllAdministratives";
  return axios.get(url);
};

export const getRootUnit = (searchObject) => {
  var url = API_PATH + "/getRootUnit";
  return axios.post(url, searchObject);
};

export const getAllByLevel = (level) => {
  var url = API_PATH + "/getAllByLevel/" + level;
  return axios.get(url);
}

export const getAllChildByParentId = (id) => {
  var url = API_PATH + "/getAllChildByParentId/" + id;
  return axios.get(url);
}
