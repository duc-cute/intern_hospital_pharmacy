import { makeAutoObservable } from "mobx";
import {
  pagingStockKeepingUnits,
  getStockKeepingUnit,
  deleteStockKeepingUnit,
  checkCodeStockKeepingUnit,
  saveStockKeepingUnit,
} from "./StockKeepingUnitService";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { SearchObject } from "app/common/Model/SearchObject";
import { StockKeepingUnit } from "app/common/Model/StockKeepingUnit";

export default class StockKeepingUnitStore {
  pageStockKeepingUnit = null;
  searchStockKeepingUnit = new SearchObject();

  openForm = false;
  openConfirmDelete = false;
  selectedStockKeepingUnit = null;

  constructor() {
    makeAutoObservable(this);
  }

  pagingStockKeepingUnits = async () => {
    try {
      let res = await pagingStockKeepingUnits({ ...this.searchStockKeepingUnit });
      this.pageStockKeepingUnit = res?.data;
    } catch (error) {
      toast.warning("toast.load_fail");
    }
  }

  handleChangeFormSearch = (searchObject) => {
    this.searchStockKeepingUnit = SearchObject.checkSearchObject(this.searchStockKeepingUnit, searchObject);
    this.pagingStockKeepingUnits();
  }

  handleOpenForm = async (stockKeepingUnitId) => {
    try {
      let newStockKeepUnit = new StockKeepingUnit();
      if (stockKeepingUnitId) {
        newStockKeepUnit = (await getStockKeepingUnit(stockKeepingUnitId)).data;
      }
      this.selectedStockKeepingUnit = newStockKeepUnit;
      this.openForm = true;
    } catch (error) {
      toast.warning("toast.get_fail");
    }
  }

  handleSaveStockKeepUnit = async (stockKeepingUnit, { setSubmitting }) => {
    try {
      const resCheckCode = await checkCodeStockKeepingUnit(stockKeepingUnit);
      if (resCheckCode.data) {
        toast.warning("Mã đã được sử dụng!");
      } else {
        const res = await saveStockKeepingUnit(stockKeepingUnit);
        if (res) {
          toast.success(stockKeepingUnit?.id ? "Cập nhật thành công!" : "Thêm mới thành công!");
        }
        this.handleClosePopup();
      }
    } catch {
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
    } finally {
      setSubmitting(false)
    }
  }

  handleOpenConfirmDelete = (stockKeepingUnitId) => {
    this.selectedStockKeepingUnit = { id: stockKeepingUnitId };
    this.openConfirmDelete = true;
  }

  handleConfirmDelete = async () => {
    try {
      const res = await deleteStockKeepingUnit(this.selectedStockKeepingUnit.id);
      if (res?.data) {
        toast.success("Đã xoá bản ghi");
      } else {
        toast.warning("Không thể xoá vì có dữ liệu ràng buộc");
      }
      this.handleClosePopup();
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
    }
  }

  handleClosePopup = () => {
    this.openForm = false;
    this.openConfirmDelete = false;
    this.pagingStockKeepingUnits();
  };

  resetStore = () => {
    this.pageStockKeepingUnit = null;
    this.searchStockKeepingUnit = new SearchObject();
  }
}
