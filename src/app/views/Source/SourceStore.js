import { makeAutoObservable } from "mobx";
import {
  pagingSources,
  getSource,
  createSource,
  editSource,
  deleteSource
} from "./SourceService";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export default class SourceStore {
  sourceList = [];
  selectedSource = null;
  selectedSourceList = [];
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
      let data = await pagingSources(searchObject);
      this.sourceList = data.data.content;
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

  handleEditSource = (id) => {
    this.getSource(id).then(() => {
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
    this.getSource(id).then(() => {
      this.shouldOpenConfirmationDialog = true;
    });
  };

  handleDeleteList = () => {
    this.shouldOpenConfirmationDeleteListDialog = true;
  };

  handleConfirmDelete = async () => {
    try {
      const res = await deleteSource(this.selectedSource.id);
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
    for (var i = 0; i < this.selectedSourceList.length; i++) {
      try {
        await deleteSource(this.selectedSourceList[i].id);
      } catch (error) {
        listAlert.push(this.selectedSourceList[i].name);
        toast.warning("toast.delete_fail");
      }
    }
    this.handleClose();
    toast.success("Đã xóa thành công!");
  };

  getSource = async (id) => {
    if (id != null) {
      try {
        let data = await getSource(id);
        this.handleSelectSource(data.data);
      } catch (error) {
        console.log(error);
        toast.warning("toast.get_fail");
      }
    } else {
      this.handleSelectSource(null);
    }
  };

  handleSelectSource = (source) => {
    this.selectedSource = source;
  };

  handleSelectListSource = (sources) => {
    this.selectedSourceList = sources;
    console.log(this.selectedSourceList);
  };

  createSource = async (source) => {
    try {
      await createSource(source);
      toast.success("Thêm mới thành công!");
      this.handleClose();
    } catch (error) {
      console.log(error);
      toast.warning("Có lỗi xảy ra khi thêm mới!");
    }
  };

  editSource = async (source) => {
    try {
      await editSource(source);
      toast.success("Cập nhật thành công!");
      this.handleClose();
    } catch (error) {
      console.log(error);
      toast.warning("Có lỗi xảy ra khi cập nhật!");
    }
  };

  resetSourceStore =()=>{
    this.sourceList = [];
    this.selectedSource = null;
    this.selectedSourceList = [];
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
