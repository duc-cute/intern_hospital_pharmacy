import axios from "axios";
import Config from "../../appConfig";

const API_PATH = Config.API_ENPOINT + "/api/product";
const FILE_PATH = Config.API_ENPOINT + "/api/store-file";

export const pagingProducts = (searchObject) => axios.post(API_PATH + "/searchByDto", searchObject);

export const getProduct = (id) => axios.get(API_PATH + "/" + id);

export const createProduct = (obj) => axios.post(API_PATH, obj);

export const editProduct = (obj) => axios.post(API_PATH + "/save-or-update-drug", obj);

export const saveOrUpdateDrug = (drug) => axios.post(API_PATH + '/save-or-update-drug', drug)

export const deleteProduct = (id) => axios.delete(API_PATH + "/" + id);

export const checkCode = (obj) => axios.post(API_PATH + "/checkCode", obj);


export const uploadFile = (file) => {
  let formData = new FormData();
  formData.append("uploadfile", file); //Lưu ý tên 'uploadfile' phải trùng với tham số bên Server side
  return axios({
    url: FILE_PATH + '/upload',
    headers: {
      "Content-Type": "multipart/form-data",
    },
    method: "POST",
    data: formData,
  });
}

export const downloadFile = (fileId) => axios({
  url: FILE_PATH + '/get-by-id/' + fileId,
  headers: {
    "Content-Type": "multipart/form-data",
  },
  method: "GET",
  responseType: "blob",
});