import { makeAutoObservable, runInAction } from "mobx";
import {
  exportInputOutputInventoriesReport,
  pagingInventoryReports,
} from "./InventoryByCategoryReportService";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { pagingCategories } from "../Category/CategoryService";
import { getDataInventoryReport } from "../InventoryReport/InventoryReportService";
import i18n from "i18n";

const searchObjectInitialValue = {
  keyword: "",
  fromDate: new Date(),
  toDate: null,
  category: null,
  store: null,
  categoryId: null,
  storeId: null
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
  listCategory = [];

  constructor() {
    makeAutoObservable(this);
  }

  setLoadingInitial = (state) => {
    this.loadingInitial = state;
  };

  loadListCategory = () => {
    pagingCategories({ pageIndex: 1, pageSize: 1000 }).then(({ data }) => {
      this.listCategory = data.content || [];
    })
  }

  loadListInventoryReport = async () => {

    const newSearchObj = {
      storeId: this.searchObject.storeId,
      categoryId: this.searchObject.categoryId,
      toDate: this.searchObject.toDate,
      fromDate: this.searchObject.fromDate,
      groupByFields: ["category", "product"]
    }
    try {
      let data = await getDataInventoryReport(newSearchObj);
      this.inventoryReportList = data.data;
      this.setLoadingInitial(false);
    } catch (error) {
      toast.warning("toast.load_fail");
      this.setLoadingInitial(false);
    }
  }

  handleChangeSearchObject = (values) => {
    this.searchObject = {
      ...searchObjectInitialValue,
      ...values,
      fromDate: values?.fromDate,
      toDate: values?.toDate,
      storeId: values?.store?.id,
      categoryId: values?.category?.id
    }
    this.loadListInventoryReport()
  }




















  handleSetSearchObject = (item) => {
    this.searchObject = item;
  }

  updatePageData = async () => {
    this.loadingInitial = true;

    var newSearchObj = {
      pageIndex: this.page,
      pageSize: this.rowsPerPage,
      keyword: this.searchObject.keyword,
      fromDate: this.searchObject.fromDate,
      toDate: this.searchObject.toDate,
      storeId: this.searchObject?.store?.id,
      categoryId: this.searchObject?.category?.id,
    };

    try {
      let data = await pagingInventoryReports(newSearchObj);
      runInAction(() => {
        this.inventoryReportList = data.data.content;
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
  //     toast.warning("toast.load_fail");
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

  handleDownloadReportFile = () => {
    let newSearchDto = {
      fromDate: this.searchObject.fromDate,
      toDate: this.searchObject.toDate,
      storeId: this.searchObject?.store?.id,
      categoryId: this.searchObject?.category?.id,
      groupByFields: ["category", "product"]
    };
    exportInputOutputInventoriesReport(newSearchDto).then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "BÁO CÁO TỒN KHO THEO DANH MỤC SẢN PHẨM" + ".xlsx");
      document.body.appendChild(link);
      link.click();
    }).catch(error => {
      console.log(error);
      toast.warning(i18n.t("toast.error"));
    })
  };

  // handleEditInventoryReport = (id) => {
  //   this.getInventoryReport(id).then(() => {
  //     this.shouldOpenEditorDialog = true;
  //   });
  // };

  // handleClose = () => {
  //   this.shouldOpenEditorDialog = false;
  //   this.shouldOpenConfirmationDialog = false;
  //   this.shouldOpenConfirmationDeleteListDialog = false;
  //   this.updatePageData();
  // };

  // handleDelete = (id) => {
  //   this.getInventoryReport(id).then(() => {
  //     this.shouldOpenConfirmationDialog = true;
  //   });
  // };

  // handleDeleteList = () => {
  //   this.shouldOpenConfirmationDeleteListDialog = true;
  // };

  // handleConfirmDelete = async () => {
  //   // this.deleteInventoryReport(this.selectedInventoryReport.id);
  //   try {
  //     const res = await deleteInventoryReport(this.selectedInventoryReport.id);
  //     if (res?.data) {
  //       toast.success("Đã xoá bản ghi");
  //     } else {
  //       toast.warning("Không thể xoá vì có dữ liệu ràng buộc");
  //     }
  //     this.handleClose();
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
  //   }
  // };

  // handleConfirmDeleteList = async () => {
  //   let listAlert = [];
  //   for (var i = 0; i < this.selectedInventoryReportList.length; i++) {
  //     try {
  //       await deleteInventoryReport(this.selectedInventoryReportList[i].id);
  //     } catch (error) {
  //       listAlert.push(this.selectedInventoryReportList[i].name);
  //       console.log(error);
  //       console.log(listAlert.toString());
  //       toast.warning("toast.delete_fail");
  //     }
  //   }
  //   this.handleClose();
  //   toast.success("Đã xóa thành công!");
  // };

  // getInventoryReport = async (id) => {
  //   if (id != null) {
  //     try {
  //       let data = await getInventoryReport(id);
  //       this.handleSelectInventoryReport(data.data);
  //     } catch (error) {
  //       console.log(error);
  //       toast.warning("toast.get_fail");
  //     }
  //   } else {
  //     this.handleSelectInventoryReport(null);
  //   }
  // };

  // handleSelectInventoryReport = (InventoryReport) => {
  //   this.selectedInventoryReport = InventoryReport;
  // };

  // handleSelectListInventoryReport = (InventoryReports) => {
  //   this.selectedInventoryReportList = InventoryReports;
  //   console.log(this.selectedInventoryReportList);
  // };

  // createInventoryReport = async (InventoryReport) => {
  //   try {
  //     // let responseCheckCode = await checkCode(InventoryReport);
  //     // if (responseCheckCode.data) {
  //     //   toast.warning("Mã đã được sử dụng!");
  //     // } else {
  //       await createInventoryReport(InventoryReport);
  //       toast.success("Thêm mới thành công!");
  //       this.handleClose();
  //     // }
  //   } catch (error) {
  //     console.log(error);
  //     toast.warning("Có lỗi xảy ra khi thêm mới!");
  //   }
  // };

  // editInventoryReport = async (InventoryReport) => {
  //   try {
  //     // let responseCheckCode = await checkCode(InventoryReport);
  //     // if (responseCheckCode.data) {
  //     //   toast.warning("Mã đã được sử dụng!");
  //     // } else {
  //       await editInventoryReport(InventoryReport);
  //       toast.success("Cập nhật thành công!");
  //       this.handleClose();
  //     // }
  //   } catch (error) {
  //     console.log(error);
  //     toast.warning("Có lỗi xảy ra khi cập nhật!");
  //   }
  // };
}
