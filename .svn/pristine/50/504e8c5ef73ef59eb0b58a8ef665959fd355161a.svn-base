/* eslint-disable react-hooks/exhaustive-deps */
import { observer } from "mobx-react";
import React, { memo } from "react";
import { Button, Tooltip } from "@material-ui/core";
import { useStore } from "app/stores";
import { useEffect } from "react";
import GlobitsTable from "app/common/GlobitsTable";
import { IconButton } from "@material-ui/core";
// import StoreRequestForm from "./StoreRequestForm";
import { StoreRequest } from "app/common/Model/StoreRequest";
import { getDateTime } from "app/common/Constant/LocalFunction";
import { Delete, Edit } from "@material-ui/icons";
import StoreRequestPopup from "./StoreRequestPopup";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useHistory, useParams } from "react-router-dom";
import { ROOT_PATH } from "app/appConfig";
import GlobitsConfirmationDialog from "app/common/GlobitsConfirmationDialog";
import { useTranslation } from "react-i18next";
import StoreRequestSearch from "./StoreRequestSearch";
import { StatusStoreRequest } from "app/common/Constant/LocalConstant";

function StoreRequestIndex({ isPopup, handleChoose }) {
    const {
        pageStoreRequest,
        searchStoreRequest,
        pagingStoreRequest,
        // handleOpenForm,
        handleChangeForm,
        resetStore,
        handleEditStoreRequest,
        openEditor,
        handleCloseEditor,
        selectedStoreRequest,
        handleSaveOrUpdateStoreRequest,
        handleDelete,
        openConfirmDelete,
        handleConfirmDelete,
        handleCloseDelete
    } = useStore()._StoreRequestStore;
    const { t } = useTranslation();

    const history = useHistory();
    const { module } = useParams();

    let columns = [
        { title: "Mã", field: "code" },
        { title: "Ngày yêu cầu", field: "dateIssue", render: (value) => getDateTime(value?.dateIssue) },
        { title: "Kho", field: "depName" },
        { title: "Trạng thái", field: "status", render: value => StoreRequest.getStatus(value?.status) },
        {
            title: "Thao tác",
            cellStyle: {
                width: "10%"
            },
            align: 'center',
            render: (rowData) => (
                !isPopup ?
                <>
                    <Tooltip title="Chỉnh sửa">
                        <IconButton size="small" color="primary" onClick={() => handleEditStoreRequest(rowData)}>
                            <Edit />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Tạo phiếu xuất kho từ yêu cầu xuất kho">
                        <IconButton 
                            size="small" 
                            color="secondary"
                            onClick={() => {
                                const to = ROOT_PATH + module + "/stock-out/form?storeRequestId=" + rowData?.id
                                history.push(to)
                            }} 
                        >
                            <CheckCircleIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Xoá">
                        <IconButton size="small" onClick={() => handleDelete(rowData)}>
                            <Delete color="error" />
                        </IconButton>
                    </Tooltip>
                </>
                :
                <Tooltip title="Chọn yêu cầu xuất kho">
                    <Button
                        className="btn btn-danger d-inline-flex"
                        type="button"
                        onClick={() => handleChoose(rowData)}
                    >
                        Chọn
                    </Button>
                </Tooltip>
            ),
        },
    ];

    useEffect(() => {
        if (isPopup) {
            handleChangeForm({
                ...searchStoreRequest,
                status: StatusStoreRequest.BROWSER
            })
        } else {
            pagingStoreRequest();
        }

        return () => resetStore();
    }, [isPopup]);

    return (
        <section className="cards-container">
            {!isPopup &&
                <h4 className="cards-header">Yêu cầu xuất kho</h4>
            }
            <div className="cards-body">
                <StoreRequestSearch isPopup={isPopup} />
                <GlobitsTable
                    data={pageStoreRequest?.content}
                    columns={columns}
                    totalPages={pageStoreRequest?.totalPages}
                    handleChangePage={(_, pageIndex) => handleChangeForm({ pageIndex })}
                    setRowsPerPage={(event) => handleChangeForm({ pageSize: event?.target.value })}
                    pageSize={searchStoreRequest?.pageSize}
                    pageSizeOption={[1, 2, 3, 5, 10, 25]}
                    totalElements={pageStoreRequest?.totalElements}
                    page={searchStoreRequest?.pageIndex}
                    doubleSidePagination={false}
                />
                {/* <StoreRequestForm /> */}

                {openConfirmDelete &&
                    <GlobitsConfirmationDialog
                        open={openConfirmDelete}
                        onConfirmDialogClose={handleCloseDelete}
                        onYesClick={handleConfirmDelete}
                        title={t("confirm_dialog.delete.title")}
                        text={t("confirm_dialog.delete.text")}
                        agree={t("confirm_dialog.delete.agree")}
                        cancel={t("confirm_dialog.delete.cancel")}
                    />
                }

                {openEditor && 
                    <StoreRequestPopup 
                        open={openEditor}
                        handleClose={handleCloseEditor}
                        formData={selectedStoreRequest}
                        handleSubmit={handleSaveOrUpdateStoreRequest}
                    />
                }
            </div>
        </section>
    );
};

export default memo(observer(StoreRequestIndex));