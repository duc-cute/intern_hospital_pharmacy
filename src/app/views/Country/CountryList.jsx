import React from "react";
import GlobitsTable from "../../common/GlobitsTable";
import { useStore } from "../../stores";
import { useTranslation } from "react-i18next";
import { IconButton, Icon } from "@material-ui/core";
import { observer } from "mobx-react";

function MaterialButton(props) {
  const { item } = props;
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

export default observer(function CountryList() {
  const { countryStore } = useStore();
  const { t } = useTranslation();

  const {
    countryList,
    totalPages,
    totalElements,
    rowsPerPage,
    page,
    handleChangePage,
    setRowsPerPage,
    handleDelete,
    handleEditCountry,
    handleSelectListCountry,
  } = countryStore;


  let columns = [
    {
      title: "Tên", field: "name", width: "150",
      cellStyle: (index, rowData) => (
        {
          fontWeight: (rowData?.hasChildren && "bold"),
          fontSize: ((!(rowData?.parent) && "20px"))
        }
      )
    },
    {
      title: "Mã", field: "code", width: "150",
    },
    {
      title: "Miêu tả", field: "description", width: "150",
    },
    {
      title: t("general.action"),
      render: (rowData) => (
        <MaterialButton
          item={rowData}
          onSelect={(rowData, method) => {
            if (method === 0) {
              handleEditCountry(rowData.id);
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
      data={countryList}
      handleSelectList={handleSelectListCountry}
      columns={columns}
      totalPages={totalPages}
      handleChangePage={handleChangePage}
      setRowsPerPage={setRowsPerPage}
      pageSize={rowsPerPage}
      pageSizeOption={[1, 2, 3, 5, 10, 25]}
      totalElements={totalElements}
      page={page}
      parentChildData={(row, rows) => rows.find((a) => a.id === row.parentId)}
      rowStyle={(rowData, index) => ({ fontWeight: rowData.parentId ? "normal" : "bold" })}
      doubleSidePagination={false}
    />
  );
});
