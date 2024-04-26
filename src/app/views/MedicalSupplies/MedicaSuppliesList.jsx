import React from "react";
import GlobitsTable from "../../common/GlobitsTable";
import {useStore} from "../../stores";
import {useTranslation} from "react-i18next";
import {Icon, IconButton} from "@material-ui/core";
import {observer} from "mobx-react";
import {PathModule} from "app/common/Constant/LocalConstant";
import history from "history.js";
import ConstantList from 'app/appConfig';

function MaterialButton(props) {
    const {item} = props;
    return (
        <div>
            <IconButton size="small" onClick={() => props.onSelect(item, 1)}>
                <Icon fontSize="small" color="primary">
                    edit
                </Icon>
            </IconButton>
            <IconButton size="small" onClick={() => props.onSelect(item, 2)}>
                <Icon fontSize="small" color="error">
                    delete
                </Icon>
            </IconButton>
        </div>
    );
}

export default observer(function MedicaSuppliesList() {
    const {productStore} = useStore();
    const {t} = useTranslation();

    const {
        productList,
        totalPages,
        totalElements,
        rowsPerPage,
        page,
        handleChangePage,
        setRowsPerPage,
        handleDelete,
        handleEditProduct,
        handleSelectListProduct,
    } = productStore;

    let columns = [

        {title: "Mã vật tư y tế", field: "code", width: "150"},
        {title: "Tên vật tư y tế", field: "name", width: "150"},
        {title: "Nhóm vật tư y tế", field: "categories[0].name", width: "150"},
        {
            title: "Giá bán",
            field: "price",
            width: "150",
            render: ({price}) => {
                if (price) {
                    return price.toLocaleString() + " VND"
                }
                return "0 VND"
            }
        },
        {title: "Mô tả", field: "description", width: "150"},
        {
            title: t("general.action"),
            render: (rowData) => (
                <MaterialButton
                    item={rowData}
                    onSelect={(rowData, method) => {
                        if (method === 0) {
                            return history.push(ConstantList.ROOT_PATH + PathModule.MANAGE + '/category/medicaSupplies/' + rowData.id)
                        } else if (method === 1) {
                            handleEditProduct(rowData.id);
                        } else if (method === 2) {
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
            data={productList}
            handleSelectList={handleSelectListProduct}
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
