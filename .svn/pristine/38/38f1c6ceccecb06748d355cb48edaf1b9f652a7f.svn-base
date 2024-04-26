import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/store-source";

export const pagingSources = (searchObject) => {
  var url = API_PATH + "/pagingSources";
  return axios.post(url, searchObject);
};

export const getSource = (id) => {
  let url = API_PATH + "/" + id;
  return axios.get(url);
};

export const createSource = (obj) => {
  let url = API_PATH;
  return axios.post(url, obj);
};

export const editSource = (obj) => {
  let url = API_PATH + "/" + obj.id;
  return axios.put(url, obj);
};

export const deleteSource = (id) => {
  let url = API_PATH + "/" + id;
  return axios.delete(url);
};

export const checkCode = (dto) => {
  var url = API_PATH + "/checkCode";
  return axios.post(url, {...dto});
};
