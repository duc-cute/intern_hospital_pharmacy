import { makeAutoObservable } from "mobx";
import {
  pagingSuppliers,
  getSupplier,
  createSupplier,
  editSupplier,
  deleteSupplier,
} from "./SupplierService";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export default class SupplierStore {
  supplierList = [];
  selectedSupplier = null;
  selectedSupplierList = [];
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

  search = async () => {
    this.loadingInitial = true;
    var searchObject = {
      keyword: this.keyword,
      pageIndex: this.page,
      pageSize: this.rowsPerPage,
    };

    try {
      let data = await pagingSuppliers(searchObject);
      this.supplierList = data.data.content;
      this.totalElements = data.data.totalElements;
      this.totalPages = data.data.totalPages;
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

  handleEditSupplier = (id) => {
    this.getSupplier(id).then(() => {
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
    this.getSupplier(id).then(() => {
      this.shouldOpenConfirmationDialog = true;
    });
  };

  handleDeleteList = () => {
    this.shouldOpenConfirmationDeleteListDialog = true;
  };

  handleConfirmDelete = async () => {
    // this.deleteSupplier(this.selectedSupplier.id);
    try {
      const res = await deleteSupplier(this.selectedSupplier.id);
      if (res?.data) {
        toast.success("Đã xoá bản ghi");
      } else {
        toast.warning("Không thể xoá vì có dữ liệu ràng buộc");
      }
      this.handleClose();
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
    }
  };

  handleConfirmDeleteList = async () => {
    let listAlert = [];
    for (var i = 0; i < this.selectedSupplierList.length; i++) {
      try {
        await deleteSupplier(this.selectedSupplierList[i].id);
      } catch (error) {
        listAlert.push(this.selectedSupplierList[i].name);
        console.log(error);
        console.log(listAlert.toString());
        toast.warning("toast.delete_fail");
      }
    }
    this.handleClose();
    toast.success("Đã xóa thành công!");
  };

  getSupplier = async (id) => {
    if (id != null) {
      try {
        let data = await getSupplier(id);
        this.handleSelectSupplier(data.data);
      } catch (error) {
        console.log(error);
        toast.warning("toast.get_fail");
      }
    } else {
      this.handleSelectSupplier(null);
    }
  };

  handleSelectSupplier = (supplier) => {
    this.selectedSupplier = supplier;
  };

  handleSelectListSupplier = (suppliers) => {
    this.selectedSupplierList = suppliers;
    console.log(this.selectedSupplierList);
  };

  createSupplier = async (supplier) => {
    try {
      // let responseCheckCode = await checkCode(supplier);
      // if (responseCheckCode.data) {
      //   toast.warning("Mã đã được sử dụng!");
      // } else {
      const res = await createSupplier(supplier);
      toast.success("Thêm mới thành công!");
      this.handleClose();
      return res;
      // }
    } catch (error) {
      console.log(error);
      toast.warning("Có lỗi xảy ra khi thêm mới!");
    }
  };

  editSupplier = async (supplier) => {
    try {
      // let responseCheckCode = await checkCode(supplier);
      // if (responseCheckCode.data) {
      //   toast.warning("Mã đã được sử dụng!");
      // } else {
      const res = await editSupplier(supplier);
      toast.success("Cập nhật thành công!");
      this.handleClose();
      return res;
      // }
    } catch (error) {
      console.log(error);
      toast.warning("Có lỗi xảy ra khi cập nhật!");
    }
  };

  resetSupplierStore = () => {
    this.supplierList = [];
    this.selectedSupplier = null;
    this.selectedSupplierList = [];
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
