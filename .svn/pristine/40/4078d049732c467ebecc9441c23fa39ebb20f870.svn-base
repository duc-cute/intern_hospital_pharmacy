import axios from "axios";
import ConstantList from "app/appConfig";

const API_PATH = ConstantList.API_ENPOINT + "/api/store/product-usage";

export const pagingProductUsage = (obj) => {
    const url = API_PATH + "/search-by-dto";
    return axios.post(url, obj);
};

export const getProductUsage = (id) => {
    let url = API_PATH + "/" + id;
    return axios.get(url);
};

export const saveOrUpdateProductUsage = (obj) => {
    let url = API_PATH + "/save-or-update";
    return axios.post(url, obj);
};

// export const editProductUsage = (obj) => {
//   let url = API_PATH + "/" + obj.id;
//   return axios.put(url, obj);
// };

export const deleteProductUsage = (id) => {
    let url = API_PATH + "/delete/" + id;
    return axios.delete(url);
};
