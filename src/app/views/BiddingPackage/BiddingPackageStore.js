import { makeAutoObservable } from "mobx";
import {
  pagingBiddingPackages,
  getBiddingPackage,
  createBiddingPackage,
  editBiddingPackage,
  deleteBiddingPackage,
} from "./BiddingPackageService";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const searchObjInit = {
  keyword: "",
  pageIndex: 1,
  pageSize: 10
}

export default class BiddingPackageStore {
  biddingPackageList = [];
  selectedBiddingPackage = null;
  selectedBiddingPackageList = [];
  totalElements = 0;
  totalPages = 0;
  page = 1;
  rowsPerPage = 10;
  keyword = "";
  loadingInitial = false;
  shouldOpenEditorDialog = false;
  shouldOpenConfirmationDialog = false;
  shouldOpenConfirmationDeleteListDialog = false;
  searchObject = {...searchObjInit};

  constructor() {
    makeAutoObservable(this);
  }

  setLoadingInitial = (state) => {
    this.loadingInitial = state;
  };

  updatePageData = (item) => {
    if (item != null) {
      this.page = this?.pageIndex;
      this.pageSize = this?.pageSize;
      this.keyword = this?.keyword;
      this.search(item);
    } else {
      this.search();
    }
  };

  handleSetSearchObject = (obj) => {
    this.searchObject = {...searchObjInit, ...obj};
    this.page = 1
    this.keyword = obj?.keyword;
    this.pageSize = obj?.pageSize;
  }

  handleResetSearchObject = () => {
   this.keyword = "";
   this.searchObject = {...searchObjInit};
  }


  search = async () => {
    this.loadingInitial = true;
    var searchObject = {
      keyword: this.keyword,
      pageIndex: this.page,
      pageSize: this.rowsPerPage,
      type: this.searchObject?.type
    };

    try {
      let data = await pagingBiddingPackages(searchObject);
      this.biddingPackageList = data.data.content;
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

  handleEditBiddingPackage = (id) => {
    this.getBiddingPackage(id).then(() => {
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
    this.getBiddingPackage(id).then(() => {
      this.shouldOpenConfirmationDialog = true;
    });
  };

  handleDeleteList = () => {
    this.shouldOpenConfirmationDeleteListDialog = true;
  };

  handleConfirmDelete = async () => {
    // this.deleteBiddingPackage(this.selectedBiddingPackage.id);
    try {
      const res = await deleteBiddingPackage(this.selectedBiddingPackage.id);
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
    for (var i = 0; i < this.selectedBiddingPackageList.length; i++) {
      try {
        await deleteBiddingPackage(this.selectedBiddingPackageList[i].id);
      } catch (error) {
        listAlert.push(this.selectedBiddingPackageList[i].name);
        console.log(error);
        console.log(listAlert.toString());
        toast.warning("toast.delete_fail");
      }
    }
    this.handleClose();
    toast.success("Đã xóa thành công!");
  };

  getBiddingPackage = async (id) => {
    if (id != null) {
      try {
        let data = await getBiddingPackage(id);
        this.handleSelectBiddingPackage(data.data);
      } catch (error) {
        console.log(error);
        toast.warning("toast.get_fail");
      }
    } else {
      this.handleSelectBiddingPackage(null);
    }
  };

  handleSelectBiddingPackage = (biddingPackage) => {
    this.selectedBiddingPackage = biddingPackage;
  };

  handleSelectListBiddingPackage = (biddingPackages) => {
    this.selectedBiddingPackageList = biddingPackages;
    console.log(this.selectedBiddingPackageList);
  };

  createBiddingPackage = async (biddingPackage) => {
    try {
      await createBiddingPackage(biddingPackage);
      toast.success("Thêm mới thành công!");
      this.handleClose();
    } catch (error) {
      console.log(error);
      toast.warning("Có lỗi xảy ra khi thêm mới!");
    }
  };

  editBiddingPackage = async (biddingPackage) => {
    try {
      await editBiddingPackage(biddingPackage);
      toast.success("Cập nhật thành công!");
      this.handleClose();
    } catch (error) {
      console.log(error);
      toast.warning("Có lỗi xảy ra khi cập nhật!");
    }
  };

  resetBiddingPackageStore = () => {
    this.biddingPackageList = [];
    this.selectedBiddingPackage = null;
    this.selectedBiddingPackageList = [];
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
