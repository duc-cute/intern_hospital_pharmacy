import { makeAutoObservable, runInAction } from "mobx";
import {
  pagingCountry,
  getCountry,
  // createCountry,
  // editCountry,
  deleteCountry, saveOrUpdateCountry,
} from "./CountryService";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export default class CountryStore {
  countryList = [];
  selectedCountry = null;
  selectedCountryList = [];
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
      let res = await pagingCountry(searchObject);
      runInAction(() => {
        this.countryList = res?.data?.content || [];
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

  handleEditCountry = (id) => {
    this.getCountry(id).then(() => {
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
    this.getCountry(id).then(() => {
      this.shouldOpenConfirmationDialog = true;
    });
  };

  handleDeleteList = () => {
    this.shouldOpenConfirmationDeleteListDialog = true;
  };

  handleConfirmDelete = async () => {
    // this.deleteCountry(this.selectedCountry.id);
    try {
      const res = await deleteCountry(this.selectedCountry.id);
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
    for (var i = 0; i < this.selectedCountryList.length; i++) {
      try {
        await deleteCountry(this.selectedCountryList[i].id);
      } catch (error) {
        listAlert.push(this.selectedCountryList[i].name);
        toast.warning("toast.delete_fail");
      }
    }
    this.handleClose();
    toast.success("Đã xóa thành công!");
  };

  getCountry = async (id) => {
    if (id != null) {
      try {
        let data = await getCountry(id);
        this.handleSelectCountry(data.data);
      } catch (error) {
        console.log(error);
        toast.warning("toast.get_fail");
      }
    } else {
      this.handleSelectCountry(null);
    }
  };

  handleSelectCountry = (country) => {
    this.selectedCountry = country;
  };

  handleSelectListCountry = (countrys) => {
    this.selectedCountryList = countrys;
    console.log(this.selectedCountryList);
  };

  // createCountry = async (country) => {
  //   try {
  //     // let responseCheckCode = await checkCode(country);
  //     // if (responseCheckCode.data) {
  //     //   toast.warning("Mã đã được sử dụng!");
  //     // } else {
  //     const res = await createCountry(country);
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
  // editCountry = async (country) => {
  //   try {
  //     // let responseCheckCode = await checkCode(country);
  //     // if (responseCheckCode.data) {
  //     //   toast.warning("Mã đã được sử dụng!");
  //     // } else {
  //     const res = await editCountry(country);
  //     toast.success("Cập nhật thành công!");
  //     this.handleClose(true);
  //     return res?.data
  //     // }
  //   } catch (error) {
  //     console.log(error);
  //     toast.warning("Có lỗi xảy ra khi cập nhật!");
  //   }
  // };

  saveOrUpdateCountry = async (country) => {
    try {
      const res = await saveOrUpdateCountry(country);
      toast.success(country?.id ? "Thêm mới!" : "Chỉnh sửa" + "thành công");
      this.handleClose(true);
      return res?.data
      // }
    } catch (error) {
      console.log(error);
      toast.warning("Có lỗi xảy ra khi thêm mới!");
    }
  };

  resetCountryStore = () => {
    this.countryList = [];
    this.selectedCountry = null;
    this.selectedCountryList = [];
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
