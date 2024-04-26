import {makeAutoObservable, runInAction} from "mobx";
import {
    createOrUpdateCategoryType,
    deleteCategoryType,
    getCategoryType,
    pagingCategoryType,
} from "./CategoryTypeService";
import "react-toastify/dist/ReactToastify.css";
import {toast} from "react-toastify";

export default class CategoryTypeStore {
    categoryTypeList = [];
    selectedCategoryType = null;
    selectedCategoryTypeList = [];
    totalElements = 0;
    totalPages = 0;
    page = 1;
    rowsPerPage = 10;
    keyword = "";
    loadingInitial = false;
    shouldOpenEditorDialog = false;
    shouldOpenConfirmationDialog = false;
    shouldOpenConfirmationDeleteListDialog = false;

    constructor() {
        makeAutoObservable(this);
    }

    setLoadingInitial = (state) => {
        this.loadingInitial = state;
    };

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
        this.loadingInitial = true;
        var searchObject = {
            keyword: this.keyword,
            pageIndex: this.page,
            pageSize: this.rowsPerPage,
        };

        try {
            let res = await pagingCategoryType(searchObject);
            runInAction(() => {
                this.categoryTypeList = res?.data?.content || [];
                this.totalElements = res?.data?.totalElements;
                this.totalPages = res?.data?.totalPages;
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.error(error);
            toast.warning("toast.load_fail");
            this.setLoadingInitial(false);
        }
    };

    getAllCategoryType = async () => {
        this.loadingInitial = true;
        var searchObject = {
            keyword: this.keyword,
            pageIndex: this.page,
            pageSize: 10000,
        };

        try {
            let res = await pagingCategoryType(searchObject);
            runInAction(() => {
                this.categoryTypeList = res?.data?.content || [];
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.error(error);
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

    handleEditCategoryType = (id) => {
        this.getCategoryType(id).then(() => {
            this.shouldOpenEditorDialog = true;
        });
    };

    handleClose = (updateListOnClose) => {
        this.shouldOpenEditorDialog = false;
        this.shouldOpenConfirmationDialog = false;
        this.shouldOpenConfirmationDeleteListDialog = false;
        if (updateListOnClose) this.updatePageData();
    };

    handleDelete = (id) => {
        this.getCategoryType(id).then(() => {
            this.shouldOpenConfirmationDialog = true;
        });
    };

    handleDeleteList = () => {
        this.shouldOpenConfirmationDeleteListDialog = true;
    };

    handleConfirmDelete = async () => {
        // this.deleteCategoryType(this.selectedCategoryType.id);
        try {
            const res = await deleteCategoryType(this.selectedCategoryType.id);
            if (res?.data) {
                toast.success("Đã xoá bản ghi");
            } else {
                toast.warning("Không thể xoá vì có dữ liệu ràng buộc");
            }
            this.handleClose(true);
        } catch (error) {
            console.log(error);
            toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
        }
    };

    handleConfirmDeleteList = async () => {
        let listAlert = [];
        for (var i = 0; i < this.selectedCategoryTypeList.length; i++) {
            try {
                await deleteCategoryType(this.selectedCategoryTypeList[i].id);
            } catch (error) {
                listAlert.push(this.selectedCategoryTypeList[i].name);
                console.log(error);
                console.log(listAlert.toString());
                toast.warning("toast.delete_fail");
            }
        }
        this.handleClose(true);
        toast.success("Đã xóa thành công!");
    };

    getCategoryType = async (id) => {
        if (id != null) {
            try {
                let data = await getCategoryType(id);
                this.handleSelectCategoryType(data.data);
            } catch (error) {
                console.log(error);
                toast.warning("toast.get_fail");
            }
        } else {
            this.handleSelectCategoryType(null);
        }
    };

    handleSelectCategoryType = (categoryType) => {
        this.selectedCategoryType = categoryType;
    };

    handleSelectListCategoryType = (categoryTypes) => {
        this.selectedCategoryTypeList = categoryTypes;
        console.log(this.selectedCategoryTypeList);
    };

    createOrUpdateCategoryType = async (categoryType) => {
        try {
            const res = await createOrUpdateCategoryType(categoryType);
            toast.success((categoryType?.id ? "Thêm mới" : "Chỉnh sửa") + " thành công!");
            this.handleClose(true);
            return res?.data
            // }
        } catch (error) {
            console.log(error);
            toast.warning("Có lỗi xảy ra khi" + (categoryType?.id ? " thêm mới!" : " chỉnh sửa!"));
        }
    };

    // createCategoryType = async (categoryType) => {
    //   try {
    //     // let responseCheckCode = await checkCode(categoryType);
    //     // if (responseCheckCode.data) {
    //     //   toast.warning("Mã đã được sử dụng!");
    //     // } else {
    //     const res = await createCategoryType(categoryType);
    //     toast.success("Thêm mới thành công!");
    //     this.handleClose(true);
    //     return res?.data
    //     // }
    //   } catch (error) {
    //     console.log(error);
    //     toast.warning("Có lỗi xảy ra khi thêm mới!");
    //   }
    // };
    //
    // editCategoryType = async (categoryType) => {
    //   try {
    //     // let responseCheckCode = await checkCode(categoryType);
    //     // if (responseCheckCode.data) {
    //     //   toast.warning("Mã đã được sử dụng!");
    //     // } else {
    //     const res = await editCategoryType(categoryType);
    //     toast.success("Cập nhật thành công!");
    //     this.handleClose(true);
    //     return res?.data
    //     // }
    //   } catch (error) {
    //     console.log(error);
    //     toast.warning("Có lỗi xảy ra khi cập nhật!");
    //   }
    // };

    resetCategoryTypeStore = () => {
        this.categoryTypeList = [];
        this.selectedCategoryType = null;
        this.selectedCategoryTypeList = [];
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
