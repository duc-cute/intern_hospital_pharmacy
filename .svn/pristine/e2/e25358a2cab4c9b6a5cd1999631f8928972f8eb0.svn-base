import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/bidding-package";

export const pagingBiddingPackages = (searchObject) => {
  var url = API_PATH + "/paging-bidding-package";
  return axios.post(url, searchObject);
};

export const getBiddingPackage = (id) => {
  let url = API_PATH + "/" + id;
  return axios.get(url);
};

export const createBiddingPackage = (obj) => {
  let url = API_PATH;
  return axios.post(url, obj);
};

export const editBiddingPackage = (obj) => {
  let url = API_PATH + "/" + obj.id;
  return axios.put(url, obj);
};

export const deleteBiddingPackage = (id) => {
  let url = API_PATH + "/" + id;
  return axios.delete(url);
};

