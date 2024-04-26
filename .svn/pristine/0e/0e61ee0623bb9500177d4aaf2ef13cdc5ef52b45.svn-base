import { makeAutoObservable } from "mobx";
import {
  pagingServiceRequestForm,
  getServiceRequestForm,
  createServiceRequestForm,
  editServiceRequestForm,
  deleteServiceRequestForm,
} from "../Services/ServiceRequestFormService";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export default class ServiceRequestFormStore {
  serviceRequestFormList = [];
  selectedServiceRequestForm = null;
  selectedServiceRequestFormList = [];
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
      let data = await pagingServiceRequestForm(searchObject);
      this.serviceRequestFormList = data.data.content;
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

  handleEditServiceRequestForm = (id) => {
    this.getServiceRequestForm(id).then(() => {
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
    this.getServiceRequestForm(id).then(() => {
      this.shouldOpenConfirmationDialog = true;
    });
  };

  handleDeleteList = () => {
    this.shouldOpenConfirmationDeleteListDialog = true;
  };

  handleConfirmDelete = async () => {
    // this.deleteServiceRequestForm(this.selectedServiceRequestForm.id);
    try {
      const res = await deleteServiceRequestForm(this.selectedServiceRequestForm.id);
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
    for (var i = 0; i < this.selectedServiceRequestFormList.length; i++) {
      try {
        await deleteServiceRequestForm(this.selectedServiceRequestFormList[i].id);
      } catch (error) {
        listAlert.push(this.selectedServiceRequestFormList[i].name);
        console.log(error);
        console.log(listAlert.toString());
        toast.warning("toast.delete_fail");
      }
    }
    this.handleClose();
    toast.success("Đã xóa thành công!");
  };

  getServiceRequestForm = async (id) => {
    if (id != null) {
      try {
        let data = await getServiceRequestForm(id);
        this.handleSelectServiceRequestForm(data.data);
      } catch (error) {
        console.log(error);
        toast.warning("toast.get_fail");
      }
    } else {
      this.handleSelectServiceRequestForm(null);
    }
  };

  handleSelectServiceRequestForm = (ServiceRequestForm) => {
    this.selectedServiceRequestForm = ServiceRequestForm;
  };

  handleSelectListServiceRequestForm = (ServiceRequestForms) => {
    this.selectedServiceRequestFormList = ServiceRequestForms;
    console.log(this.selectedServiceRequestFormList);
  };

  createServiceRequestForm = async (ServiceRequestForm) => {
    try {
      // let responseCheckCode = await checkCode(ServiceRequestForm);
      // if (responseCheckCode.data) {
      //   toast.warning("Mã đã được sử dụng!");
      // } else {
        await createServiceRequestForm(ServiceRequestForm);
        toast.success("Thêm mới thành công!");
        this.handleClose();
      // }
    } catch (error) {
      console.log(error);
      toast.warning("Có lỗi xảy ra khi thêm mới!");
    }
  };

  editServiceRequestForm = async (ServiceRequestForm) => {
    try {
      // let responseCheckCode = await checkCode(ServiceRequestForm);
      // if (responseCheckCode.data) {
      //   toast.warning("Mã đã được sử dụng!");
      // } else {
        await editServiceRequestForm(ServiceRequestForm);
        toast.success("Cập nhật thành công!");
        this.handleClose();
      // }
    } catch (error) {
      console.log(error);
      toast.warning("Có lỗi xảy ra khi cập nhật!");
    }
  };
}
