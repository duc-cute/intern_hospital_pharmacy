import axios from "axios";
import ConstantList from "app/appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/sale-report";


export const getReport = (searchObject) => {
  var url = API_PATH + "/report";
  return axios.post(url, searchObject);
};

export const getReportDetails = (searchObject) => {
  var url = API_PATH + "/report-details";
  return axios.post(url, searchObject);
};

// export const getInputOutputInventoriesReport = (obj) => {
//   let url = API_PATH + "/inventory-by-search-dto-exportfile";
//   return axios({
//     url: url,
//     method: "POST",
//     responseType: "blob",
//     data: obj,
//   });
// }