import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/Lot";
const API_PATH_TRANSACTION = ConstantList.API_ENPOINT + '/api/store-transaction/'

export const pagingLot = (searchObject) => {
    var url = API_PATH + "/searchByDto";
    return axios.post(url, searchObject);
};

export const getLotById = (id) => {
    let url = API_PATH + "/" + id;
    return axios.get(url);
};

export const saveLot = (obj) => {
    if (obj.id) {
        return axios.put(API_PATH + "/" + obj.id, obj);
    } else {
        return axios.post(API_PATH, obj);
    }
}

export const deleteLot = (id) => {
    let url = API_PATH + "/" + id;
    return axios.delete(url);
};

export const getStoreTransactions = (obj) =>  axios.post(API_PATH_TRANSACTION + "get-list-inventory-dto", obj);