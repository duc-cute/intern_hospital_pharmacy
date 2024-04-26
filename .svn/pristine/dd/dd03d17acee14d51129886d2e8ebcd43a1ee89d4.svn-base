import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/attribute";

export const pagingAttributes = (searchObject) => {
  var url = API_PATH + "/paging-attribute";
  return axios.post(url, searchObject);
};

export const getAttribute = (id) => {
  let url = API_PATH + "/" + id;
  return axios.get(url);
};

export const createAttribute = (obj) => {
  let url = API_PATH;
  return axios.post(url, obj);
};

export const editAttribute = (obj) => {
  let url = API_PATH + "/" + obj.id;
  return axios.put(url, obj);
};

export const deleteAttribute = (id) => {
  let url = API_PATH + "/" + id;
  return axios.delete(url);
};

