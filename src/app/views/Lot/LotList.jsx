import React, { memo } from "react";
import GlobitsTable from "app/common/GlobitsTable";
import { useStore } from "app/stores";
import { useTranslation } from "react-i18next";
import { IconButton, Icon } from "@material-ui/core";
import { observer } from "mobx-react";
import LocalConstants from "app/LocalConstants";
import { getDate } from "app/common/Constant/LocalFunction";

function LotList() {
  const { t } = useTranslation();

  const {
    pageLot,
    searchObject,
    handleChangeFormSearch,
    handleDeleteLot,
    handleOpenForm,
  } = useStore().lotStore;

  let columns = [
    {
      title: "STT", field: "invoiceCode", width: "150", sorting: false,
      render: rowData => rowData.tableData.id + 1,
      cellStyle: {
        maxWidth: "5%"
      },
    },
    { title: "Thuốc - vật tư y tế", field: "product.name", width: "150", sorting: false, },
    { title: "Nguồn", field: "source.name", width: "150", sorting: false, },
    { title: t("lot.code"), field: "batchCode", align: "left", width: "150", sorting: false },
    { title: "Số lô", field: "quantity", align: "left", width: "150", sorting: false },
    {
      title: "Hạn sử dụng", align: "left", width: "150", sorting: false,
      render: (rowData) => getDate(rowData?.expiryDate)
    },
    { title: "Đơn vị tính", field: "stockKeepingUnit.name", align: "left", width: "150", sorting: false },
    {
      title: "Thao tác",
      sorting: false,
      align: "center",
      render: (rowData) => {
        if (rowData?.status === LocalConstants.TRANSACTION_STATUS_NEW) {
          return (
            <IconButton size="small" onClick={() => handleOpenForm(rowData.id)}>
              <Icon fontSize="small" color="primary">
                assignment_turned_in
              </Icon>
            </IconButton>
          )
        }
        return (
          <>
            <IconButton size="small" onClick={() => handleOpenForm(rowData.id)}>
              <Icon fontSize="small" color="primary">
                edit
              </Icon>
            </IconButton>

            <IconButton size="small" onClick={() => handleDeleteLot(rowData)}>
              <Icon fontSize="small" color="error">
                delete
              </Icon>
            </IconButton>
          </>
        )
      }
    },
  ];

  return (
    <GlobitsTable
      columns={columns}
      data={pageLot?.content}
      totalPages={pageLot?.totalPages}
      totalElements={pageLot?.totalElements}
      pageSize={searchObject?.pageSize}
      page={searchObject?.pageIndex}
      handleChangePage={(_, pageIndex) => handleChangeFormSearch({ pageIndex })}
      setRowsPerPage={e => handleChangeFormSearch({ pageSize: e.target.value })}
    />
  );
};

export default memo(observer(LotList));