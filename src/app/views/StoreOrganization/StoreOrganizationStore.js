import { makeAutoObservable } from "mobx";
import { checkCodeStoreOrganization, deleteOrganizationById, getStoreOrganizationById, pagingStoreOrganization, saveOrUpdateStoreOrganization } from "./StoreOrganizationService";
import { toast } from "react-toastify";
import { SearchObject } from "app/common/Model/SearchObject";

const dataDefaultFormStoreOrganization = {
  id: null,
  name: null,
  code: null,
  orgProductType: null,
}

export default class StoreOrganizationStore {
  searchObject = new SearchObject();
  pageStoreOrganization = null;

  selectedStoreOrganization = null;
  openFormEditStoreOrganization = false;
  openConfirmDeleteStoreOrganization = false;

  constructor() {
    makeAutoObservable(this);
  }

  pagingStoreOrganization = async () => {
    try {
      const res = await pagingStoreOrganization(this.searchObject);
      this.pageStoreOrganization = res?.data;
    } catch (error) {
      console.error(error);
    }
  }

  handleChangeForm = (searchObj) => {
    this.searchObject = SearchObject.checkSearchObject(this.searchObject, searchObj);
    this.pagingStoreOrganization();
  }

  handleOpenFormStoreOrganization = async (id) => {
    if (id) {
      try {
        const res = await getStoreOrganizationById(id);
        this.selectedStoreOrganization = res?.data;
      } catch (err) {
        toast.error("Có lỗi xảy ra, vui lòng thử lại sau")
        console.error(err);
      }
    } else {
      this.selectedStoreOrganization = { ...dataDefaultFormStoreOrganization };
    }

    this.openFormEditStoreOrganization = true;
  }

  handleSubmitFormStoreOrganization = async (values) => {
    try {
      const res = await checkCodeStoreOrganization(values);
      if (res.data) {
        toast.error("Mã cơ sở đã được sử dụng!");
        return;
      }

      await saveOrUpdateStoreOrganization(values);
      toast.success(values?.id ? "Chỉnh sửa thành công" : "Thêm thành công")

      this.handleClosePopup();
      this.pagingStoreOrganization();
    } catch (err) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau")
      console.error(err);
    }
  }

  handleOpenConfirmDelete = (storeOrganization) => {
    this.selectedStoreOrganization = storeOrganization;
    this.openConfirmDeleteStoreOrganization = true;
  }

  handleConfirmDelete = () => {
    deleteOrganizationById(this.selectedStoreOrganization?.id).then(() => {
      toast.success("Đã xóa thành công")
      this.handleClosePopup();
      if (this.pageStoreOrganization?.content?.length === 1 && this.searchObject.pageIndex > 1) {
        --this.searchObject.pageIndex;
      }

      this.pagingStoreOrganization();
    }).catch(err => {
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau")
      console.error(err);
    })
  };

  handleClosePopup = () => {
    this.openFormEditStoreOrganization = false;
    this.openConfirmDeleteStoreOrganization = false;
  }

  resetStoreOrganizationStore = () => {
    this.searchObject = new SearchObject();
    this.pageStoreOrganization = null;

    this.selectedStoreOrganization = null;
    this.openFormEditStoreOrganization = false;
    this.openConfirmDeleteStoreOrganization = false;
  }
}