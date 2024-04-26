import { PageResponse } from "app/common/Model/Shared";
import { confirmStatusStoreRequest, createStoreRequest, deleteStoreRequest, getStoreRequestById, pagingStoreRequest, stockOutFromEMR, updateStoreRequest } from "./StoreRequestService";
import { SearchObject } from "app/common/Model/SearchObject";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";
import { StatusStoreRequest } from "app/common/Constant/LocalConstant";
import { StoreRequest } from "app/common/Model/StoreRequest";

const defaultStoreRequest = {
    code: null,
    dateIssue: new Date(),
    fromDateEstimate: new Date(),
    toDateEstimate: new Date(),
    depCode: null,
    depName: null,
    items: [],
    status: StatusStoreRequest.WAIT
}

class StoreRequestStore {
    searchStoreRequest = new SearchObject();
    pageStoreRequest = new PageResponse();

    openForm = false;
    selectedStoreRequest = null;

    openEditor = false;
    openConfirmDelete = false;

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

    handleCloseEditor = () => {
        this.openEditor = false;
        this.selectedStoreRequest = null;
    }

    handleEditStoreRequest = async (rowData) => {
        try {
            if (rowData?.id) {
                const res = await getStoreRequestById(rowData?.id);
                let dto = {...rowData};
                if (res?.data?.items?.length > 0) {
                    dto = {
                        ...res?.data,
                        dep: {
                            name: res?.data?.depName,
                            code: res?.data?.depCode
                        },
                        items: res?.data?.items?.map((item) => {
                            return {
                                ...item,
                                product: {
                                    code: item?.productCode,
                                    name: item?.productName,
                                },
                                stockKeepingUnit: {
                                    sku: {
                                        code: item?.stockUnitCode
                                    }
                                }
                            }
                        })
                    }
                }
                this.selectedStoreRequest = dto
            } else {
                this.selectedStoreRequest = {...defaultStoreRequest}
            }
            this.openEditor = true;
        } catch (err) {
            console.error(err);
            toast.error("Có lỗi xảy ra, vui lòng thử lại")
        }
    }

    handleSaveOrUpdateStoreRequest = async (values, formHelper) => {
        const dto = {
            ...values,
            depCode: values?.dep?.code,
            depName: values?.dep?.name,
            dep: undefined,
            items: values?.items?.map((item) => {
                return {
                    ...item,
                    productCode: item?.product?.code,
                    productName: item?.product?.name,
                    stockUnitCode: item?.stockKeepingUnit?.sku?.code,
                    stockKeepingUnit: undefined,
                    product: undefined,
                }
            })
        }
        if (dto?.id) {
            return updateStoreRequest(dto, dto.id).then((res) => {
                toast.success("Lưu phiếu xuất kho thành công")
                this.handleCloseEditor()
                this.pagingStoreRequest()
            }).catch((err) => {
                console.error(err);
                toast.error("Có lỗi xảy ra, vui lòng thử lại")
            }).finally(() => {
                formHelper.setSubmitting(false)
            })
        } else {
            return createStoreRequest(dto).then((res) => {
                toast.success("Lưu phiếu xuất kho thành công")
                this.handleCloseEditor()
                this.pagingStoreRequest()
            }).catch((err) => {
                console.error(err);
                toast.error("Có lỗi xảy ra, vui lòng thử lại")
            }).finally(() => {
                formHelper.setSubmitting(false)
            })
        }
    }

    handleCloseDelete = () => this.openConfirmDelete = false

    handleDelete = (rowData) => {
        if (rowData?.id) {
            this.selectedStoreRequest = rowData;
            this.openConfirmDelete = true;
        }
    }

    handleConfirmDelete = async () => {
        try {
            const res = await deleteStoreRequest(this.selectedStoreRequest?.id);
            if (res?.data) {
                toast.success("Đã xoá thành công");
                this.handleCloseDelete();
                this.pagingStoreRequest();
                return;
            }
            toast.error("Có lỗi xảy ra, vui lòng thử lại")
        } catch (err) {
            console.error(err);
            toast.error("Có lỗi xảy ra, vui lòng thử lại")
        }
    }

    resetStore = () => {
        this.searchStoreRequest = new SearchObject();
        this.pageStoreRequest = new PageResponse();;
        this.openForm = null;
        this.selectedStoreRequest = null;
    }
}

export default StoreRequestStore;