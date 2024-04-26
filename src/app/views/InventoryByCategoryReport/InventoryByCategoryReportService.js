import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/store-report";

export const pagingInventoryReports = (searchObject) => {
  var url = API_PATH + "/inventory-by-category";
  return axios.post(url, searchObject);
};

export const getInventoryReport = (id) => {
  let url = API_PATH + "/" + id;
  return axios.get(url);
};

export const createInventoryReport = (obj) => {
  let url = API_PATH;
  return axios.post(url, obj);
};

export const editInventoryReport = (obj) => {
  let url = API_PATH + "/" + obj.id;
  return axios.put(url, obj);
};

export const deleteInventoryReport = (id) => {
  let url = API_PATH + "/" + id;
  return axios.delete(url);
};

export const checkCode = (obj) => {
  let url = API_PATH + "/checkCode";
  return axios.post(url, obj);
};


export const exportInputOutputInventoriesReport = (obj) => {
  let url = ConstantList.API_ENPOINT + "/api/store-transaction/export-input-output-inventories-report";
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: obj,
  });
}
