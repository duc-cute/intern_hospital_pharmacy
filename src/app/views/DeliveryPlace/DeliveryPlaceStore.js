import { makeAutoObservable } from "mobx";
import { deleteDelPlace, deleteDelPlaceMulti, getDelPlaceById, pagingDelPlace, saveDelPlace } from "./DeliveryPlaceService";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export default class DeliveryPlaceStore {
  delPlaceList = [];
  selectedDelPlace = null;
  selectedDelPlaceList = [];
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
      let data = await pagingDelPlace(searchObject);
      this.delPlaceList = data.data.content;
      this.totalElements = data.data.totalElements;
      this.totalPages = data.data.totalPages;
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      toast.warning("toast.load_fail");
      this.setLoadingInitial(false);
    }
  };

  handleEditDelPlace = (id) => {
    this.getDelPlace(id).then(() => {
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
    this.getDelPlace(id).then(() => {
      this.shouldOpenConfirmationDialog = true;
    });
  };

  handleConfirmDelete = async () => {
    try {
      const res = await deleteDelPlace(this.selectedDelPlace.id);
      if (res?.data) {
        toast.success("Xóa thành công địa chỉ nhận hàng!");
      } else {
        toast.warning("Không thể xoá vì có dữ liệu ràng buộc!");
      }
      this.handleClose();
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
    }
  };

  handleConfirmDeleteList = async () => {
    let listDelete = [];
    for (let i = 0; i < this.selectedDelPlaceList.length; i++) {
      listDelete.push(this.selectedDelPlaceList[i]);
    }

    try {
      await deleteDelPlaceMulti(listDelete);
      toast.success("Đã xóa thành công!");
    } catch (error) {
      toast.warning("toast.delete_fail");
    } finally {
      this.handleClose();
    }
  };

  handleSelectDelPlace = (delPlace) => {
    this.selectedDelPlace = delPlace;
  };

  handleSelectListDelPlace = (delPlaces) => {
    this.selectedDelPlaceList = delPlaces;
  };

  getDelPlace = async (id) => {
    if (id != null) {
      try {
        let data = await getDelPlaceById(id);
        this.handleSelectDelPlace(data.data);
      } catch (error) {
        console.log(error);
        toast.warning("toast.get_fail");
      }
    } else {
      this.handleSelectDelPlace(null);
    }
  };

  createDelPlace = async (delPlace) => {
    try {
      await saveDelPlace(delPlace);
      toast.success("Thêm mới thành công!");
      this.handleClose();
    } catch (error) {
      console.log(error);
      toast.warning("Có lỗi xảy ra khi thêm mới!");
    }
  };

  editDelPlace = async (delPlaces) => {
    try {
      await saveDelPlace(delPlaces);
      toast.success("Cập nhật thành công!");
      this.handleClose();
    } catch (error) {
      console.log(error);
      toast.warning("Có lỗi xảy ra khi cập nhật!");
    }
  };

  resetDelPlaceStore = () => {
    this.delPlaceList = [];
    this.selectedDelPlace = null;
    this.selectedDelPlaceList = [];
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