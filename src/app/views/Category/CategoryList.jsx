import React from "react";
import {useStore} from "app/stores";
import {useTranslation} from "react-i18next";
import {Icon, IconButton} from "@material-ui/core";
import {observer} from "mobx-react";
import GlobitsTreeViewTable from "app/common/Component/TreeViewTable/GlobitsTreeViewTable";
import { getListBy } from "./CategoryService";

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

export default observer(function CategoryList() {
    const {categoryStore} = useStore();
    const {t} = useTranslation();

    const {
        categoryList,
        totalPages,
        totalElements,
        rowsPerPage,
        page,
        handleChangePage,
        setRowsPerPage,
        handleDelete,
        handleEditCategory,
        handleSelectListCategory,
    } = categoryStore;


    let columns = [
        {
            title: "Tên nhóm vật tư y tế", field: "name", width: "35%"
        },
        {
            title: "Mã nhóm vật tư y tế", field: "code",
        },
        {
            title: "Nhóm phân loại", field: "categoryType.name",
        },
        {
            title: "Miêu tả", field: "description",
        },
        {
            title: t("general.action"),
            render: (rowData) => (
                <MaterialButton
                    item={rowData}
                    onSelect={(rowData, method) => {
                        if (method === 0) {
                            handleEditCategory(rowData.id);
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
        <GlobitsTreeViewTable
            data={categoryList}
            handleSelectList={handleSelectListCategory}
            columns={columns}
            totalPages={totalPages}
            handleChangePage={handleChangePage}
            setRowsPerPage={setRowsPerPage}
            pageSize={rowsPerPage}
            pageSizeOption={[1, 2, 3, 5, 10, 25]}
            totalElements={totalElements}
            page={page}
            doubleSidePagination={false}
            getChildrenApi={getListBy}
            getChildrenSearchObject={{pageIndex:1,pageSize:10}}
        />
    );
});
