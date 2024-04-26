import { Icon, IconButton } from "@material-ui/core";
import { getDate } from "app/common/CommonFunctions";
import GlobitsTable from "app/common/GlobitsTable";
import { useStore } from "app/stores"
import { observer } from "mobx-react"
import React from "react"
import { useTranslation } from "react-i18next";


const MaterialButton = (props) => {
  const { item, onSelect } = props;
  return (
    <div>
      <IconButton size="small" onClick={() => onSelect(item, 0)}>
        <Icon fontSize="small" color="primary">
          edit
        </Icon>
      </IconButton>
      <IconButton size="small" onClick={() => onSelect(item, 1)}>
        <Icon fontSize="small" color="error">
          delete
        </Icon>
      </IconButton>
    </div>
  );
}

const CustomerList = () => {
  const { t } = useTranslation()
  const {
    customerList,
    totalPages,
    totalElements,
    rowsPerPage,
    page,
    handleChangePage,
    setRowsPerPage,
    handleOpenFormConfirm,
    handleOpenForm,
  } = useStore().customerStore;

  let columns = [
    { title: 'Tên khách hàng', field: "name", align: "center", width: "150" },
    { title: 'Mã khách hàng', field: "code", align: "center", width: "150" },
    { title: 'Ngày sinh', field: "birthDate", align: "center", width: "150", render: (rowData) => <>{getDate(rowData.birthDate)}</> },
    { title: 'Số điện thoại', field: "phoneNumber", align: "center", width: "150" },
    {
      title: t("general.action"),
      align: "center",
      render: (rowData) => (
        <MaterialButton
          item={rowData}
          onSelect={(rowData, method) => {
            if (method === 0) {
              handleOpenForm(rowData.id);
            } else if (method === 1) {
              handleOpenFormConfirm(rowData.id);
            } else {
              alert("Call Selected Here:" + rowData.id);
            }
          }}
        />
      ),
    },
  ]

  return (
    <GlobitsTable
      data={customerList}
      columns={columns}
      totalPages={totalPages}
      handleChangePage={handleChangePage}
      setRowsPerPage={setRowsPerPage}
      pageSize={rowsPerPage}
      pageSizeOption={[1, 2, 3, 5, 10, 25]}
      totalElements={totalElements}
      page={page}
    />
  )
}

export default observer(CustomerList)