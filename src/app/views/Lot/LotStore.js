import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";
import { Lot } from "app/common/Model/Lot";
import { LotSearch, SearchObject } from "app/common/Model/SearchObject";
import { TransactionStatus } from "app/common/Constant/LocalConstant";
import { deleteLot, getLotById, pagingLot, saveLot } from "./LotService";

class LotStore {
  searchObject = new LotSearch();
  pageLot = null;
  selectedLot = null;
  openForm = false;
  openConfirmDeleteLot = false;

  constructor() {
    makeAutoObservable(this);
  }

  pagingLot = async () => {
    try {
      const obj = { ...this.searchObject, productId: this.searchObject.product?.id || null };


      if (Array.isArray(obj?.sources) && obj.sources.length > 0) {
        obj.sourceIds = obj.sources?.map(item => item?.id)
      }

      const res = await pagingLot(obj);
      this.pageLot = res.data;
    } catch (error) {
      toast.warning("toast.load_fail");
    }
  }

  handleChangeFormSearch = (obj) => {
    this.searchObject = SearchObject.checkSearchObject(this.searchObject, obj);

    this.pagingLot();
  }

  handleOpenForm = async (lotId) => {
    try {
      if (lotId) {
        this.selectedLot = (await getLotById(lotId)).data;
      }

      if (!this.selectedLot || !lotId) {
        this.selectedLot = new Lot();
      }

      this.openForm = true;
    } catch (error) {
      toast.warning("toast.load_fail");
    }
  }

  handleSaveLot = async (values) => {
    try {
      //cập nhật status nếu chưa xác nhận
      const obj = { ...values };
      if (obj.status === TransactionStatus.WAIT_CONFIRM) {
        obj.status = TransactionStatus.CONFIRMED;
      }

      const res = await saveLot(obj);
      if (res.data) {
        toast.success("Lưu thông tin lô hàng thành công");

        this.pagingLot();
        this.handleClosePopup();
      }
    } catch (error) {
      toast.warning("toast.get_fail");
    }
  }

  handleDeleteLot = (lot) => {
    this.selectedLot = lot;
    this.openConfirmDeleteLot = true;
  }

  handleConfirmDeleteLot = async () => {
    try {
      const res = await deleteLot(this.selectedLot.id);

      if (res?.data) {
        toast.success("Đã xoá bản ghi");
        this.pagingLot();
        this.handleClosePopup();
      } else {
        toast.warning("Không thể xoá vì có dữ liệu ràng buộc");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
    }
  }

  handleClosePopup = () => {
    this.openForm = false;
    this.openConfirmDeleteLot = false;
  }

  resetStore = () => {
    this.searchObject = new LotSearch();
    this.pageLot = null;
    this.selectedLot = null;
    this.openForm = false;
    this.openConfirmDeleteLot = false;
  }
}

export default LotStore;