import axios from "axios";
import ConstantList from "app/appConfig";

const API_PATH = ConstantList.API_ENPOINT + "/api/store-transaction/";

export const viewReport = (searchObject) => {
  var url = API_PATH + "get-input-output-inventories-report";
  return axios.post(url, searchObject);
};

export const exportDrugUseAndInventoriesReport = (obj) => {
  let url = ConstantList.API_ENPOINT + "/api/store-transaction/export-drug-use-and-inventories-report"
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: obj,
  });
}
