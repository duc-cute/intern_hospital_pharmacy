import { makeAutoObservable } from "mobx";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { deleteCustomer, getCustomerById, pagingCustomer, saveCustomer } from "./CustomerService"
import { Customer } from "app/common/Model/Customer";

class CustomerStore {
    customerList = [];
    selectedCustomer = null;
    openForm = false;
    openFormConfirm = false;
    totalElements = 0;
    totalPages = 0;
    page = 1;
    rowsPerPage = 10;
    keyword = "";
    loadingInitial = false;

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

    search = async () => {
        this.loadingInitial = true;
        var searchObject = {
            keyword: this.keyword,
            pageIndex: this.page,
            pageSize: this.rowsPerPage,
        };

        try {
            let data = await pagingCustomer(searchObject);
            this.customerList = data.data.content;
            this.totalElements = data.data.totalElements;
            this.totalPages = data.data.totalPages;
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            toast.warning("toast.load_fail");
            this.setLoadingInitial(false);
        }
    };

    handleOpenForm = async (customerId) => {
        try {
            let newCustomer = new Customer();
            if (customerId) {
                newCustomer = (await getCustomerById(customerId)).data;
            }
            this.selectedCustomer = newCustomer;
            this.openForm = true;
        } catch (error) {
            toast.warning("toast.get_fail");
        }
    }

    handleOpenFormConfirm = (id) => {
        getCustomerById(id).then(({ data }) => {
            this.openFormConfirm = true;
            this.selectedCustomer = data;
        });
    }

    handleClosePopup = () => {
        this.openForm = false;
        this.openFormConfirm = false;
        this.updatePageData();
    }

    handleConfirmDelete = async () => {
        try {
            await deleteCustomer(this.selectedCustomer.id);
            toast.success("Xóa thành công khách hàng!");
            this.handleClosePopup();
        } catch (error) {
            console.log(error);
            toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
        }
    };

    createCustomer = async (delPlace) => {
        try {
            const res = await saveCustomer(delPlace);
            toast.success("Thêm mới thành công!");
            this.handleClosePopup();
            return res?.data
        } catch (error) {
            console.log(error);
            toast.warning("Có lỗi xảy ra khi thêm mới!");
        }
    };

    editCustomer = async (delPlaces) => {
        try {
            const res = await saveCustomer(delPlaces);
            toast.success("Cập nhật thành công!");
            this.handleClosePopup();
            return res?.data
        } catch (error) {
            console.log(error);
            toast.warning("Có lỗi xảy ra khi cập nhật!");
        }
    };

    resetCustomerStore = () => {
        this.customerList = [];
        this.selectedCustomer = null;
        this.totalElements = 0;
        this.totalPages = 0;
        this.page = 1;
        this.rowsPerPage = 10;
        this.keyword = "";
        this.loadingInitial = false;
        this.openForm = false;
        this.openFormConfirm = false;
    }
}

export default CustomerStore;