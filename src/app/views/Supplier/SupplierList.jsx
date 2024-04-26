import React from "react";
import GlobitsTable from "../../common/GlobitsTable";
import {useStore} from "../../stores";
import {useTranslation} from "react-i18next";
import {Icon, IconButton} from "@material-ui/core";
import {observer} from "mobx-react";
import {LISTSUPPLIERTYPE} from "../../LocalConstants";

function MaterialButton(props) {
    const {item} = props;
    return (
        <div>
            <IconButton size="small" onClick={() => props.onSelect(item, 0)}>
                <Icon fontSize="small" color="primary">
                    edit
                </Icon>
            </IconButton>
            <IconButton size="small" onClick={() => props.onSelect(item, 1)}>
                <Icon fontSize="small" color="error">
                    delete
                </Icon>
            </IconButton>
        </div>
    );
}

export default observer(function SupplierList() {
    const {supplierStore} = useStore();
    const {t} = useTranslation();

    const {
        supplierList,
        totalPages,
        totalElements,
        rowsPerPage,
        page,
        handleChangePage,
        setRowsPerPage,
        handleDelete,
        handleEditSupplier,
        handleSelectListSupplier,
    } = supplierStore;

    let columns = [

        // { title: t("supplier.code"), field: "code", width: "150" },
        {title: t("supplier.name"), field: "name", width: "150"},
        {title: t("supplier.address"), field: "address", width: "150"},
        // { title: t("supplier.type"), field: "type", width: "150" },
        {title: t("supplier.email"), field: "email", width: "150"},
        {title: t("supplier.representative"), field: "representative", width: "150"},
        {
            title: t("supplier.type"), field: "type", width: "150",
            render: val => LISTSUPPLIERTYPE.find(item => item.value === val?.type)?.name
        },
        {title: t("supplier.country"), field: "country.name", width: "150"},
        {
            title: t("general.action"),
            render: (rowData) => (
                <MaterialButton
                    item={rowData}
                    onSelect={(rowData, method) => {
                        if (method === 0) {
                            handleEditSupplier(rowData.id);
                        } else if (method === 1) {
                            handleDelete(rowData.id);
                        } else {
                            alert("Call Selected Here:" + rowData.id);
                        }
                    }}
                />
            ),
        },
    ];
    return (
        <GlobitsTable
            selection
            data={supplierList}
            handleSelectList={handleSelectListSupplier}
            columns={columns}
            totalPages={totalPages}
            handleChangePage={handleChangePage}
            setRowsPerPage={setRowsPerPage}
            pageSize={rowsPerPage}
            pageSizeOption={[1, 2, 3, 5, 10, 25]}
            totalElements={totalElements}
            page={page}
        />
    );
});
