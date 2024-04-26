import { makeAutoObservable } from "mobx";
import {
  pagingAdministratives,
  getAdministrative,
  createAdministrative,
  editAdministrative,
  deleteAdministrative,
  checkCode,
} from "./AdministrativeUnitService";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export default class AdministrativeStore {
  administrativeUnitList = [];
  selectedAdministrativeUnit = null;
  selectedAdministrativeUnitList = [];
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
      let data = await pagingAdministratives(searchObject);
      this.administrativeUnitList = data.data.content;
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

  handleEditAdministrative = (id) => {
    this.getAdministrative(id).then(() => {
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
    this.getAdministrative(id).then(() => {
      this.shouldOpenConfirmationDialog = true;
    });
  };

  handleDeleteList = () => {
    this.shouldOpenConfirmationDeleteListDialog = true;
  };

  handleConfirmDelete = async () => {
    try {
      const res = await deleteAdministrative(this.selectedAdministrativeUnit.id);
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
    for (var i = 0; i < this.selectedAdministrativeUnitList.length; i++) {
      try {
        await deleteAdministrative(this.selectedAdministrativeUnitList[i].id);
      } catch (error) {
        listAlert.push(this.selectedAdministrativeUnitList[i].name);
        toast.warning("toast.delete_fail");
      }
    }
    this.handleClose();
    toast.success("Đã xóa thành công!");
  };

  getAdministrative = async (id) => {
    if (id != null) {
      try {
        let data = await getAdministrative(id);
        this.handleSelectAdministrative(data.data);
      } catch (error) {
        console.log(error);
        toast.warning("toast.get_fail");
      }
    } else {
      this.handleSelectAdministrative(null);
    }
  };

  handleSelectAdministrative = (administrative) => {
    this.selectedAdministrativeUnit = administrative;
  };

  handleSelectListAdministrative = (administratives) => {
    this.selectedAdministrativeUnitList = administratives;
    console.log(this.selectedAdministrativeUnitList);
  };

  createAdministrative = async (administrative) => {
    try {
      let response = await checkCode(administrative);
      if (response.data) {
        toast.warning("Mã đã được sử dụng!");
      } else {
        await createAdministrative(administrative);
        toast.success("Thêm mới thành công!");
        this.handleClose();
      }
    } catch (error) {
      console.log(error);
      toast.warning("Có lỗi xảy ra khi thêm mới!");
    }
  };

  editAdministrative = async (administrative) => {
    try {
      let response = await checkCode(administrative);
      if (response.data) {
        toast.warning("Mã đã được sử dụng!");
      } else {
        await editAdministrative(administrative);
        toast.success("Cập nhật thành công!");
        this.handleClose();
      }
    } catch (error) {
      console.log(error);
      toast.warning("Có lỗi xảy ra khi cập nhật!");
    }
  };

  resetAdministrativeStore = () => {
    this.administrativeUnitList = [];
    this.selectedAdministrativeUnit = null;
    this.selectedAdministrativeUnitList = [];
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
