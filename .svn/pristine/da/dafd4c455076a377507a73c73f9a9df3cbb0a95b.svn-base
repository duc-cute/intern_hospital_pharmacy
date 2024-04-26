import { makeAutoObservable, runInAction } from "mobx";
import {
    pagingPackagingForms, getPackagingForm, createPackagingForm,
    editPackagingForm, deletePackagingForm, voidedPackagingForm
} from "./PackagingFormService"
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export default class PackagingFormStore {
    constructor() {
        makeAutoObservable(this);
    }
    packagingFormList = [];
    selectedPackagingForm = null;
    selectedPackagingFormList = [];
    totalElements = 0;
    totalPages = 0;
    page = 1;
    rowsPerPage = 10;
    keyword = "";
    loadingIntitial = false;
    shouldOpenEditorDialog = false;
    shouldOpenConfirmationDialog = false;
    shouldOpenConfirmationDeleteListDialog = false;

    setLoadingInitial = (state) => {
        this.loadingIntitial = state;
    }
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
        this.loadingIntitial = true;
        var searchObject = {
            keyword: this.keyword,
            pageIndex: this.page,
            pageSize: this.rowsPerPage,
        };
        try {
            let res = await pagingPackagingForms(searchObject);
            runInAction(() => {
                this.packagingFormList = res?.data?.content || [];
                this.totalElements = res?.data?.totalElements;
                this.totalPages = res?.data?.totalPages;
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            toast.warning("toast.load_fail");
            this.setLoadingInitial(false);
        }
    }
    setPage = (page) => {
        this.page = page;
        this.updatePageData();
    }
    setRowsPerPage = (event) => {
        this.rowsPerPage = event.target.value;
        this.page = 1;
        this.updatePageData();
    };
    handleChangePage = (event, newPage) => {
        this.setPage(newPage);
    };
    handleEditPackagingForm = (id) => {
        this.getPackagingForm(id).then(() => {
            this.shouldOpenEditorDialog = true;
        })
    };
    handleClose = (updateListOnClose) => {
        this.shouldOpenEditorDialog = false;
        this.shouldOpenConfirmationDialog = false;
        this.shouldOpenConfirmationDeleteListDialog = false;
        if (updateListOnClose) {
            this.updatePageData();
        }
    };
    handleDelete = (id) => {
        this.getPackagingForm(id).then(() => {
          this.shouldOpenConfirmationDialog = true;
        });
      };
    handleDeleteList = () => {
        this.shouldOpenConfirmationDeleteListDialog = true;
    }
    handleConfirmDelete = async () => {
        try {
            const res = await deletePackagingForm(this.selectedPackagingForm.id);
            if (res?.data) {
                toast.success("Đã xóa bản ghi");
            } else {
                toast.warning("Không thể xoá vì có dữ liệu ràng buộc");
            }
            this.handleClose();
        } catch (error) {
            console.log(error);
            toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
        }
        this.updatePageData();
    };
    handleConfirmDeleteList = async () => {
        let listAlert = [];
        for (var i = 0; i < this.selectedPackagingFormList.length; i++) {
            try {
                await deletePackagingForm(this.selectedPackagingFormList[i].id);
            } catch (error) {
                listAlert.push(this.selectedPackagingFormList[i].name);
                console.log(error);
                console.log(listAlert.toString());
                toast.warning("toast.delete_fail");
            }
        }
        this.handleClose();
        toast.success("Đã xóa thành công!");
    };
    getPackagingForm = async (id) => {
        if (id != null) {
            try {
                let data = await getPackagingForm(id);
                this.handleSelectPackagingForm(data.data);
            } catch (error) {
                console.log(error);
                toast.warning("toast.get_fail");
            }
        } else {
            this.handleSelectPackagingForm(null);
        }
    };
    handleSelectPackagingForm = (packagingForm) => {
        this.selectedPackagingForm = packagingForm;
    };

    handelSelectListPackagingForm = (packagingForms) => {
        this.selectedPackagingFormList = packagingForms;
    };

    createPackagingForm = async (packagingForm) => {
        try {
            const res = await createPackagingForm(packagingForm);
            toast.success("Thêm mới thành công!");
            this.handleClose(true);
            return res?.data
        } catch (error) {
            console.log(error);
            toast.warning("Có lỗi xảy ra khi thêm mới!");
        }
    };
    editPackagingForm = async (packagingForm) => {
        try {
            const res = await editPackagingForm(packagingForm);
            toast.success("Cập nhật thành công!");
            this.handleClose(true);
            return res?.data
        } catch (error) {
            console.log(error);
            toast.warning("Có lỗi xảy ra khi cập nhật!");
        }
    }
    resetPackagingFormStore = () => {
        this.packagingFormList = [];
        this.selectedPackagingForm = null;
        this.selectedPackagingFormList = [];
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