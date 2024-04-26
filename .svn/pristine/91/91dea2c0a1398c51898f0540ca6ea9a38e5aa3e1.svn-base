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

export default observer(function List() {
  const { administrativeStore } = useStore();
  const { t } = useTranslation();

  const {
    administrativeUnitList,
    totalPages,
    totalElements,
    rowsPerPage,
    page,
    handleChangePage,
    setRowsPerPage,
    handleDelete,
    handleEditAdministrative,
    handleSelectListAdministrative,
  } = administrativeStore;

  let columns = [
    { title: t("administrative_unit.code"), field: "code", align: "left", width: "150" },
    { title: t("administrative_unit.name"), field: "name", width: "150" },
    {
      title: t("general.action"),
      render: (rowData) => (
        <MaterialButton
          item={rowData}
          onSelect={(rowData, method) => {
            if (method === 0) {
              handleEditAdministrative(rowData.id);
            } else if (method === 1) {
              handleDelete(rowData.id);
            } else {
              alert("Call Selected Here:" + rowData.id);
            }
          }}
        />
      ),
    },
    // { title: t("administrative_unit.parent"), field: "parent.name", width: "150" },
  ];
  return (
    <GlobitsTable
      selection
      data={administrativeUnitList}
      handleSelectList={handleSelectListAdministrative}
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
