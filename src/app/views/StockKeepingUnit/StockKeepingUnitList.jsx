import React from "react";
import GlobitsTable from "../../common/GlobitsTable";
import { useStore } from "../../stores";
import { useTranslation } from "react-i18next";
import { IconButton, Icon } from "@material-ui/core";
import { observer } from "mobx-react";
import { memo } from "react";

function StockKeepingUnitList() {
  const { stockKeepingUnitStore } = useStore();
  const { t } = useTranslation();

  const {
    pageStockKeepingUnit,
    searchStockKeepingUnit,
    handleOpenForm,
    handleChangeFormSearch,
    handleOpenConfirmDelete,
  } = stockKeepingUnitStore;

  let columns = [
    { title: t("stockKeepingUnit.name"), field: "name", width: "150" },
    { title: t("stockKeepingUnit.code"), field: "code", align: "left", width: "150" },
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
      data={pageStockKeepingUnit?.content}
      totalPages={pageStockKeepingUnit?.totalPages}
      totalElements={pageStockKeepingUnit?.totalElements}
      pageSize={searchStockKeepingUnit?.pageSize}
      page={searchStockKeepingUnit?.pageIndex}
      handleChangePage={(_, pageIndex) => handleChangeFormSearch({ pageIndex })}
      setRowsPerPage={e => handleChangeFormSearch({ pageSize: e.target.value })}
      columns={columns}
      doubleSidePagination={false}
    />
  );
};

export default memo(observer(StockKeepingUnitList));