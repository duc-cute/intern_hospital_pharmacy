import { makeAutoObservable } from "mobx";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { checkCode, createShiftwork, deleteMultiple, deleteShiftwork, getShiftworkById, pagingShiftwork, updateShiftwork } from "./ShiftworkService";

export default class ShiftworkStore {
  shiftWorkList = [];
  selectedShiftwork = null;
  selectedShiftworkList = [];
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
      let data = await pagingShiftwork(searchObject);
      this.shiftWorkList = data.data.content;
      this.totalElements = data.data.totalElements;
      this.totalPages = data.data.totalPages;
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      toast.warning("toast.load_fail");
      this.setLoadingInitial(false);
    }
  };

  handleEditShiftwork = (id) => {
    this.getShiftwork(id).then(() => {
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
    this.getShiftwork(id).then(() => {
      this.shouldOpenConfirmationDialog = true;
    });
  };

  handleDeleteList = () => {
    this.shouldOpenConfirmationDeleteListDialog = true;
  };

  handleConfirmDelete = async () => {
    try {
      const res = await deleteShiftwork(this.selectedShiftwork.id);
      if (res?.data) {
        toast.success("Đã xoá ca làm việc!");
      } else {
        toast.warning("Không thể xoá vì có dữ liệu ràng buộc!");
      }
      this.handleClose();
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
    }
  };

  handleSelectShiftwork = (shiftwork) => {
    this.selectedShiftwork = shiftwork;
  };

  handleSelectListShiftwork = (shiftworks) => {
    this.selectedShiftworkList = shiftworks;
    console.log(this.selectedShiftworkList);
  };

  handleConfirmDeleteList = async () => {
    let listAlert = [];
    for (var i = 0; i < this.selectedShiftworkList.length; i++) {
      try {
        await deleteMultiple(this.selectedShiftworkList[i].id);
      } catch (error) {
        listAlert.push(this.selectedShiftworkList[i].name);
        toast.warning("toast.delete_fail");
      }
    }
    this.handleClose();
    toast.success("Đã xóa thành công!");
  };

  getShiftwork = async (id) => {
    if (id != null) {
      try {
        let data = await getShiftworkById(id);
        this.handleSelectShiftwork(data.data);
      } catch (error) {
        console.log(error);
        toast.warning("toast.get_fail");
      }
    } else {
      this.handleSelectShiftwork(null);
    }
  };

  createShiftwork = async (shiftwork) => {
    try {
      const { status } = await checkCode(shiftwork.code);
      if (status === 200) {
        await createShiftwork(shiftwork);
        toast.success("Thêm mới thành công!");
      } else {
        toast.warning("Mã ca làm đã được sử dụng!")
      }
      this.handleClose();
    } catch (error) {
      console.log(error);
      toast.warning("Có lỗi xảy ra khi thêm mới!");
    }
  };

  editShiftwork = async (shiftwork) => {
    try {
      await createShiftwork(shiftwork);
      toast.success("Cập nhật thành công!");
      this.handleClose();
    } catch (error) {
      console.log(error);
      toast.warning("Có lỗi xảy ra khi cập nhật!");
    }
  };

  resetShiftworkStore = () => {
    this.shiftWorkList = [];
    this.selectedShiftwork = null;
    this.selectedShiftworkList = [];
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