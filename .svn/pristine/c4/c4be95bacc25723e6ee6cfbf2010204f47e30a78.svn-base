import React from "react";
import GlobitsTable from "../../common/GlobitsTable";
import { useStore } from "../../stores";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";
import { getDate } from "app/common/Constant/LocalFunction";

export default observer(function InventoryReportList() {
  const { inventoryReportStore } = useStore();
  const { t } = useTranslation();

  const {
    inventoryReportList,
    totalPages,
    totalElements,
    rowsPerPage,
    page,
    handleChangePage,
    setRowsPerPage,
    handleEditInventoryReport,
  } = inventoryReportStore;

  let columns = [
    {
      title: t("inventoryReport.index"), field: "custom", width: "150",
      render: rowData => {
        return (rowData.tableData.id + 1)
      },
      cellStyle: {
        maxWidth: "5%"
      },
      headerStyle: {
        maxWidth: "5%"
      }
    },
    {
      title: t("product.name"), field: "productName", width: "150",
      render: rowData => {
        return (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a onClick={() => handleEditInventoryReport(rowData)} className="title-detail-inventory-report"><b>{rowData?.productName} ({rowData?.productContent}{rowData?.productUnit})</b></a>
        )
      }
    },
    { title: t("inventoryReport.batchCode"), field: "batchCode", width: "150" },
    {
      title: t("inventoryReport.expiryDate"), field: "expiryDate", width: "150",
      render: (rowData) => getDate(rowData?.expiryDate)
    },
    // { title: t("inventoryReport.inventoryBeginningPeriod"), field: "inventoryBeginningPeriod", width: "150" },
    { title: t("inventoryReport.unitName"), field: "defaultSkuName", width: "150" },
    { title: t("inventoryReport.input"), field: "inQuantityInterm", width: "150" },
    { title: "Xuất kho", field: "outQuantityInterm", width: "150" },
    // { title: t("inventoryReport.exportUse"), field: "shiOutQuantityInterm", width: "150" },
    { title: t("inventoryReport.numberInventory"), field: "inventoryQuantity", width: "150" },

  ];
  return (
    <GlobitsTable
      data={inventoryReportList}
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
