import { makeAutoObservable } from "mobx";
import {
  getUser,
  getUserByUsername,
  getUserByEmail,
  saveUser,
  deleteById,
  getListUserHealthOrgByUserId,
  pagingUserHealthOrg,
  getListUserAdministrativeUnitByUserId,
  getListStoreByUser,
  resetPasswordUserKeyCloak,
  createUserOrganizationKeyCloak,
  pagingUserStoreOrganization,
  createUserOrganizationKeyCloakSuper,
  getListStoreOrganizationByUser
} from "./UserService";
import "react-toastify/dist/ReactToastify.css";
import i18n from "i18n";
import { toast } from "react-toastify";

const dataDefaultFormUser = {
  id: null,
  email: null,
  username: null,
  roles: [],
  password: null,
  confirmPassword: null,
  person: {
    gender: null,
    displayName: null,
  },
  active: true,
  healthOrganizations: [],
  userAdministrativeUnit: [],
  storeManagement: []
}

export default class UserStore {
  userList = [];
  roles = [];
  selectedUser = null;
  totalElements = 0;
  totalPages = 0;
  page = 1;
  rowsPerPage = 10;
  keyword = "";
  loadingInitial = false;
  shouldOpenEditorDialog = false;
  shouldOpenConfirmationDialog = false;
  storeOrganizationId = "";
  dataEditUser = {...dataDefaultFormUser};
  openFormEditUser = false;
  openConfirmDeleteUser = false;
  openStoreManagement = false;


  constructor() {
    makeAutoObservable(this);
  }

  setLoadingInitial = (state) => {
    this.loadingInitial = state;
  };

  handleOpenFormUser = async (idUser) => {
    if (idUser) {
      try {
        const listStore = await getListStoreByUser(idUser);
        const listStoreOrganization = await getListStoreOrganizationByUser(idUser);
        const user = await getUser(idUser);
        this.dataEditUser = {
          ...user?.data,
          password: null,
          storeManagement: listStore.data || [],
          organizationStoreUser: listStoreOrganization.data || []
        };
      } catch (err) {
        toast.warning(i18n.t("toast.get_fail"));
        return;
      }
    } else {
      this.dataEditUser = {...dataDefaultFormUser};
    }
    this.openFormEditUser = true;
  }

  handleClosePopup = () => {
    this.openFormEditUser = false;
    this.openConfirmDeleteUser = false;
    this.openStoreManagement = false;
  }

  handleDeleteUser = (user) => {
    this.dataEditUser = user;
    this.openConfirmDeleteUser = true;
  }

  handleConfirmDeleteUser = () => {
    deleteById(this.dataEditUser.id).then(() => {
      toast.success("Xóa thành công!");
      this.updatePageData()
    }).catch(() => {
      toast.warning(i18n.t("toast.delete_fail"));
    });
    this.handleClosePopup()
  }

  handleSubmitFormUser = async (user) => {
    try {
      const response = await getUserByUsername(user.username);
      if (response.data && user.id !== response.data.id) {
        toast.warning('Tên đăng nhập đã tồn tại!', 'Thông báo');
        return;
      }
      const responseEmail = await getUserByEmail(user.email);
      if (responseEmail.data && responseEmail.data.id !== user.id) {
        toast.warning('Địa chỉ email đã tồn tại!', 'Thông báo');
        return;
      }
      this.handleSaveUser(user)
    } catch (error) {
      toast.warning("Có lỗi xảy ra khi cập nhật!");
    }
  }

  handleSaveUser = async (user) => {
    if (!user.id || user?.id === "") { 
      let apiCreate = createUserOrganizationKeyCloak;
      if (!!this.storeOrganizationId) {
        apiCreate = createUserOrganizationKeyCloakSuper;
        user.storeOrganizationId = this.storeOrganizationId
      }
      apiCreate(user).then((response) => {
        if (response && response?.data?.isFaled) {
          if (response?.data?.code === "NOTE") {
            toast.error(response.data?.note || "")
          } else {
            toast.error("Có lỗi xảy ra, vui lòng thử lại!")
          }
        }
        else if(response && response?.data?.responeObject){
          this.dataEditUser = { 
            ...response?.data?.responeObject
          }
          this.updatePageData()
        }
      }).catch(() => {
        toast.error('Đã có lỗi xảy ra!')
      });
    }
    else {
      try {
        const doSaveUser = () => {
          saveUser(user).then(({ data }) => {
            toast.success("Cập nhật thành công!");
            this.dataEditUser = { 
              ...data, 
              confirmPassword: data.password ,
              storeManagement: user.id ? user.storeManagement : []
            }
            this.updatePageData()
            if (user.id) {
              this.handleClosePopup();
            }
          })
        }
        if (user?.password) {
          user.changePass = true;
          await resetPasswordUserKeyCloak(user).then(() => doSaveUser())
        } else {
          doSaveUser()
        }
      } catch (err) {
        console.error(err);
        toast.error('Đã có lỗi xảy ra!')
      }
    }
  }

  resetUserStore = () => {
    this.userList = [];
    this.roles = [];
    this.selectedUser = null;
    this.totalElements = 0;
    this.totalPages = 0;
    this.page = 1;
    this.rowsPerPage = 10;
    this.keyword = "";
    this.loadingInitial = false;
    this.shouldOpenEditorDialog = false;
    this.shouldOpenConfirmationDialog = false;
    this.storeOrganizationId = "";
    this.dataEditUser = {...dataDefaultFormUser};
    this.openFormEditUser = false;
    this.openConfirmDeleteUser = false;

  }

  updatePageData = (item) => {
    if (item != null) {
      this.page = 1;
      this.keyword = item.keyword;
      if (item.storeOrganizationId) {
        this.storeOrganizationId = item.storeOrganizationId;
      }
      this.search();
    } else {
      this.search();
    }
  };

  search = async () => {
    this.setLoadingInitial(true);
    let searchObject = {
      keyword: this.keyword,
      pageIndex: this.page,
      pageSize: this.rowsPerPage,
      storeOrganizationId: this.storeOrganizationId,
    };

    try {
      let res = await pagingUserStoreOrganization(searchObject);
      this.userList = res.data.content;
      this.totalElements = res.data.totalElements;
      this.totalPages = res.data.totalPages;
      this.setLoadingInitial(false);
    } catch (error) {
      this.setLoadingInitial(false);
    }
    // }
    // this.setLoadingInitial(false);
  };

  handlePagingUserHealthOrg = async (searchObject) => {
    try {
      let data = await pagingUserHealthOrg(searchObject);
      this.userList = data.data.content;
      this.totalElements = data.data.totalElements;
      this.totalPages = data.data.totalPages;
      this.setLoadingInitial(false);
    } catch (error) {
      this.setLoadingInitial(false);
    }
  }

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

  handleEditUser = (id) => {
    this.getUser(id).then(() => {
      this.shouldOpenEditorDialog = true;
    });
  };

  handleClose = () => {
    this.shouldOpenEditorDialog = false;
    this.shouldOpenConfirmationDialog = false;
    this.updatePageData();
  };

  handleDelete = (id) => {
    this.getUser(id).then(() => {
      this.shouldOpenConfirmationDialog = true;
    });
  };

  handleConfirmDelete = () => {
    this.deleteUser(this.selectedUser.id);
  };

  getUser = async (id) => {
    if (id != null) {
      try {
        let data = await getUser(id);
        this.selectedUser = data.data;
        let healths = await getListUserHealthOrgByUserId(this.selectedUser.id);
        let userAdministrativeUnit = await getListUserAdministrativeUnitByUserId(this.selectedUser.id);
        if (healths.data != null) {
          this.selectedUser.healthOrganizations = healths.data;
        }
        if (userAdministrativeUnit.data != null) {
          this.selectedUser.userAdministrativeUnit = userAdministrativeUnit.data;
        }
      } catch (error) {
        toast.warning(i18n.t("toast.get_fail"));
      }
    } else {
      this.selectedUser = null;
    }
  };

  saveUser = async (user) => {
    // debugger;
    try {
      let data = await getUserByUsername(user.username);
      if (data.data != null && data.data.id != null) {
        if (!user.id || (user.id && data.data.id !== user.id)) {
          toast.warning('Tên đăng nhập đã tồn tại!', 'Thông báo');
        } else {
          let dataEmail = await getUserByEmail(user.email);
          if (dataEmail.data != null && dataEmail.data.id != null) {
            if (!user.id || (user.id && dataEmail.data.id !== user.id)) {
              toast.warning('Địa chỉ email đã tồn tại!', 'Thông báo');
            } else {
              await this.handleSaveUser(user);
            }
          } else {
            await this.handleSaveUser(user);
          }
        }
      } else {
        let dataEmail = await getUserByEmail(user.email);
        if (dataEmail.data != null && dataEmail.data.id != null) {
          if (!user.id || (user.id && dataEmail.data.id !== user.id)) {
            toast.warning('Địa chỉ email đã tồn tại!', 'Thông báo');
          }
        } else {
          await this.handleSaveUser(user);
        }
      }
    } catch (error) {
      toast.warning("Có lỗi xảy ra khi cập nhật!");
    }
  };

  deleteUser = async (id) => {
    try {
      await deleteById(id);
      toast.success("Đã xóa thành công!");
      this.handleClose();
    } catch (error) {
      toast.warning(i18n.t("toast.delete_fail"));
    }
  };

}
