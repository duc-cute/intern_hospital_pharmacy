import axios from "axios";
import ConstantList from "app/appConfig";

const API_PATH = ConstantList.API_ENPOINT + "/api/store-category";

export const pagingCategories = (obj) => {
    var url = API_PATH + "/paging";
    return axios.post(url, obj);
};

export const getCategory = (id) => {
    let url = API_PATH + "/" + id;
    return axios.get(url);
};

export const getListTreeCategory = (obj) => {
    let url = API_PATH + "/list-tree";
    return axios.post(url, obj);
};

export const createCategory = (obj) => {
    let url = API_PATH;
    return axios.post(url, obj);
};

export const editCategory = (obj) => {
    let url = API_PATH + "/" + obj.id;
    return axios.put(url, obj);
};

export const deleteCategory = (id) => {
    let url = API_PATH + "/" + id;
    return axios.delete(url);
};

export const checkCode = (obj) => {
    let url = API_PATH + "/checkCode";
    return axios.post(url, obj);
};

export const getListBy = dto => axios.post(API_PATH + "/list-by-dto", dto);
