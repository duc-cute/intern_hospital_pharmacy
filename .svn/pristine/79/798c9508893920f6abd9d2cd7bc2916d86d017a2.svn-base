import { makeAutoObservable } from "mobx";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { 
  getShiftWorkChangeById, 
  pagingShiftWorkChange, 
  deleteShiftWorkChange,
  saveShiftWorkChange,
  getInfoSaleOrderByShiftWorkChange,
} from "./ShiftWorkChangeService";

const initSearchObject = {
  keyword: "",
  fromDate: null,
  toDate: null,
  startStaff: null,
  endStaff: null,
  shiftWork: null,
}

export default class ShiftWorkChangeStore {
  shiftWorkChangeList = [];
  selectedShiftWorkChange = null;
  selectedShiftWorkChangeList = [];
  totalElements = 0;
  totalPages = 0;
  page = 1;
  rowsPerPage = 10;
  loadingInitial = false;
  shouldOpenEditorDialog = false;
  shouldOpenConfirmationDialog = false;
  shouldOpenConfirmationDeleteListDialog = false;
  searchObject={...initSearchObject}

  constructor() {
    makeAutoObservable(this);
  }

  setLoadingInitial = (state) => {
    this.loadingInitial = state;
  };

  updatePageData = (item) => {
    if (item != null) {
      this.page = 1;
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
      pageIndex: this.page,
      pageSize: this.rowsPerPage,
      ...this.searchObject,
      startStaffId: this.searchObject?.startStaff?.id,
      endStaffId: this.searchObject?.endStaff?.id,
      shiftWorkId: this.searchObject?.shiftWork?.id,
    };

    try {
      let data = await pagingShiftWorkChange(searchObject);
      this.shiftWorkChangeList = data.data.content;
      this.totalElements = data.data.totalElements;
      this.totalPages = data.data.totalPages;
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      toast.warning("toast.load_fail");
      this.setLoadingInitial(false);
    }
  };

  handleEditShiftWorkChange = (id) => {
    this.getShiftWorkChange(id).then(() => {
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
    this.getShiftWorkChange(id).then(() => {
      this.shouldOpenConfirmationDialog = true;
    });
  };

  handleDeleteList = () => {
    this.shouldOpenConfirmationDeleteListDialog = true;
  };

  handleConfirmDelete = async () => {
    try {
      const res = await deleteShiftWorkChange(this.selectedShiftWorkChange.id);
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

  handleSelectShiftWorkChange = (shiftwork) => {
    this.selectedShiftWorkChange = shiftwork;
  };

  handleSelectListShiftWorkChange = (shiftworks) => {
    this.selectedShiftWorkChangeList = shiftworks;
    console.log(this.selectedShiftWorkChangeList);
  };

  getShiftWorkChange = async (id) => {
    if (id != null) {
      try {
        let res = await getInfoSaleOrderByShiftWorkChange(id);

        this.handleSelectShiftWorkChange({
          ...res.data?.result,
          // listSalesOrder: res?.data?.resultList,
        });
      } catch (error) {
        console.log(error);
        toast.warning("toast.get_fail");
      }
    } else {
      this.handleSelectShiftWorkChange(null);
    }
  };

  editShiftWorkChange = async (shiftwork) => {
    try {
      await saveShiftWorkChange(shiftwork);
      toast.success("Cập nhật thành công!");
      this.handleClose();
    } catch (error) {
      console.log(error);
      toast.warning("Có lỗi xảy ra khi cập nhật!");
    }
  };

  resetShiftWorkChangeStore = () => {
    this.shiftWorkChangeList = [];
    this.selectedShiftWorkChange = null;
    this.selectedShiftWorkChangeList = [];
    this.totalElements = 0;
    this.totalPages = 0;
    this.page = 1;
    this.rowsPerPage = 10;
    this.loadingInitial = false;
    this.shouldOpenEditorDialog = false;
    this.shouldOpenConfirmationDialog = false;
    this.shouldOpenConfirmationDeleteListDialog = false;
    this.searchObject = {...initSearchObject}
  }

  setSearchObject = (obj) => {
    this.searchObject = {...initSearchObject, ...obj};
    this.page = 1;
  }
}