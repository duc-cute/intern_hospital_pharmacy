import { makeAutoObservable } from "mobx";
import { getDataInventoryReport, getInputOutputInventoriesReport } from "./OriginReportService";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import i18n from "i18n";
import { InventorySearch } from "app/common/Model/SearchObject";
import { handleDownloadReportFile } from "app/common/Constant/LocalFunction";

export default class OriginReportStore {
  originReportSearch = new InventorySearch();
  originReport = [];
  shouldOpenEditorDialog = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadOriginReport = async () => {
    const searchObject = {
      ...this.originReportSearch,
      storeId: this.originReportSearch?.store?.id,
      productIds: this.originReportSearch?.listProduct?.map(item => item?.id),
      groupByFields: ["category", "product", "transactionAtt", "typeOfTransaction","lot"]
    }

    try {
      let data = await getDataInventoryReport(searchObject);
      this.originReport = data.data;
    } catch (error) {
      toast.warning(i18n.t("toast.load_fail"));
    }
  }

  handleChangeSearchObject = (values) => {
    this.originReportSearch = values;
    this.loadOriginReport()
  }

  handleDownloadReportFile = () => {
    try {
      let newSearchDto = {
        ...this.originReportSearch,
        storeId: this.originReportSearch?.store?.id,
        productIds: this.originReportSearch?.listProduct?.map(item => item?.id),
        pageIndex: 1,
        pageSize: 1000,
        groupByFields: ["category", "product", "transactionAtt", "typeOfTransaction","lot"],
      };
      const res = getInputOutputInventoriesReport(newSearchDto);
      
      if (res?.data) {
        handleDownloadReportFile(res.data, "Báo Cáo Nhập Xuất Tồn.xlsx")
      }
    } catch (error) {
      console.log(error);
      toast.warning(i18n.t("toast.error"));
    }
  };

  resetStore = () => {
    this.originReportSearch = new InventorySearch();
    this.originReport = [];
  }
}
