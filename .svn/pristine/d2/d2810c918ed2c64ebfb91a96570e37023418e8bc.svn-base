import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/stockKeepingUnit";

export const pagingStockKeepingUnits = (searchObject) => {
  var url = API_PATH + "/getPage";
  return axios.post(url, searchObject);
};
export const pagingStockKeepingUnitbyId = (id) => {
  var url = API_PATH + "/get-all-by-product/" + id;
  return axios.post(url);
};

export const getStockKeepingUnit = (id) => {
  let url = API_PATH + "/" + id;
  return axios.get(url);
};

export const createStockKeepingUnit = (obj) => {
  let url = API_PATH;
  return axios.post(url, obj);
};

export const editStockKeepingUnit = (obj) => {
  let url = API_PATH + "/" + obj.id;
  return axios.put(url, obj);
};

export const deleteStockKeepingUnit = (id) => {
  let url = API_PATH + "/" + id;
  return axios.delete(url);
};

export const checkCode = (obj) => {
  let url = API_PATH + "/checkCode";
  return axios.post(url, obj);
};

export const saveStockKeepingUnit = (obj) => {
  if (obj.id) {
    return axios.put(API_PATH + "/" + obj.id, obj);
  }
  return axios.post(API_PATH, obj);
}

export const checkCodeStockKeepingUnit = (obj) => {
  let url = API_PATH + "/checkCode";
  return axios.post(url, obj);
};