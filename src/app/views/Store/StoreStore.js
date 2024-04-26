import { makeAutoObservable } from "mobx";
import {
  pagingStores,
  getStore,
  deleteStore,
  saveStore,
} from "./StoreService";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { StoreSearch, SearchObject } from "app/common/Model/SearchObject";
import { Store } from "app/common/Model/Store";

function flatten(into, node) {
  if (node === null) return into;
  if (Array.isArray(node)) return node.reduce(flatten, into);
  into.push(node);
  return flatten(into, node.children);
}

export default class StoreStore {
  selectedStore = null;
  openForm = false;
  openConfirmDelete = false;

  pageStore = null;
  searchStore = new StoreSearch();

  constructor() {
    makeAutoObservable(this);
  }

  pagingStore = async (obj) => {
    try {
      const res = await pagingStores({ ...this.searchStore });
      res.data.content = flatten([], res.data.content);
      this.pageStore = res?.data;
    } catch (error) {
      toast.warning("toast.load_fail");
    }
  }

  handleChangeFormSearch = (searchObject) => {
    this.searchStore = SearchObject.checkSearchObject(this.searchStore, searchObject);
    this.pagingStore();
  }

  handleOpenForm = async (storeId) => {
    try {
      let newStore = new Store();
      if (storeId) {
        newStore = (await getStore(storeId)).data;
      }
      this.selectedStore = newStore;
      this.openForm = true;
    } catch (error) {
      toast.warning("toast.get_fail");
    }
  }

  handleSaveStore = async (store, { setSubmitting }) => {
    try {
      const res = await saveStore(store);
      if (res) {
        toast.success(store?.id ? "Cập nhật thành công!" : "Thêm mới thành công!");
      }
      this.handleClosePopup();
    } catch {
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
    } finally {
      setSubmitting(false)
    }
  }

  handleOpenConfirmDelete = (storeId) => {
    this.selectedStore = { id: storeId };
    this.openConfirmDelete = true;
  }

  handleConfirmDelete = async () => {
    try {
      const res = await deleteStore(this.selectedStore.id);
      if (res?.data) {
        toast.success("Đã xoá bản ghi");
      } else {
        toast.warning("Không thể xoá vì có dữ liệu ràng buộc");
      }
      this.handleClosePopup();
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
    }
  };

  handleClosePopup = () => {
    this.openForm = false;
    this.openConfirmDelete = false;
    this.pagingStore();
  };

  resetStore = () => {
    this.pageStore = null;
    this.searchStore = new StoreSearch();
  }
}
