import { makeAutoObservable } from "mobx";
import {
  pagingAttributes,
  getAttribute,
  createAttribute,
  editAttribute,
  deleteAttribute,
} from "./AttributeService";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const searchObjInit = {
  keyword: "",
  pageIndex: 1,
  pageSize: 10
}

export default class AttributeStore {
  attributeList = [];
  selectedAttribute = null;
  selectedAttributeList = [];
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
      let data = await pagingAttributes(searchObject);
      this.attributeList = data.data.content;
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

  handleEditAttribute = (id) => {
    this.getAttribute(id).then(() => {
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
    this.getAttribute(id).then(() => {
      this.shouldOpenConfirmationDialog = true;
    });
  };

  handleDeleteList = () => {
    this.shouldOpenConfirmationDeleteListDialog = true;
  };

  handleConfirmDelete = async () => {
    // this.deleteAttribute(this.selectedAttribute.id);
    try {
      const res = await deleteAttribute(this.selectedAttribute.id);
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
    for (var i = 0; i < this.selectedAttributeList.length; i++) {
      try {
        await deleteAttribute(this.selectedAttributeList[i].id);
      } catch (error) {
        listAlert.push(this.selectedAttributeList[i].name);
        console.log(error);
        console.log(listAlert.toString());
        toast.warning("toast.delete_fail");
      }
    }
    this.handleClose();
    toast.success("Đã xóa thành công!");
  };

  getAttribute = async (id) => {
    if (id != null) {
      try {
        let data = await getAttribute(id);
        this.handleSelectAttribute(data.data);
      } catch (error) {
        console.log(error);
        toast.warning("toast.get_fail");
      }
    } else {
      this.handleSelectAttribute(null);
    }
  };

  handleSelectAttribute = (attribute) => {
    this.selectedAttribute = attribute;
  };

  handleSelectListAttribute = (attributes) => {
    this.selectedAttributeList = attributes;
    console.log(this.selectedAttributeList);
  };

  createAttribute = async (attribute) => {
    try {
      await createAttribute(attribute);
      toast.success("Thêm mới thành công!");
      this.handleClose();
    } catch (error) {
      console.log(error);
      toast.warning("Có lỗi xảy ra khi thêm mới!");
    }
  };

  editAttribute = async (attribute) => {
    try {
      await editAttribute(attribute);
      toast.success("Cập nhật thành công!");
      this.handleClose();
    } catch (error) {
      console.log(error);
      toast.warning("Có lỗi xảy ra khi cập nhật!");
    }
  };

  resetAttributeStore = () => {
    this.attributeList = [];
    this.selectedAttribute = null;
    this.selectedAttributeList = [];
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
