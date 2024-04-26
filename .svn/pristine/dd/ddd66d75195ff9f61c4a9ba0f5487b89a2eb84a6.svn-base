import { deleteDelPartner, deleteDelPartnerMulti, getDelPartnerById, pagingDelPartner, saveDelPartner } from "./DeliveryPartnerService";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { makeAutoObservable } from "mobx";

export default class DeliveryPartnerStore {
  delPartnerList = [];
  selectedDelPartner = null;
  selectedDelPartnerList = [];
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
      let data = await pagingDelPartner(searchObject);
      this.delPartnerList = data.data.content;
      this.totalElements = data.data.totalElements;
      this.totalPages = data.data.totalPages;
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      toast.warning("toast.load_fail");
      this.setLoadingInitial(false);
    }
  };

  handleEditDelPartner = (id) => {
    this.getDelPartner(id).then(() => {
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
    this.getDelPartner(id).then(() => {
      this.shouldOpenConfirmationDialog = true;
    });
  };

  handleDeleteList = () => {
    this.shouldOpenConfirmationDeleteListDialog = true;
  };

  handleConfirmDelete = async () => {
    try {
      const res = await deleteDelPartner(this.selectedDelPartner.id);
      if (res?.data) {
        toast.success("Đã xoá đơn vị vận chuyển!");
      } else {
        toast.warning("Không thể xoá vì có dữ liệu ràng buộc!");
      }
      this.handleClose();
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
    }
  };

  handleSelectDelPartner = (delPartner) => {
    this.selectedDelPartner = delPartner;
  };

  handleSelectListDelPartner = (delPartners) => {
    this.selectedDelPartnerList = delPartners;
  };

  handleConfirmDeleteList = async () => {
    let listDelete = [];
    for (let i = 0; i < this.selectedDelPartnerList.length; i++) {
        listDelete.push(this.selectedDelPartnerList[i]);
    }

    try {
      await deleteDelPartnerMulti(listDelete);
      toast.success("Đã xóa thành công!");
    } catch (error) {
      toast.warning("toast.delete_fail");
    } finally {
      this.handleClose();
    }
  };

  getDelPartner = async (id) => {
    if (id != null) {
      try {
        let data = await getDelPartnerById(id);
        this.handleSelectDelPartner(data.data);
      } catch (error) {
        console.log(error);
        toast.warning("toast.get_fail");
      }
    } else {
      this.handleSelectDelPartner(null);
    }
  };

  createOrUpdateDelPartner = async (delPartner) => {
    try {
      await saveDelPartner(delPartner);
      if (delPartner.id) {
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

  resetDelPartnerStore = () => {
    this.delPartnerList = [];
    this.selectedDelPartner = null;
    this.selectedDelPartnerList = [];
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