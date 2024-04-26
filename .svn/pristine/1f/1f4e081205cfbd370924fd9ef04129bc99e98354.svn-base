import React from "react";
import GlobitsTable from "app/common/GlobitsTable";
import { useStore } from "app/stores";
import { useTranslation } from "react-i18next";
import { IconButton, Icon } from "@material-ui/core";
import { observer } from "mobx-react";
import LocalConstants from "app/LocalConstants";
import { memo } from "react";
import Config from "app/appConfig";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { getDate } from "app/common/Constant/LocalFunction";

function StockOutList() {
  const { stockOutStore } = useStore();
  const { t } = useTranslation();

  const {
    stockOutList,
    totalPages,
    totalElements,
    pageSize,
    pageIndex,
    setPageIndexStockOut,
    setPageSizeStockOut,
    handleDeleteStockOut,
  } = stockOutStore;

  let columns = [
    { title: "Mã hóa đơn", field: "invoiceCode", width: "150", sorting: false, },
    { title: t("stockOut.code"), field: "code", width: "150", sorting: false, },
    {
      title: t("stockOut.dateIssue"), field: "dateIssue", align: "left", width: "150", sorting: false,
      render: (rowData) => getDate(rowData?.dateIssue)
    },
    {
      title: t("stockOut.kind"), field: "store.kind", align: "left", width: "150", sorting: false,
      render: rowData => {
        return LocalConstants.ListStoreTransactionKindOut.find((e) => e.value === rowData?.kind)?.name || ""
      }
    },
    {
      title: "Thông tin thêm", align: "left", width: "150", sorting: false,
      render: rowData => {
        if (rowData.fromStore?.name && rowData.toStore?.name) {
          return (
            <div>
              <div>Kho xuất: {rowData?.fromStore?.name || ""}</div>
              <div>Kho nhập: {rowData.toStore?.name || ""}</div>
            </div>
          )
        }

        if (rowData.fromStore?.name) {
          return `Kho Xuất: ${rowData.fromStore?.name || ""}`
        }
      }
    },
    {
      title: "Trạng thái",
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
        const path = Config.ROOT_PATH + 'manage/stock-out/form?id=' + rowData?.id;

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
            <IconButton size="small" onClick={() => handleDeleteStockOut(rowData)}>
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
      data={stockOutList}
      handleChangePage={(_, page) => setPageIndexStockOut(page)}
      setRowsPerPage={e => setPageSizeStockOut(e.target.value)}
      columns={columns}
      totalPages={totalPages}
      totalElements={totalElements}
      pageSize={pageSize}
      page={pageIndex}
    />
  );
};

export default memo(observer(StockOutList))