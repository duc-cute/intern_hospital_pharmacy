import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/active-ingredient";

export const pagingActiveIngredients = (searchObject) => {
  var url = API_PATH + "/paging-active-ingredient";
  return axios.post(url, searchObject);
};

export const getActiveIngredient = (id) => {
  let url = API_PATH + "/" + id;
  return axios.get(url);
};

export const createActiveIngredient = (obj) => {
  let url = API_PATH;
  return axios.post(url, obj);
};

export const editActiveIngredient = (obj) => {
  let url = API_PATH + "/" + obj.id;
  return axios.put(url, obj);
};

export const deleteActiveIngredient = (id) => {
  let url = API_PATH + "/" + id;
  return axios.delete(url);
};

