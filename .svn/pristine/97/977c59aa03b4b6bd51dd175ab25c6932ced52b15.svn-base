import { makeAutoObservable } from "mobx";
import { getReport } from "./EndOfDayReportService";
import { toast } from "react-toastify";
import i18n from "i18n";
import { endOfDay, startOfDay } from "app/common/Constant/LocalFunction";
import { END_OF_DAY_REPORT_CONCERN_TYPE, REPORT_DISPLAY_TYPE } from "app/common/Constant/LocalConstantList";

const initialSearch = {
  displayType: REPORT_DISPLAY_TYPE[1].value, // kiểu hiển thị mặc định biểu đồ
  concernType: END_OF_DAY_REPORT_CONCERN_TYPE[0].value, // mối quan tâm mặc định bán hàng
  fromDate: startOfDay(new Date()),
  toDate: endOfDay(new Date()),
  // staff: []
}

export default class EndOfDayReportStore {
  endOfDayReportSearch = {...initialSearch};
  endOfDayReport = null;
  shouldOpenEditorDialog = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadEndOfDayReport = async () => {
    const searchObject = {
      ...this.endOfDayReportSearch,
    }

    try {
      let data = await getReport(searchObject);
      this.endOfDayReport = data.data;
    } catch (error) {
      toast.warning(i18n.t("toast.load_fail"));
    }
  }

  handleChangeSearchObject = (values) => {
    this.endOfDayReportSearch = {...values};
    this.loadEndOfDayReport()
  }

  handleDownloadReportFile = () => {
    try {
      // const res = getInputOutputInventoriesReport({......this.endOfDayReportSearch});
      
      // if (res?.data) {
      //   handleDownloadReportFile(res.data, "Báo cáo bán hàng " + new Date().getTime() + ".xlsx")
      // }
    } catch (error) {
      console.log(error);
      toast.warning(i18n.t("toast.error"));
    }
  };

  resetStore = () => {
    this.endOfDayReportSearch = {...initialSearch};
    this.endOfDayReport = [];
  }
}
