import { makeAutoObservable, runInAction } from "mobx";
import {
  pagingProductUsage,
  getProductUsage,
  // createProductUsage,
  // editProductUsage,
  deleteProductUsage, saveOrUpdateProductUsage,
} from "./ProductUsageService";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export default class ProductUsageStore {
  productUsageList = [];
  selectedProductUsage = null;
  selectedProductUsageList = [];
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
      let res = await pagingProductUsage(searchObject);
      runInAction(() => {
        this.productUsageList = res?.data?.content || [];
        this.totalElements = res?.data?.totalElements;
        this.totalPages = res?.data?.totalPages;
      })
      this.setLoadingInitial(false);
    } catch (error) {
      console.error(error);
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

  handleEditProductUsage = (id) => {
    this.getProductUsage(id).then(() => {
      this.shouldOpenEditorDialog = true;
    });
  };

  handleClose = (updateListOnClose) => {
    this.shouldOpenEditorDialog = false;
    this.shouldOpenConfirmationDialog = false;
    this.shouldOpenConfirmationDeleteListDialog = false;
    if (updateListOnClose) this.updatePageData();
  };

  handleDelete = (id) => {
    this.getProductUsage(id).then(() => {
      this.shouldOpenConfirmationDialog = true;
    });
  };

  handleDeleteList = () => {
    this.shouldOpenConfirmationDeleteListDialog = true;
  };

  handleConfirmDelete = async () => {
    // this.deleteProductUsage(this.selectedProductUsage.id);
    try {
      const res = await deleteProductUsage(this.selectedProductUsage.id);
      if (res?.data) {
        toast.success("Đã xoá bản ghi");
      } else {
        toast.warning("Không thể xoá vì có dữ liệu ràng buộc");
      }
      this.handleClose(true);
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
    }
  };

  handleConfirmDeleteList = async () => {
    let listAlert = [];
    for (var i = 0; i < this.selectedProductUsageList.length; i++) {
      try {
        await deleteProductUsage(this.selectedProductUsageList[i].id);
      } catch (error) {
        listAlert.push(this.selectedProductUsageList[i].name);
        toast.warning("toast.delete_fail");
      }
    }
    this.handleClose();
    toast.success("Đã xóa thành công!");
  };

  getProductUsage = async (id) => {
    if (id != null) {
      try {
        let data = await getProductUsage(id);
        this.handleSelectProductUsage(data.data);
      } catch (error) {
        console.log(error);
        toast.warning("toast.get_fail");
      }
    } else {
      this.handleSelectProductUsage(null);
    }
  };

  handleSelectProductUsage = (productUsage) => {
    this.selectedProductUsage = productUsage;
  };

  handleSelectListProductUsage = (productUsages) => {
    this.selectedProductUsageList = productUsages;
    console.log(this.selectedProductUsageList);
  };

  // createProductUsage = async (productUsage) => {
  //   try {
  //     // let responseCheckCode = await checkCode(productUsage);
  //     // if (responseCheckCode.data) {
  //     //   toast.warning("Mã đã được sử dụng!");
  //     // } else {
  //     const res = await createProductUsage(productUsage);
  //     toast.success("Thêm mới thành công!");
  //     this.handleClose(true);
  //     return res?.data
  //     // }
  //   } catch (error) {
  //     console.log(error);
  //     toast.warning("Có lỗi xảy ra khi thêm mới!");
  //   }
  // };
  //
  // editProductUsage = async (productUsage) => {
  //   try {
  //     // let responseCheckCode = await checkCode(productUsage);
  //     // if (responseCheckCode.data) {
  //     //   toast.warning("Mã đã được sử dụng!");
  //     // } else {
  //     const res = await editProductUsage(productUsage);
  //     toast.success("Cập nhật thành công!");
  //     this.handleClose(true);
  //     return res?.data
  //     // }
  //   } catch (error) {
  //     console.log(error);
  //     toast.warning("Có lỗi xảy ra khi cập nhật!");
  //   }
  // };

  saveOrUpdateProductUsage = async (productUsage) => {
    try {
      const res = await saveOrUpdateProductUsage(productUsage);
      toast.success(productUsage?.id ? "Thêm mới!" : "Chỉnh sửa" + "thành công");
      this.handleClose(true);
      return res?.data
      // }
    } catch (error) {
      console.log(error);
      toast.warning("Có lỗi xảy ra khi thêm mới!");
    }
  };

  resetProductUsageStore = () => {
    this.productUsageList = [];
    this.selectedProductUsage = null;
    this.selectedProductUsageList = [];
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
