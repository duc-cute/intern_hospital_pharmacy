import axios from "axios";
import ConstantList from "app/appConfig";

const API_PATH = ConstantList.API_ENPOINT + "/api/store/category-type";

export const pagingCategoryType = (obj) => {
    const url = API_PATH + "/search-by-dto";
    return axios.post(url, obj);
};

export const getCategoryType = (id) => {
    let url = API_PATH + "/" + id;
    return axios.get(url);
};

// export const createCategoryType = (obj) => {
//     let url = API_PATH;
//     return axios.post(url, obj);
// };
//
// export const editCategoryType = (obj) => {
//     let url = API_PATH + "/" + obj.id;
//     return axios.put(url, obj);
// };

export const createOrUpdateCategoryType = (obj) => {
    let url = API_PATH + "/save-or-update";
    return axios.post(url, obj);
};

export const deleteCategoryType = (id) => {
    let url = API_PATH + "/delete/" + id;
    return axios.delete(url);
};

export const checkCode = (obj) => {
    let url = API_PATH + "/checkCode";
    return axios.post(url, obj);
};
