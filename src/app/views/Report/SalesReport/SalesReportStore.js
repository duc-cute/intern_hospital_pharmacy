import { makeAutoObservable } from "mobx";
import { getReport } from "./SalesReportService";
import { toast } from "react-toastify";
import i18n from "i18n";
import { REPORT_DISPLAY_TYPE, REPORT_TYPE_TIME, SALES_REPORT_CONCERN_TYPE } from "app/common/Constant/LocalConstantList";
import { endOfDay, startOfWeek } from "app/common/Constant/LocalFunction";

const initialSearch = {
  displayType: REPORT_DISPLAY_TYPE[1].value, // kiểu hiển thị mặc định biểu đồ
  concernType: SALES_REPORT_CONCERN_TYPE[0].value, // mối quan tâm mặc định thời gian
  typeTime: REPORT_TYPE_TIME[2].value, // thời gian mặc định tuần này
  fromDate: startOfWeek(new Date()),
  toDate: endOfDay(new Date()),
}

export default class SalesReportStore {
  salesReportSearch = {...initialSearch};
  salesReport = null;
  shouldOpenEditorDialog = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadSalesReport = async () => {
    const searchObject = {
      ...this.salesReportSearch,
    }

    try {
      let data = await getReport(searchObject);
      this.salesReport = data.data;
    } catch (error) {
      toast.warning(i18n.t("toast.load_fail"));
    }
  }

  handleChangeSearchObject = (values) => {
    this.salesReportSearch = {...values};
    this.loadSalesReport()
  }

  handleDownloadReportFile = () => {
    try {
      // const res = getInputOutputInventoriesReport({...this.salesReportSearch});
      
      // if (res?.data) {
      //   handleDownloadReportFile(res.data, "Báo cáo bán hàng " + new Date().getTime() + ".xlsx")
      // }
    } catch (error) {
      console.log(error);
      toast.warning(i18n.t("toast.error"));
    }
  };

  resetStore = () => {
    this.salesReportSearch = {...initialSearch};
    this.salesReport = [];
  }
}
