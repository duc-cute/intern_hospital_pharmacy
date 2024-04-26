import { makeAutoObservable } from "mobx";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { deleteSaleAss, deleteSaleAssMulti, getSaleAssById, pagingSaleAss, saveSaleAss } from "./SaleAssociateService";

export default class SaleAssociateStore {
  saleAssList = [];
  selectedSaleAss = null;
  selectedSaleAssList = [];
  totalElements = 0;
  totalPages = 0;
  page = 1;
  rowsPerPage = 10;
  keyword = "";
  loadingInitial = false;
  shouldOpenEditorDialog = false;
  shouldOpenConfirmationDialog = false;
  shouldOpenConfirmationDeleteListDialog = false;

  constructor() {
    makeAutoObservable(this);
  }

  setLoadingInitial = (state) => {
    this.loadingInitial = state;
  };

  updatePageData = (item) => {
    if (item != null) {
      this.page = 1;
      this.keyword = item.keyword;
      this.search();
    } else {
      this.search();
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

  search = async () => {
    this.loadingInitial = true;
    var searchObject = {
      keyword: this.keyword,
      pageIndex: this.page,
      pageSize: this.rowsPerPage,
    };

    try {
      let data = await pagingSaleAss(searchObject);
      this.saleAssList = data.data.content;
      this.totalElements = data.data.totalElements;
      this.totalPages = data.data.totalPages;
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      toast.warning("toast.load_fail");
      this.setLoadingInitial(false);
    }
  };

  handleEditSaleAss = (id) => {
    this.getSaleAss(id).then(() => {
      this.shouldOpenEditorDialog = true;
    });
  };

  handleClose = () => {
    this.shouldOpenEditorDialog = false;
    this.shouldOpenConfirmationDialog = false;
    this.shouldOpenConfirmationDeleteListDialog = false;
    this.updatePageData();
  };

  handleDelete = (id) => {
    this.getSaleAss(id).then(() => {
      this.shouldOpenConfirmationDialog = true;
    });
  };

  handleDeleteList = () => {
    this.shouldOpenConfirmationDeleteListDialog = true;
  };

  handleConfirmDelete = async () => {
    try {
      const res = await deleteSaleAss(this.selectedSaleAss.id);
      if (res?.data) {
        toast.success("Xóa cộng tác viên thành công!");
      } else {
        toast.warning("Không thể xoá vì có dữ liệu ràng buộc!");
      }
      this.handleClose();
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
    }
  };

  handleSelectSaleAss = (saleAss) => {
    this.selectedSaleAss = saleAss;
  };

  handleSelectListSaleAss = (saleAssociate) => {
    this.selectedSaleAssList = saleAssociate;
  };

  handleConfirmDeleteList = async () => {
    let listDelete = [];
    for (let i = 0; i < this.selectedSaleAssList.length; i++) {
      listDelete.push(this.selectedSaleAssList[i]);
    }

    try {
      await deleteSaleAssMulti(listDelete);
      toast.success("Đã xóa thành công!");
      this.resetSaleAssStore();
    } catch (error) {
      toast.warning("toast.delete_fail");
    } finally {
      this.handleClose();
    }
  };

  getSaleAss = async (id) => {
    if (id != null) {
      try {
        let data = await getSaleAssById(id);
        this.handleSelectSaleAss(data.data);
      } catch (error) {
        console.log(error);
        toast.warning("toast.get_fail");
      }
    } else {
      this.handleSelectSaleAss(null);
    }
  };

  createOrUpdateSaleAss = async (saleAss) => {
    try {
      await saveSaleAss(saleAss);
      if (saleAss.id) {
        toast.success("Cập nhật thành công!");
      } else {
        toast.success("Thêm mới thành công!");
      }
      this.handleClose();
    } catch (error) {
      console.log(error);
      toast.warning("Có lỗi xảy ra khi thêm mới!");
    }
  };

  resetSaleAssStore = () => {
    this.saleAssList = [];
    this.selectedSaleAss = null;
    this.selectedSaleAssList = [];
    this.totalElements = 0;
    this.totalPages = 0;
    this.page = 1;
    this.rowsPerPage = 10;
    this.keyword = "";
    this.loadingInitial = false;
    this.shouldOpenEditorDialog = false;
    this.shouldOpenConfirmationDialog = false;
    this.shouldOpenConfirmationDeleteListDialog = false;
  }
}