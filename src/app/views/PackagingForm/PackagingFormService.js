import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/store/packaging-form";

export const pagingPackagingForms = (searchObject) => {
  var url = API_PATH + "/search-by-dto";
  return axios.post(url, searchObject);
};

export const getPackagingForm = (id) => {
  let url = API_PATH + "/" + id;
  return axios.get(url);
};

export const createPackagingForm = (obj) => {
  let url = API_PATH + "/save-or-update";
  return axios.post(url, obj);
};

export const editPackagingForm = (obj) => {
  let url = API_PATH + "/save-or-update";
  return axios.post(url, obj);
};

export const deletePackagingForm = (id) => {
  let url = API_PATH + "/delete/" + id;
  return axios.delete(url);
};

export const voidedPackagingForm = (obj) => {
  let url = API_PATH + "/" + obj.id;
  return axios.post(url, obj);
};
