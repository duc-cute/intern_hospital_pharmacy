import { makeAutoObservable, runInAction } from "mobx";
import { pagingStockIns, getStockIn, deleteStockIn, saveStockIn } from "./StockInService";
import { toast } from "react-toastify";
import LocalConstants from "app/LocalConstants";
import { getDefaultStore } from "app/common/CommonFunctions";
import history from "history.js";
import Config from "app/appConfig";

const DATA_DEFAULT_STOCK_IN = {
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
  invoiceCode: null,
  supplier: null,
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
  status: null
}

export default class StockInStore {
  stockInList = [];
  selectedStockIn = null;
  selectedStockInList = [];
  totalElements = 0;
  totalPages = 0;
  page = 1;
  rowsPerPage = 10;
  loadingInitial = false;
  shouldOpenEditorDialog = false;
  shouldOpenConfirmationDialog = false;
  shouldOpenConfirmationDeleteListDialog = false;

  type = 1;
  keyword = "";
  pageIndex = 1;
  pageSize = 10;
  openFormStockIn = false;
  openConfirmDeleteStockIn = false;
  dataEditStockIn = { ...DATA_DEFAULT_STOCK_IN };
  searchObject = {
    ...defaultSeachObject,
  }

  constructor() {
    makeAutoObservable(this);
  }

  setLoadingInitial = (state) => {
    this.loadingInitial = state;
  };


  getListStockIn = () => {
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

    pagingStockIns(searchObject).then((response) => {
      runInAction(() => {
        this.stockInList = response.data.content;
        this.totalElements = response.data.totalElements;
        this.totalPages = response.data.totalPages;
      })
    }).catch((error) => {
      toast.warning("toast.load_fail");
    });
    this.loadingInitial = false;
  }

  setPageIndexStockIn = (pageIndex) => {
    this.pageIndex = pageIndex;
    this.getListStockIn();
  }

  setPageSizeStockIn = (size) => {
    this.pageIndex = 1;
    this.pageSize = size;
    this.getListStockIn();
  }

  setKeyWordStockIn = (keyword) => {
    this.keyword = keyword;
    this.pageIndex = 1;
    this.getListStockIn();
  }

  handleOpenFormStockIn = (id) => {
    if (id?.id) {
      const { store } = getDefaultStore();
      this.dataEditStockIn = {
        ...DATA_DEFAULT_STOCK_IN,
        toStore: store,
        type: this.type,
        kind: 1,
        supplier: id?.supplier,
        items: [id]
        // status: 0,

      };
      this.openFormStockIn = true;
    } else if (id) {
      getStockIn(id).then((response) => {
        this.dataEditStockIn = response.data;
        this.openFormStockIn = true;
      }).catch(() => {
        toast.warning("toast.get_fail");
      });
    } else {
      const { store } = getDefaultStore();
      this.dataEditStockIn = {
        ...DATA_DEFAULT_STOCK_IN,
        toStore: store,
        type: this.type,
      };
      this.openFormStockIn = true;
    }
  };

  handleClosePopup = () => {
    this.openFormStockIn = false;
    this.openConfirmDeleteStockIn = false;
    this.resetStoreStockIn()
    // history.replace("/stock-in")
  }

  handleSaveStockIn = async (values, redirect) => {
    if (Array.isArray(values.items) && values.items.length === 0) {
      toast.warning('Phải có ít nhất một thuốc - vật tư y tế!');
      return;
    }

    //cập nhật status nếu chưa xác nhận
    const obj = { ...values };
    if (obj?.status === LocalConstants.TRANSACTION_STATUS_NEW) {
      obj.status = LocalConstants.TRANSACTION_STATUS_CONFIRMED;
    }

    try {
      await saveStockIn(obj);

      toast.success("Lưu phiếu nhập kho thành công");

      if (redirect) {
        history.push(Config.ROOT_PATH + "manage/stock-in");
      } else {
        this.handleClosePopup();
        this.getListStockIn();
      }
    } catch (e) {
      toast.warning("toast.get_fail");
    }
  }

  handleDeleteStockIn = (stockIn) => {
    this.openConfirmDeleteStockIn = true;
    this.dataEditStockIn = stockIn;
  }

  handleConfirmDeleteStockIn = () => {
    deleteStockIn(this.dataEditStockIn.id).then((res) => {
      if (res?.data) {
        toast.success("Đã xoá bản ghi");
        this.getListStockIn();
      } else {
        toast.warning("Không thể xoá vì có dữ liệu ràng buộc");
      }
    }).catch(() => {
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
    });
    this.handleClosePopup();
  }


  resetStoreStockIn = () => {
    this.stockInList = [];
    this.selectedStockIn = null;
    this.selectedStockInList = [];
    this.totalElements = 0;
    this.totalPages = 0;
    this.page = 1;
    this.rowsPerPage = 10;
    this.loadingInitial = false;
    this.shouldOpenEditorDialog = false;
    this.shouldOpenConfirmationDialog = false;
    this.type = 1;
    this.keyword = "";
    this.pageIndex = 1;
    this.pageSize = 10;
    this.openFormStockIn = false;
    this.openConfirmDeleteStockIn = false;
    this.searchObject = { ...defaultSeachObject }
    this.getListStockIn()
  }

  handleSetSearchObject = obj => {
    this.searchObject = { ...obj }
    this.page = 1
  }

  handleResetSearchObject = () => this.searchObject = { ...defaultSeachObject }
}