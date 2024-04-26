import axios from "axios";
import ConstantList from "app/appConfig";

const API_PATH = ConstantList.API_ENPOINT + "/api/store/country";

export const pagingCountry = (obj) => {
    const url = API_PATH + "/search-by-dto";
    return axios.post(url, obj);
};

export const pagingAllCountry = (obj) => {
    const url = API_PATH + "/list-by-dto";
    return axios.post(url, obj);
};

export const getCountry = (id) => {
    let url = API_PATH + "/" + id;
    return axios.get(url);
};

export const saveOrUpdateCountry = (obj) => {
    let url = API_PATH + "/save-or-update";
    return axios.post(url, obj);
};

// export const editCountry = (obj) => {
//   let url = API_PATH + "/" + obj.id;
//   return axios.put(url, obj);
// };

export const deleteCountry = (id) => {
    let url = API_PATH + "/delete/" + id;
    return axios.delete(url);
};
