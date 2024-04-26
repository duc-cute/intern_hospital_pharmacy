import React from "react";
import GlobitsTable from "../../common/GlobitsTable";
import { useStore } from "../../stores";
import { useTranslation } from "react-i18next";
import { IconButton, Icon } from "@material-ui/core";
import { observer } from "mobx-react";
import LocalConstants from "app/LocalConstants";

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

export default observer(function AttributeList() {
  const { attributeStore } = useStore();
  const { t } = useTranslation();

  const {
    attributeList,
    totalPages,
    totalElements,
    rowsPerPage,
    page,
    handleChangePage,
    setRowsPerPage,
    handleDelete,
    handleEditAttribute,
    handleSelectListAttribute,
  } = attributeStore;

  let columns = [

    { title: t("attribute.name"), field: "name", width: "150" },
    { title: t("attribute.code"), field: "code", align: "left", width: "150" },
    { title: t("attribute.type"), 
    field: "type", 
    render: (rowData) => (
      <span>{LocalConstants.TypeOfAttribute?.find((e) => e.value === rowData.type)?.name}</span>
    ),
    align: "left",
     width: "150" },
    {
      title: t("general.action"),
      render: (rowData) => (
        <MaterialButton
          item={rowData}
          onSelect={(rowData, method) => {
            if (method === 0) {
              handleEditAttribute(rowData.id);
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
      data={attributeList}
      handleSelectList={handleSelectListAttribute}
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
