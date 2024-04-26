import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/store-transaction";

export const pagingStockOuts = (searchObject) => {
  var url = API_PATH + "/searchByDto";
  return axios.post(url, searchObject);
};

export const getStockOut = (id) => {
  let url = API_PATH + "/" + id;
  return axios.get(url);
};

export const createStockOut = (obj) => {
  let url = API_PATH + "/stock-out";
  return axios.post(url, obj);
};

export const editStockOut = (obj) => {
  let url = API_PATH + "/" + obj.id;
  return axios.put(url, obj);
};

export const deleteStockOut = (id) => {
  let url = API_PATH + "/" + id;
  return axios.delete(url);
};

export const checkCode = (obj) => {
  let url = API_PATH + "/checkCode";
  return axios.post(url, obj);
};


export const saveStockOut = (obj) => {
  if (obj.id) {
    return axios.put(API_PATH + "/" + obj.id, obj);
  } else {
    return axios.post(API_PATH + "/stock-out", obj);
  }
}

export const createGoodsIssueTransactionByRequestId = (storeRequestId) => {
  const dto = {
    storeRequestId,
    warehousingType: window.Configs.DEFAULT_WAREHOUSING_TYPE
  }
  return axios.post(API_PATH + "/create-goods-issue-transaction-by-request-id", dto);
}
