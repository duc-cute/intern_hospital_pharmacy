import React, { memo } from "react";
import GlobitsTable from "app/common/GlobitsTable";
import { useStore } from "app/stores";
import { useTranslation } from "react-i18next";
import { IconButton, Icon } from "@material-ui/core";
import { observer } from "mobx-react";
import LocalConstants from "app/LocalConstants";
import { getDate } from "app/common/Constant/LocalFunction";
import { NavLink } from "react-router-dom";
import Config from "app/appConfig";
import { StockInKind } from "app/common/Constant/LocalConstant";

function StockInList() {
  const { stockInStore } = useStore();
  const { t } = useTranslation();

  const {
    stockInList,
    totalPages,
    totalElements,
    pageIndex,
    pageSize,
    handleDeleteStockIn,
    setPageIndexStockIn,
    setPageSizeStockIn,
  } = stockInStore;

  let columns = [
    { title: "Mã hóa đơn", field: "invoiceCode", width: "150", sorting: false, },
    { title: t("stockIn.code"), field: "code", width: "150", sorting: false },
    { title: t("stockIn.dateIssue"), field: "dateIssue", align: "left", width: "150", sorting: false, render: (rowData) => getDate(rowData?.dateIssue) },
    {
      title: "Loại nhập kho", field: "", align: "left", width: "150", sorting: false,
      render: rowData => LocalConstants.ListStoreTransactionKindIn.find((e) => e.value === rowData?.kind)?.name || "",
    },
    {
      title: "Thông tin thêm", field: "", align: "left", width: "150", sorting: false,
      render: rowData => {
        if (rowData?.kind === StockInKind.FROM_SUPPLIER) {
          return (
            <div>
              <div>Tên NCC: {rowData?.supplier?.name || ""}</div>
              <div>Kho nhập: {rowData.toStore?.name || ""}</div>
            </div>
          )
        }

        if ([StockInKind.FROM_UNDERGROUND_WAREHOUSE, StockInKind.FROM_SAME_LINE_WAREHOUSE, StockInKind.FROM_UPPER_LINE_WAREHOUSE].includes(rowData?.kind)) {
          return (
            <div>
              <div>Kho xuất: {rowData?.fromStore?.name || ""}</div>
              <div>Kho nhập: {rowData?.toStore?.name || ""}</div>
            </div>
          )
        }
        return ""
      }
    },
    {
      title: "Trạng thái",
      field: "",
      align: "center",
      sorting: false,
      render: rowData => {
        if (rowData?.status !== null) {
          return LocalConstants.TRANSACTION_STATUS.find(f => f.value === rowData.status)?.name
        }
        return ""
      }
    },
    {
      title: t("general.action"),
      sorting: false,
      align: "center",
      render: (rowData) => {
        const path = Config.ROOT_PATH + 'manage/stock-in/form?id=' + rowData?.id;

        if (rowData?.status === LocalConstants.TRANSACTION_STATUS_NEW) {
          return (
            <IconButton size="small" component={NavLink} to={path}>
              <Icon fontSize="small" color="primary">
                assignment_turned_in
              </Icon>
            </IconButton>
          )
        }

        return (
          <>
            <IconButton size="small" component={NavLink} to={path}>
              <Icon fontSize="small" color="primary">
                edit
              </Icon>
            </IconButton>

            <IconButton size="small" onClick={() => handleDeleteStockIn(rowData)}>
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
      data={stockInList}
      columns={columns}
      totalPages={totalPages}
      handleChangePage={(_, page) => setPageIndexStockIn(page)}
      setRowsPerPage={e => setPageSizeStockIn(e.target.value)}
      pageSize={pageSize}
      totalElements={totalElements}
      page={pageIndex}
    />
  );
};

export default memo(observer(StockInList));