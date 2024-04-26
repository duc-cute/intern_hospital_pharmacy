import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/supplier";

export const pagingSuppliers = (searchObject) => {
  var url = API_PATH + "/searchByDto";
  return axios.post(url, searchObject);
};

export const getSupplier = (id) => {
  let url = API_PATH + "/" + id;
  return axios.get(url);
};

export const createSupplier = (obj) => {
  let url = API_PATH;
  return axios.post(url, obj);
};

export const editSupplier = (obj) => {
  let url = API_PATH + "/" + obj.id;
  return axios.put(url, obj);
};

export const deleteSupplier = (id) => {
  let url = API_PATH + "/" + id;
  return axios.delete(url);
};

export const checkCode = (obj) => {
  let url = API_PATH + "/checkCode";
  return axios.post(url, obj);
};
