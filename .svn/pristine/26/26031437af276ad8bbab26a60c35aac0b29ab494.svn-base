import { makeAutoObservable, runInAction } from "mobx";
import {
  getDetailsInventoryByProduct
} from "../InventoryReport/InventoryReportService";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export default class DetailsInventoryByProductStore {
  detailsInventoryByProductList = [];
  selectedInventoryReport = null;
  totalElements = 0;
  totalPages = 0;
  page = 1;
  rowsPerPage = 10;
  keyword = "";
  loadingInitial = false;
  searchObject = {
    storeId: null,
    productId: null,
  };

  constructor() {
    makeAutoObservable(this);
  }

  setLoadingInitial = (state) => {
    this.loadingInitial = state;
  };

  handleSetSearchObject = (item) => {
      this.searchObject = item;
  }

  updatePageData = async () => {
    this.loadingInitial = true;

    var newSearchObj = {
      pageIndex: this.page,
      pageSize: this.rowsPerPage,
      productId: this.searchObject?.productId,
      storeId : this.searchObject?.store?.id,
    };

    try {
      let data = await getDetailsInventoryByProduct(newSearchObj);
      runInAction(() => {
        this.detailsInventoryByProductList = data.data.content;
        this.totalElements = data.data.totalElements;
        this.totalPages = data.data.totalPages;
      })
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      toast.warning("toast.load_fail");
      this.setLoadingInitial(false);
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
}
