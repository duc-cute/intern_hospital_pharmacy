import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/staff";

export const pagingStaffs = (searchObject) => axios.post(API_PATH + "/searchByPage", searchObject);

export const saveStaff = (staff) => axios.post(API_PATH, staff);

export const getStaff = (id) => axios.get(API_PATH + "/" + id);

export const createStaff = (obj) => {
  let url = API_PATH;
  return axios.post(url, obj);
};

export const editStaff = (obj) => {
  let url = API_PATH + "/" + obj.id;
  return axios.put(url, obj);
};

export const deleteStaff = (id) => {
  let url = API_PATH + "/delete/" + id;
  return axios.delete(url);
};

export const checkCode = (dto) => {
  var url = API_PATH + "/checkCode";
  return axios.post(url, { ...dto });
};

export const saveUserAndStaff = (staff) => axios.post(API_PATH + "/saveUserAndStaff", staff);