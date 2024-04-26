import axios from "axios";
import ConstantList from "app/appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/store-transaction";

export const pagingStockIns = (searchObject) => {
  var url = API_PATH + "/searchByDto";
  return axios.post(url, searchObject);
};

export const getStockIn = (id) => {
  let url = API_PATH + "/" + id;
  return axios.get(url);
};

export const createStockIn = (obj) => {
  let url = API_PATH + "/stock-in";
  return axios.post(url, obj);
};

export const editStockIn = (obj) => {
  let url = API_PATH + "/" + obj.id;
  return axios.put(url, obj);
};

export const deleteStockIn = (id) => {
  let url = API_PATH + "/" + id;
  return axios.delete(url);
};

export const checkCode = (obj) => {
  let url = API_PATH + "/checkCode";
  return axios.post(url, obj);
};

export const saveStockIn = (obj) => {
  if (obj.id) {
    return axios.put(API_PATH + "/" + obj.id, obj);
  } else {
    return axios.post(API_PATH + "/stock-in", obj);
  }
}

export const updateTransactionStatus = (obj) => {
  let url = API_PATH + "/update-transaction-status";
  return axios.post(url, obj);
}
