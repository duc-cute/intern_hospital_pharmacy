import { PageResponse } from "app/common/Model/Shared";
import { confirmStatusStoreRequest, getStoreRequestById, pagingStoreRequest, stockOutFromEMR } from "./StoreRequestService";
import { SearchObject } from "app/common/Model/SearchObject";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";
import { StatusStoreRequest } from "app/common/Constant/LocalConstant";
import { StoreRequest } from "app/common/Model/StoreRequest";

class StoreRequestStore {
    searchStoreRequest = new SearchObject();
    pageStoreRequest = new PageResponse();

    openForm = false;
    selectedStoreRequest = null;

    constructor() {
        makeAutoObservable(this);
    }

    pagingStoreRequest = async () => {
        try {
            const res = await pagingStoreRequest(this.searchStoreRequest);
            this.pageStoreRequest = res?.data;
        } catch (error) {
            console.error(error);
        }
    }

    handleChangeForm = (searchStoreRequest) => {
        this.searchStoreRequest = SearchObject.checkSearchObject(this.searchStoreRequest, searchStoreRequest);
        this.pagingStoreRequest();
    }

    handleOpenForm = async (storeRequest) => {
        try {
            const response = await getStoreRequestById(storeRequest?.id);
            this.selectedStoreRequest = response.data;
            this.openForm = true;
        } catch (err) {
            toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
        }
    }

    confirmStatusStoreRequest = async (status) => {
        try {
            if (status === StatusStoreRequest.BROWSER) {
                const res = await stockOutFromEMR({ ...new StoreRequest(this.selectedStoreRequest) });
                if (Array.isArray(res?.data) && res?.data?.length > 0) {
                    toast.warning(res?.data?.[0]);
                    return;
                }
            }
            const response = await confirmStatusStoreRequest(this.selectedStoreRequest?.id, status);
            if (response?.data) {
                if (status === StatusStoreRequest.BROWSER) {
                    toast.success("Duyệt thành công!");
                } else {
                    toast.success("Từ chối thành công!");
                }
            }
            this.pagingStoreRequest();
            this.handleClosePopup();
        } catch (err) {
            toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
        }
    }

    handleClosePopup = () => {
        this.openForm = false;
    }

    resetStore = () => {
        this.searchStoreRequest = new SearchObject();
        this.pageStoreRequest = new PageResponse();;
        this.openForm = null;
        this.selectedStoreRequest = null;
    }
}

export default StoreRequestStore;