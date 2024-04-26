import React from "react";
import GlobitsTable from "../../common/GlobitsTable";
import {useStore} from "../../stores";
import {useTranslation} from "react-i18next";
import {Icon, IconButton} from "@material-ui/core";
import {observer} from "mobx-react";

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

export default observer(function ActiveIngredientList() {
    const {activeIngredientStore} = useStore();
    const {t} = useTranslation();

    const {
        activeIngredientList,
        totalPages,
        totalElements,
        rowsPerPage,
        page,
        handleChangePage,
        setRowsPerPage,
        handleDelete,
        handleEditActiveIngredient,
        handleSelectListActiveIngredient,
    } = activeIngredientStore;

    let columns = [

        {title: t("activeIngredient.name"), field: "name", width: "150"},
        {title: t("activeIngredient.code"), field: "code", align: "left", width: "150"},
        {title: t("activeIngredient.healthInsuranceCode"), field: "healthInsuranceCode", align: "left", width: "150"},
        {
            title: t("general.action"),
            render: (rowData) => (
                <MaterialButton
                    item={rowData}
                    onSelect={(rowData, method) => {
                        if (method === 0) {
                            handleEditActiveIngredient(rowData.id);
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
            data={activeIngredientList}
            handleSelectList={handleSelectListActiveIngredient}
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
