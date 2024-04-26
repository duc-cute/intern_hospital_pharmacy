import axios from "axios";
import ConstantList from "../../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/serviceRequestForm";

export const pagingServiceRequestForm = (searchObject) => {
  var url = API_PATH + "/searchByDto";
  return axios.post(url, searchObject);
};

export const getServiceRequestForm = (id) => {
  let url = API_PATH + "/" + id;
  return axios.get(url);
};

export const createServiceRequestForm = (obj) => {
  let url = API_PATH;
  return axios.post(url, obj);
};

export const editServiceRequestForm = (obj) => {
  let url = API_PATH + "/" + obj.id;
  return axios.put(url, obj);
};

export const deleteServiceRequestForm = (id) => {
  let url = API_PATH + "/" + id;
  return axios.delete(url);
};

