import {makeAutoObservable} from "mobx";
import {createProduct, deleteProduct, editProduct, getProduct, pagingProducts,} from "./ProductService";
import {toast} from "react-toastify";
import {SearchObject} from "app/common/Model/SearchObject";

const defaultSeachObject = {
    keyword: "",
    page: 1,
    listCategory: []
}

export default class ProductStore {
    productList = [];
    selectedProduct = null;
    selectedProductList = [];
    selectedTypeCategory = [];
    totalElements = 0;
    totalPages = 0;
    page = 1;
    rowsPerPage = 10;
    keyword = "";
    loadingInitial = false;
    shouldOpenEditorDialog = false;
    shouldOpenConfirmationDialog = false;
    shouldOpenConfirmationDeleteListDialog = false;
    shouldOpenCategoryDialog = false;
    shouldOpenTypeCategory = false;
    searchObject = {
        ...defaultSeachObject,
    }

    pageProduct = null;
    searchProduct = new SearchObject({pageSize: 15});

    constructor() {
        makeAutoObservable(this);
    }

    pagingProducts = async () => {
        try {
            let res = await pagingProducts(this.searchProduct);
            this.pageProduct = res.data;

            return res.data;
        } catch (error) {
            toast.warning("toast.load_fail");
        }
    }

    handleChangeFormSearch = (obj) => {
        this.searchProduct = SearchObject.checkSearchObject(this.searchProduct, obj);
        return this.pagingProducts();
    }


    setLoadingInitial = (state) => {
        this.loadingInitial = state;
    };

    updatePageData = (item) => {
        if (item != null) {
            this.page = 1;
            this.keyword = item.keyword;
            this.searchObject = SearchObject.checkSearchObject(this.searchObject, item);
            this.search();
        } else {
            this.search();
        }
    };

    search = async () => {
        this.loadingInitial = true;
        var searchObject = {
            ...this.searchObject,
            // keyword: this.keyword,
            pageIndex: this.page,
            pageSize: this.rowsPerPage,
        };
        try {
            let data = await pagingProducts(searchObject);
            this.productList = data.data.content;
            this.totalElements = data.data.totalElements;
            this.totalPages = data.data.totalPages;
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            toast.warning("toast.load_fail");
            this.setLoadingInitial(false);
        }
    };

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

    handleSetSearchObject = obj => {
        this.searchObject = {...obj}
        this.page = 1
    }

    handleResetSearchObject = () => this.searchObject = {...defaultSeachObject}

    handleEditProduct = (id) => {
        this.getProduct(id).then(() => {
            this.shouldOpenEditorDialog = true;
        });
    };


    handleOpenTypeCategory = (id) => {
        this.shouldOpenTypeCategory = true;
    };

    handleCloseTypeCategory = (id) => {
        this.shouldOpenTypeCategory = false;
    };

    handleClose = () => {
        this.shouldOpenEditorDialog = false;
        this.shouldOpenConfirmationDialog = false;
        this.shouldOpenConfirmationDeleteListDialog = false;
        this.updatePageData();
    };

    handleDelete = (id) => {
        this.getProduct(id).then(() => {
            this.shouldOpenConfirmationDialog = true;
        });
    };

    handleDeleteList = () => {
        this.shouldOpenConfirmationDeleteListDialog = true;
    };

    handleConfirmDelete = async () => {
        // this.deleteProduct(this.selectedProduct.id);
        try {
            const res = await deleteProduct(this.selectedProduct.id);
            if (res?.data) {
                toast.success("Đã xoá bản ghi");
            } else {
                toast.warning("Không thể xoá vì có dữ liệu ràng buộc");
            }
            this.handleClose();
        } catch (error) {
            console.log(error);
            toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
        }
    };

    handleConfirmDeleteList = async () => {
        let listAlert = [];
        for (var i = 0; i < this.selectedProductList.length; i++) {
            try {
                await deleteProduct(this.selectedProductList[i].id);
            } catch (error) {
                listAlert.push(this.selectedProductList[i].name);
                console.log(error);
                console.log(listAlert.toString());
                toast.warning("toast.delete_fail");
            }
        }
        this.handleClose();
        toast.success("Đã xóa thành công!");
    };

    getProduct = async (id) => {
        if (id != null) {
            try {
                let data = await getProduct(id);
                this.handleSelectProduct(data.data);
            } catch (error) {
                console.log(error);
                toast.warning("toast.get_fail");
            }
        } else {
            this.handleSelectProduct(null);
        }
    };

    handleSelectProduct = (product) => {
        this.selectedProduct = product;
    };

    handleSelectListProduct = (products) => {
        this.selectedProductList = products;
        // console.log(this.selectedProductList);
    };

    createProduct = async (product) => {
        try {
            // let responseCheckCode = await checkCode(product);
            // if (responseCheckCode.data) {
            //   toast.warning("Mã đã được sử dụng!");
            // } else {
            const res = await createProduct(product);
            //sau khi tạo server chưa trả về luôn
            this.handleSelectProduct({
                ...res.data,
                productActiveIngredientList: product?.productActiveIngredientList
            });
            toast.success("Thêm mới thành công!");
            this.handleClose();
            return res;
            // }
        } catch (error) {
            console.log(error);
            toast.warning("Có lỗi xảy ra khi thêm mới!");
        }
    };

    editProduct = async (product) => {
        try {
            // let responseCheckCode = await checkCode(product);
            // if (responseCheckCode.data) {
            //   toast.warning("Mã đã được sử dụng!");
            // } else {
            const res = await editProduct(product);
            toast.success("Cập nhật thành công!");
            this.handleClose();
            return res;
            // }
        } catch (error) {
            console.log(error);
            toast.warning("Có lỗi xảy ra khi cập nhật!");
        }
    };

    handleOpenCategory = () => {
        this.shouldOpenCategoryDialog = true;
    }

    handleCloseCategory = () => {
        this.shouldOpenCategoryDialog = false;
    }

    handleCopyProduct = (formData) => {
        if (formData) {
            this.handleSelectProduct({
                ...formData,
                id: "",
                name: "",
                code: "",
                attributes: formData?.attributes?.map((att) => ({...att, id: null, product: null})),
                images: formData?.images?.map((img) => ({...img, id: null, product: null})),
                skus: formData?.skus?.map((sku) => ({...sku, id: null, product: null, productId: null}))
            });
        } else {
            this.handleSelectProduct(null)
        }
        this.handleClose();
    }

    resetProductStore = () => {
        this.productList = [];
        this.selectedProduct = null;
        this.selectedProductList = [];
        this.totalElements = 0;
        this.totalPages = 0;
        this.page = 1;
        this.rowsPerPage = 10;
        this.keyword = "";
        this.loadingInitial = false;
        this.shouldOpenEditorDialog = false;
        this.shouldOpenConfirmationDialog = false;
        this.shouldOpenConfirmationDeleteListDialog = false;
        this.shouldOpenCategoryDialog = false;
        this.pageProduct = null;
        this.searchProduct = new SearchObject({pageSize: 15});
    }
}
