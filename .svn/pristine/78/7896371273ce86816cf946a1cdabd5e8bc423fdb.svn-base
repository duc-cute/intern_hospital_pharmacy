import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/store";

export const pagingStores = (searchObject) => {
  var url = API_PATH + "/searchByDto";
  return axios.post(url, searchObject);
};

export const pagingStoresToStore = (searchObject) => {
  var url = API_PATH + "/search-to-store";
  return axios.post(url, searchObject);
};

export const searchByDtoTree = (searchObject) => {
  var url = API_PATH + "/tree/search-by-dto";
  return axios.post(url, searchObject);
};

export const getStore = (id) => {
  let url = API_PATH + "/" + id;
  return axios.get(url);
};

export const saveStore = (obj) =>{
  if (obj.id) {
    return axios.put(API_PATH + "/" + obj.id, obj);
  }
  return axios.post(API_PATH, obj);
}

export const createStore = (obj) => {
  let url = API_PATH;
  return axios.post(url, obj);
};

export const editStore = (obj) => {
  let url = API_PATH + "/" + obj.id;
  return axios.put(url, obj);
};

export const deleteStore = (id) => {
  let url = API_PATH + "/" + id;
  return axios.delete(url);
};

// export const checkCode = (dto) => {
//   var url = API_PATH + "/check-key-code";
//   return axios.post(url, dto);
// };

// export const getByConfigKey = (key) => {
//   let url = API_PATH + "/getByKey/" + key;
//   return axios.get(url);
// }
