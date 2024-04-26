import { makeAutoObservable } from "mobx";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { 
  getBankAccountById, 
  pagingBankAccount, 
  deleteBankAccount,
  saveBankAccount,
} from "./BankAccountService";

export default class BankAccountStore {
  bankAccountList = [];
  selectedBankAccount = null;
  selectedBankAccountList = [];
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
      let data = await pagingBankAccount(searchObject);
      this.bankAccountList = data.data.content;
      this.totalElements = data.data.totalElements;
      this.totalPages = data.data.totalPages;
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      toast.warning("toast.load_fail");
      this.setLoadingInitial(false);
    }
  };

  handleEditBankAccount = (id) => {
    this.getBankAccount(id).then(() => {
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
    this.getBankAccount(id).then(() => {
      this.shouldOpenConfirmationDialog = true;
    });
  };

  handleDeleteList = () => {
    this.shouldOpenConfirmationDeleteListDialog = true;
  };

  handleConfirmDelete = async () => {
    try {
      const res = await deleteBankAccount(this.selectedBankAccount.id);
      if (res?.data) {
        toast.success("Đã xoá bản ghi!");
      } else {
        toast.warning("Không thể xoá vì có dữ liệu ràng buộc!");
      }
      this.handleClose();
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
    }
  };

  handleSelectBankAccount = (shiftwork) => {
    this.selectedBankAccount = shiftwork;
  };

  handleSelectListBankAccount = (shiftworks) => {
    this.selectedBankAccountList = shiftworks;
    console.log(this.selectedBankAccountList);
  };

  getBankAccount = async (id) => {
    if (id != null) {
      try {
        let data = await getBankAccountById(id);
        this.handleSelectBankAccount(data.data);
      } catch (error) {
        console.log(error);
        toast.warning("toast.get_fail");
      }
    } else {
      this.handleSelectBankAccount(null);
    }
  };

  editBankAccount = async (shiftwork) => {
    try {
      const res = await saveBankAccount(shiftwork);
      toast.success("Cập nhật thành công!");
      this.handleClose();
      return res;
    } catch (error) {
      console.log(error);
      toast.warning("Có lỗi xảy ra khi cập nhật!");
    }
  };

  resetBankAccountStore = () => {
    this.bankAccountList = [];
    this.selectedBankAccount = null;
    this.selectedBankAccountList = [];
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