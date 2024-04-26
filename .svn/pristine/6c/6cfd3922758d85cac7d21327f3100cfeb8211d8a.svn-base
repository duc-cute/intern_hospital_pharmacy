import { makeAutoObservable } from "mobx";
import { pagingStaffs, getStaff, deleteStaff, saveStaff, saveUserAndStaff } from "./StaffService";
import { toast } from "react-toastify";
import { SearchObject } from "app/common/Model/SearchObject";
import { Staff } from "app/common/Model/Staff";

const initStaff = {
  staffCode: null,
  displayName: null,
  birthDate: null,
  gender: null,
  phoneNumber: null,
  email: null,
  idNumber: null,
  createUser: false,
  user: null,
}
export default class StaffStore {
  listAllStaff = null;
  selectedStaff = {...initStaff};
  openForm = false;
  openConfirmDelete = false;

  searchStaff = new SearchObject();
  pageStaff = null;

  checkAllStaff = false;

  constructor() {
    makeAutoObservable(this);
  }

  getAllStaff = async () => {
    try {
      if (!this.checkAllStaff) {
        const res = await pagingStaffs({ pageSize: 10000, pageIndex: 1 });
        this.listAllStaff = res.data?.content || [];

        this.checkAllStaff = true;

        return res.data?.content[0];
      } else {
        return this.listAllStaff[0];
      }
    } catch (err) {
    }
  }

  pagingStaff = async () => {
    try {
      const res = await pagingStaffs({ ...this.searchStaff });
      this.pageStaff = res?.data;
    } catch (error) {
      toast.warning("toast.load_fail");
    }
  }

  handleChangeFormSearch = (searchObject) => {
    this.searchStaff = SearchObject.checkSearchObject(this.searchStaff, searchObject);
    this.pagingStaff();
  }

  handleOpenForm = async (staffId) => {
    try {
      let newStaff = new Staff();
      if (staffId) {
        newStaff = (await getStaff(staffId)).data;
        if (newStaff?.user?.password) {
          newStaff.user.password = null;
        }
      }
      this.selectedStaff = newStaff;
      this.openForm = true;
    } catch (error) {
      toast.warning("toast.get_fail");
    }
  }

  handleSaveStaff = async (staff, { setSubmitting }) => {
    try {
      let api = saveStaff
      if (staff?.createUser) {
        api = saveUserAndStaff
        staff.user.email = staff?.email;
      } else {
        if (staff?.user?.id) {

        } else {
          staff.user = null;
        }
      }

      const res = await api(staff);
      if (res) {
        toast.success(staff?.id ? "Cập nhật thành công!" : "Thêm mới thành công!");

        if (staff?.id) {
          this.handleClosePopup();
        }
        this.pagingStaff()
        this.checkAllStaff = false;
      }
    } catch {
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
    } finally {
      setSubmitting(false)
    }
  }

  handleOpenConfirmDelete = (staffId) => {
    this.selectedStaff = { id: staffId };
    this.openConfirmDelete = true;
  }

  handleConfirmDelete = async () => {
    try {
      const res = await deleteStaff(this.selectedStaff.id);
      if (res?.data) {
        toast.success("Đã xoá bản ghi");
        this.pagingStaff();
        this.checkAllStaff = false;
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
  };

  resetStore = () => {
    this.pageStaff = null;
    this.searchStaff = new SearchObject();
    this.selectedStaff = {...initStaff};
  }
}
