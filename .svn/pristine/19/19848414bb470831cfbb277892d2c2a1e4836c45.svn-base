/* eslint-disable react-hooks/exhaustive-deps */
import { observer } from "mobx-react";
import React, { memo } from "react";
import { Grid } from "@material-ui/core";
import GlobitsSearchInput from "app/common/GlobitsSearchInput";
import { useStore } from "app/stores";
import { useEffect } from "react";
import GlobitsTable from "app/common/GlobitsTable";
import { IconButton } from "@material-ui/core";
import IconEye from "app/common/Icon/IconEye";
import StoreRequestForm from "./StoreRequestForm";
import { StoreRequest } from "app/common/Model/StoreRequest";
import { getDate } from "app/common/Constant/LocalFunction";

function StoreRequestIndex() {
    const {
        pageStoreRequest,
        searchStoreRequest,
        pagingStoreRequest,
        handleOpenForm,
        handleChangeForm,
        resetStore
    } = useStore().storeRequestStore;

    let columns = [
        { title: "Mã", field: "code" },
        { title: "Ngày yêu cầu", field: "dateIssue", render: (value) => getDate(value?.dateIssue) },
        { title: "Phòng ban", field: "department.name" },
        { title: "Trạng thái", field: "status", render: value => StoreRequest.getStatus(value?.status) },
        {
            title: "Thao tác",
            align: 'center',
            render: (rowData) => (
                <IconButton size="small" onClick={() => handleOpenForm(rowData)}>
                    <IconEye />
                </IconButton>
            ),
        },
    ];

    useEffect(() => {
        pagingStoreRequest();

        return () => resetStore();
    }, []);

    return (
        <section className="cards-container">
            <h4 className="cards-header">Yêu cầu xuất kho</h4>
            <div className="cards-body">
                <Grid className="mb-10" container spacing={2}>
                    <Grid item md={6} xs={2} />
                    <Grid item md={6} xs={12}>
                        <GlobitsSearchInput search={handleChangeForm} />
                    </Grid>
                </Grid>
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
                <StoreRequestForm />
            </div>
        </section>
    );
};

export default memo(observer(StoreRequestIndex));