import React from "react";
import GlobitsTable from "app/common/GlobitsTable";
import { useStore } from "app/stores";
import { useTranslation } from "react-i18next";
import { IconButton, Icon } from "@material-ui/core";
import { observer } from "mobx-react";
import LocalConstants from "app/LocalConstants";
import { memo } from "react";

function List() {
  const { t } = useTranslation();

  const {
    handleChangeFormSearch,
    handleOpenConfirmDelete,
    handleOpenForm,
    pageStore,
    searchStore
  } = useStore().storeStore;

  let columns = [
    {
      title: t("store.name"), field: "name", align: "left", width: "150",
      cellStyle: (index, rowData) => (
        {
          fontWeight: (rowData?.hasChildren && "bold"),
          fontSize: ((!(rowData?.parent) && "20px"))
        }
      ),
    },
    { title: t("store.code"), field: "code", width: "150" },
    {
      title: t("store.level"),
      field: "level",
      width: "150",
      render: rowData => LocalConstants.STORE_LEVEL.find(f => f.value === rowData.level)?.name || ""
    },
    {
      title: t("general.action"),
      render: (rowData) => (
        <>
          <IconButton size="small" onClick={() => handleOpenForm(rowData.id)}>
            <Icon fontSize="small" color="primary">
              edit
            </Icon>
          </IconButton>
          <IconButton size="small" onClick={() => handleOpenConfirmDelete(rowData.id)}>
            <Icon fontSize="small" color="error">
              delete
            </Icon>
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <GlobitsTable
      data={pageStore?.content}
      columns={columns}
      totalPages={pageStore?.totalPages}
      totalElements={pageStore?.totalElements}
      handleChangePage={(_, pageIndex) => handleChangeFormSearch({ pageIndex })}
      setRowsPerPage={e => handleChangeFormSearch({ pageSize: e.target.value })}
      pageSize={searchStore?.pageSize}
      page={searchStore?.pageIndex}
      parentChildData={(row, rows) => rows.find((a) => a.id === row.parentId)}
      rowStyle={(rowData, index) => ({ fontWeight: rowData.parent ? "normal" : "bold" })}
      doubleSidePagination={false}
    />
  );
};

export default memo(observer(List))