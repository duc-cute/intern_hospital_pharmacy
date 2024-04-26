import {makeAutoObservable, runInAction} from "mobx";
import {
    createCategory,
    deleteCategory,
    editCategory,
    getCategory,
    getListTreeCategory,
    pagingCategories,
} from "./CategoryService";
import "react-toastify/dist/ReactToastify.css";
import {toast} from "react-toastify";
import {SearchObject} from "../../common/Model/SearchObject";

export default class CategoryStore {
    searchObject = {
        keyword: "",
        pageIndex: 1,
        pageSize: 10,
        categoryTypeId: null
    };
    categoryList = [];
    selectedCategory = null;
    selectedCategoryList = [];
    totalElements = 0;
    totalPages = 0;
    page = 1;
    rowsPerPage = 10;
    keyword = "";
    loadingInitial = false;
    shouldOpenEditorDialog = false;
    shouldOpenConfirmationDialog = false;
    shouldOpenConfirmationDeleteListDialog = false;
    listTreeCategory = [];

    constructor() {
        makeAutoObservable(this);
    }

    setLoadingInitial = (state) => {
        this.loadingInitial = state;
    };

    updatePageData = (item) => {
        if (item != null) {
            this.searchObject.pageIndex = 1;
            this.searchObject = SearchObject.checkSearchObject(this.searchObject, item);
            this.search();
        } else {
            this.search();
        }
    };

    getListTreeCategorys = async (categoryTypeId) => {
        try {
            this.listTreeCategory = [];
            let {data} = await getListTreeCategory({categoryTypeId: categoryTypeId || null});
            this.listTreeCategory = data;
            return this.listTreeCategory
        } catch (error) {
            console.log(error);
        }
    }

    search = async () => {
        this.loadingInitial = true;
        let searchObject = {...this.searchObject, categoryTypeId: this.searchObject?.categoryTypeId?.id};
        try {
            let res = await pagingCategories(searchObject);
            runInAction(() => {
                this.categoryList = res?.data?.content || [];
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

    setPage = (page) => {
        this.page = page;
        this.searchObject.pageIndex = page;
        this.updatePageData();
    };

    setRowsPerPage = (event) => {
        this.searchObject.pageSize = event.target.value;
        this.searchObject.pageIndex = 1;
        this.updatePageData();
    };

    handleChangePage = (event, newPage) => {
        this.setPage(newPage);
    };

    handleEditCategory = (id) => {
        this.getCategory(id).then(() => {
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
        this.getCategory(id).then(() => {
            this.shouldOpenConfirmationDialog = true;
        });
    };

    handleDeleteList = () => {
        this.shouldOpenConfirmationDeleteListDialog = true;
    };

    handleConfirmDelete = async () => {
        // this.deleteCategory(this.selectedCategory.id);
        try {
            const res = await deleteCategory(this.selectedCategory.id);
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
        for (var i = 0; i < this.selectedCategoryList.length; i++) {
            try {
                await deleteCategory(this.selectedCategoryList[i].id);
            } catch (error) {
                listAlert.push(this.selectedCategoryList[i].name);
                console.log(error);
                console.log(listAlert.toString());
                toast.warning("toast.delete_fail");
            }
        }
        this.handleClose(true);
        toast.success("Đã xóa thành công!");
    };

    getCategory = async (id) => {
        if (id != null) {
            try {
                let data = await getCategory(id);
                this.handleSelectCategory(data.data);
            } catch (error) {
                console.log(error);
                toast.warning("toast.get_fail");
            }
        } else {
            this.handleSelectCategory(null);
        }
    };

    handleSelectCategory = (category) => {
        this.selectedCategory = category;
    };

    handleSelectListCategory = (categorys) => {
        this.selectedCategoryList = categorys;
        console.log(this.selectedCategoryList);
    };

    createCategory = async (category) => {
        try {
            // let responseCheckCode = await checkCode(category);
            // if (responseCheckCode.data) {
            //   toast.warning("Mã đã được sử dụng!");
            // } else {
            const res = await createCategory(category);
            toast.success("Thêm mới thành công!");
            this.handleClose(true);
            return res?.data
            // }
        } catch (error) {
            console.log(error);
            toast.warning("Có lỗi xảy ra khi thêm mới!");
        }
    };

    editCategory = async (category) => {
        try {
            // let responseCheckCode = await checkCode(category);
            // if (responseCheckCode.data) {
            //   toast.warning("Mã đã được sử dụng!");
            // } else {
            const res = await editCategory(category);
            toast.success("Cập nhật thành công!");
            this.handleClose(true);
            return res?.data
            // }
        } catch (error) {
            console.log(error);
            toast.warning("Có lỗi xảy ra khi cập nhật!");
        }
    };

    resetCategoryStore = () => {
        this.categoryList = [];
        this.selectedCategory = null;
        this.selectedCategoryList = [];
        this.totalElements = 0;
        this.totalPages = 0;
        this.page = 1;
        this.rowsPerPage = 10;
        this.keyword = "";
        this.loadingInitial = false;
        this.shouldOpenEditorDialog = false;
        this.shouldOpenConfirmationDialog = false;
        this.shouldOpenConfirmationDeleteListDialog = false;
        this.listTreeCategory = [];
    }
}
