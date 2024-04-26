import { makeAutoObservable, runInAction } from "mobx";
import {
  pagingStockOuts,
  getStockOut,
  deleteStockOut,
  saveStockOut,
} from "./StockOutService";
import { toast } from "react-toastify";
import LocalConstants from "app/LocalConstants";
import history from "history.js";
import { getDefaultStore } from "app/common/CommonFunctions";
import Config from "app/appConfig";


const DATA_DEFAULT_STOCK_OUT = {
  id: null,
  code: null,
  store: null,
  dateIssue: new Date(),
  type: null,
  kind: null,
  fromStore: null,
  toStore: null,
  items: [],
  status: null,
  invoiceCode: null
}

const defaultSeachObject = {
  keyword: "",
  region: null,
  province: null,
  district: null,
  ward: null,
  kind: null,
  // store: null,
  store1: null,
  store2: null,
  store3: null,
  store4: null,
  notComplete: false,
  stockOutRequired: false,
  status: null
}

export default class StockOutStore {
  selectedStockOut = null;
  selectedStockOutList = [];

  page = 1;
  rowsPerPage = 10;
  loadingInitial = false;
  shouldOpenEditorDialog = false;
  shouldOpenConfirmationDialog = false;
  shouldOpenConfirmationDeleteListDialog = false;

  stockOutList = [];
  totalElements = 0;
  totalPages = 0;
  type = -1;
  keyword = "";
  pageIndex = 1;
  pageSize = 10;
  dataEditStockOut = { ...DATA_DEFAULT_STOCK_OUT }
  openFormStockOut = false;
  openConfirmDeleteStockOut = false;
  searchObject = { ...defaultSeachObject }

  constructor() {
    makeAutoObservable(this);
  }

  setLoadingInitial = (state) => {
    this.loadingInitial = state;
  };

  getListStockOut = () => {
    this.loadingInitial = true;
    let storeId = null;
    if (this.searchObject?.store4?.id) {
      storeId = this.searchObject?.store4.id;
    } else if (this.searchObject?.store3?.id) {
      storeId = this.searchObject?.store3?.id;
    } else if (this.searchObject?.store2?.id) {
      storeId = this.searchObject?.store2?.id;
    } else if (this.searchObject?.store1?.id) {
      storeId = this.searchObject?.store1?.id;
    }
    const searchObject = {
      // keyword: this.keyword,
      ...this.searchObject,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      type: this.type,

      region: undefined,
      province: undefined,
      district: undefined,
      ward: undefined,
      store: undefined,
      store1: undefined,
      store2: undefined,
      store3: undefined,
      store4: undefined,
      regionId: this.searchObject?.region?.id,
      provinceId: this.searchObject?.province?.id,
      districtId: this.searchObject?.district?.id,
      wardId: this.searchObject?.ward?.id,
      storeId: storeId
    };

    try {
      pagingStockOuts(searchObject).then((response) => {
        runInAction(() => {
          this.stockOutList = response.data.content;
          this.totalElements = response.data.totalElements;
          this.totalPages = response.data.totalPages;
        })
      });
      ;
    } catch (error) {
      toast.warning("toast.load_fail");
    }
    this.loadingInitial = false
  }

  resetStockOutStore = () => {
    this.stockOutList = [];
    this.loadingInitial = false;
    this.totalElements = 0;
    this.totalPages = 0;
    this.type = -1;
    this.keyword = "";
    this.pageIndex = 1;
    this.pageSize = 10;
    this.dataEditStockOut = DATA_DEFAULT_STOCK_OUT;
    this.openConfirmDeleteStockOut = false;
    this.openFormStockOut = false;
    this.searchObject = { ...defaultSeachObject }
    this.getListStockOut();
  }

  setPageIndexStockOut = (page) => {
    this.pageIndex = page;
    this.getListStockOut()
  }

  setPageSizeStockOut = (size) => {
    this.pageSize = size;
    this.pageIndex = 1
    this.getListStockOut();
  }

  setKeyWordStockOut = (keyword) => {
    this.keyword = keyword;
    this.pageIndex = 1
    this.getListStockOut();
  }


  handleOpenFormStockOut = (id) => {
    if (id?.id) {
      const { store } = getDefaultStore();
      this.dataEditStockOut = {
        ...DATA_DEFAULT_STOCK_OUT,
        fromStore: store,
        kind: 4,
        type: this.type,
        items: [id]
        // status: 0,

      };
      console.log(this.dataEditStockIn);
      this.openFormStockOut = true;
    } else if (id) {
      getStockOut(id).then((response) => {
        this.dataEditStockOut = response.data;
        this.openFormStockOut = true;
      }).catch(() => {
        toast.warning("toast.get_fail");
      });
    } else {
      const { store } = getDefaultStore();
      this.dataEditStockOut = {
        ...DATA_DEFAULT_STOCK_OUT,
        type: this.type,
        fromStore: store
      };
      this.openFormStockOut = true;
    }
  }

  handleSaveStockOut = async (values, redirect) => {
    if (Array.isArray(values.items) && values.items.length === 0) {
      toast.warning('Phải có ít nhất một thuốc - vật tư y tế!')
      return;
    }

    //cập nhật status nếu chưa xác nhận
    const obj = { ...values };
    if (obj?.status === LocalConstants.TRANSACTION_STATUS_NEW) {
      obj.status = LocalConstants.TRANSACTION_STATUS_CONFIRMED;
    }

    try {
      await saveStockOut(obj);
      toast.success("Lưu phiếu xuất kho thành công");

      if (redirect) {
        history.push(Config.ROOT_PATH + "manage/stock-out");
      } else {
        this.handleClosePopup();
        this.getListStockOut();
      }
    } catch (e) {
      toast.warning("toast.get_fail");
    }
  }

  handleDeleteStockOut = (stockOut) => {
    this.dataEditStockOut = stockOut;
    this.openConfirmDeleteStockOut = true;
  }

  handleConfirmDeleteStockOut = () => {
    deleteStockOut(this.dataEditStockOut.id).then((res) => {
      if (res?.data) {
        toast.success("Đã xoá bản ghi");
        this.getListStockOut();
      } else {
        toast.warning("Không thể xoá vì có dữ liệu ràng buộc");
      }
    }).catch(() => {
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
    });
    this.handleClosePopup();
  }

  handleClosePopup = () => {
    this.openFormStockOut = false;
    this.openConfirmDeleteStockOut = false;
    this.resetStockOutStore()
    // history.replace("/stock-out")
  }


  handleSetSearchObject = obj => {
    this.searchObject = { ...obj }
    this.page = 1
  }

  handleResetSearchObject = () => this.searchObject = { ...defaultSeachObject }

}
