import { makeAutoObservable, runInAction } from "mobx";
import {
  getDataInventoryReport,
  getInputOutputInventoriesReport,
} from "./InventoryReportService";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { pagingCategories } from "../Category/CategoryService";
import i18n from "i18n";

const searchObjectInitialValue = {
  keyword: "",
  fromDate: null,
  toDate: null,
  category: null,
  store: null,
  storeId: null,
  categoryId: null,
};

export default class InventoryReportStore {
  
  inventoryReportList = [];
  selectedInventoryReport = null;
  selectedInventoryReportList = [];
  totalElements = 0;
  totalPages = 0;
  page = 1;
  rowsPerPage = 10;
  keyword = "";
  loadingInitial = false;
  shouldOpenEditorDialog = false;
  shouldOpenConfirmationDialog = false;
  shouldOpenConfirmationDeleteListDialog = false;
  searchObject = { ...searchObjectInitialValue };
  selectedDetailsReport = null;

  listCategory = [];

  constructor() {
    makeAutoObservable(this);
  }

  setLoadingInitial = (state) => {
    this.loadingInitial = state;
  };

  loadListInventoryReport = async () => {

    const newSearchObj = {
      storeId: this.searchObject.storeId,
      categoryId: this.searchObject.categoryId,
      toDate: this.searchObject.toDate,
      fromDate: this.searchObject.fromDate,
      productIds: this.searchObject.productIds,
      productType: this.searchObject.productType,
      groupByFields: ["category", "product", "transactionAtt", 
      "source", "lot", "typeOfTransaction"]
    }
    try {
      let data = await getDataInventoryReport(newSearchObj);
      this.inventoryReportList = data.data;
      this.setLoadingInitial(false);
    } catch (error) {
      toast.warning(i18n.t("toast.load_fail"));
      this.setLoadingInitial(false);
    }
  }

  loadListCategory = () => {
    pagingCategories({ pageIndex: 1, pageSize: 1000 }).then(({ data }) => {
      this.listCategory = data?.content || [];
    })
  }

  handleChangeSearchObject = (values) => {
    this.searchObject = {
      ...searchObjectInitialValue,
      ...values,
      fromDate: values?.fromDate,
      toDate: values?.toDate,
      storeId: values?.store?.id,
      categoryId: values?.category?.id,
      productIds: values?.listProduct?.map(item => item?.id)
    }
    this.loadListInventoryReport()
  }

  handleSetSearchObject = (item) => {
    this.searchObject = item;
  }

  updatePageData = async () => {
    this.loadingInitial = true;

    var newSearchObj = {
      fromDate: this.searchObject.fromDate,
      toDate: this.searchObject.toDate,
      storeId: this.searchObject?.store?.id,
      categoryId: this.searchObject?.category?.id,
      groupByFields: ["category", "product", "transactionAtt", 
      "source", "lot", "typeOfTransaction"]
    };

    try {
      let data = await getDataInventoryReport(newSearchObj);
      runInAction(() => {
        this.inventoryReportList = data.data;
        this.totalElements = data.data.totalElements;
        this.totalPages = data.data.totalPages;
      })
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      toast.warning(i18n.t("toast.load_fail"));
      this.setLoadingInitial(false);
    }
  };


  //reset biến searchObject khi rời đi
  resetSearchObject = () => {
    this.page = 1;
    this.rowsPerPage = 10;
    this.searchObject = { ...searchObjectInitialValue };
    // this.updatePageData();
  };


  // search = async () => {
  //   this.loadingInitial = true;
  //   var searchObject = {
  //     keyword: this.keyword,
  //     pageIndex: this.page,
  //     pageSize: this.rowsPerPage,
  //   };

  //   try {
  //     let data = await pagingInventoryReports(searchObject);
  //     this.inventoryReportList = data.data.content;
  //     this.totalElements = data.data.totalElements;
  //     this.totalPages = data.data.totalPages;
  //     this.setLoadingInitial(false);
  //   } catch (error) {
  //     console.log(error);
  //     toast.warning(t("toast.load_fail"));
  //     this.setLoadingInitial(false);
  //   }
  // };

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

  handleEditInventoryReport = (report) => {
    this.selectedInventoryReport = report;
    this.shouldOpenEditorDialog = true;
    // this.getInventoryReport(id).then(() => {
    // this.shouldOpenEditorDialog = true;
    // });
  };

  handleClose = () => {
    this.shouldOpenEditorDialog = false;
    this.shouldOpenConfirmationDialog = false;
    this.shouldOpenConfirmationDeleteListDialog = false;
    this.updatePageData();
  };

  handleDownloadReportFile = () => {
    let newSearchDto = {
      pageIndex: this.page,
      pageSize: this.rowsPerPage,
      fromDate: this.searchObject.fromDate,
      toDate: this.searchObject.toDate,
      storeId: this.searchObject?.store?.id,
      categoryId: this.searchObject?.category?.id
    };
    getInputOutputInventoriesReport(newSearchDto).then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Báo Cáo Tồn Kho" + ".xlsx");
      document.body.appendChild(link);
      link.click();
    }).catch(error => {
      console.log(error);
      toast.warning(i18n.t("toast.error"));
    })
  };

}
