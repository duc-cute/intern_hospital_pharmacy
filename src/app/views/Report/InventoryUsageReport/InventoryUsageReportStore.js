import { makeAutoObservable, runInAction } from "mobx";
import {
  viewReport,
} from "./InventoryUsageReportService";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
// import i18n from "i18n";
// import moment from "moment";

const searchObjectInitialValue = {
  keyword: "",
  fromDate: null,
  toDate: null,
  product: null,
  store: null,
  productId: null,
  storeId: null
};

export default class InventoryUsageReportStore {
  reportViewData = null;
  reportViewDataList = [];
  totalElements = 0;
  totalPages = 0;
  page = 1;
  rowsPerPage = 5;
  keyword = "";
  loadingInitial = false;
  shouldOpenEditorDialog = false;
  shouldOpenConfirmationDialog = false;
  shouldOpenConfirmationDeleteListDialog = false;
  searchObject = {...searchObjectInitialValue};

  openViewListPatient = null;

  constructor() {
    makeAutoObservable(this);
  }

  setLoadingInitial = (state) => {
    this.loadingInitial = state;
  };

  handleSetSearchObject = (item) => {
    if (item.pageIndex) {
      this.page = item.pageIndex;
    }
    this.searchObject = {...item};
  }

  updatePageData = (item) => {
    if (item != null) {
      // this.page = 1;
      // this.keyword = item.keyword;
      this.handleSetSearchObject(item)
      this.search();
    } else {
      this.search();
    }
  };

  search = async () => {
    this.loadingInitial = true;
    const newSearchObj = {
      storeId: this.searchObject.store?.id,
      productId: this.searchObject.product?.id,
      toDate: this.searchObject.toDate,
      fromDate: this.searchObject.fromDate,
      groupByFields: ["category", "product", "transactionAtt", 
      "source", "lot", "typeOfTransaction"]
    }

    try {
      let res = await viewReport(newSearchObj);
      runInAction(() => {
        this.reportViewDataList = res.data;
      })
    } catch (error) {
      console.log(error);
      toast.warning("toast.load_fail");
    }
  };

  setPage = (page) => {
    this.page = page;
    this.updatePageData();
  };

  setRowsPerPage = (event) => {
    this.rowsPerPage = event.target.value;
    this.page = 1;
    this.updatePageData();
  };

  handleChangePage = (event, newPage) => {
    this.setPage(newPage);
  };

  //reset biến searchObject khi rời đi
  resetSearchObject = () => {
    this.page = 1;
    this.rowsPerPage = 10;
    this.searchObject = { ...searchObjectInitialValue };
    // this.updatePageData();
  };


  setOpenViewListPatient = (obj) => {
    if (obj) {
      this.openViewListPatient = {
        ...obj,
        typeTime: this.searchObject.typeTime,
        source: this.searchObject.source,
        fromYear: this.searchObject.fromYear,
        toYear: this.searchObject.toYear,
        fromQuarter: this.searchObject.fromQuarter,
        toQuarter: this.searchObject.toQuarter,
        fromDate: this.searchObject.fromDate,
        toDate: this.searchObject.toDate,
        organizationId: this.searchObject.organization?.id,
        provinceId: this.searchObject.administrativeUnit?.id,
        regionAdminiId: this.searchObject.region?.id,
      };
    } else {
      this.openViewListPatient = null
    }
  }

  resetStore = () => {
    this.reportViewData = null
  }

}
