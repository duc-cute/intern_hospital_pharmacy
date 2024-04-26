import React from "react";
import GlobitsTable from "app/common/GlobitsTable";
import { useStore } from "app/stores";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";
import { getDate } from "app/common/Constant/LocalFunction";

export default observer(function OriginReportList() {
  const { t } = useTranslation();

  const { originReport } = useStore().originReportStore;

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
        let displayContent = "";
        if (rowData?.productContent && rowData?.productUnit) {
          displayContent = ` (${rowData?.productContent}${rowData?.productUnit})`
        }
        return (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a
            //  onClick={() => handleEditInventoryReport(rowData)} 
            className="title-detail-inventory-report"><b>{rowData?.productName}{displayContent}</b></a>
        )
      }
    },
    { title: t("inventoryReport.batchCode"), field: "batchCode", width: "150" },
    {
      title: t("inventoryReport.expiryDate"), field: "expiryDate", width: "150",
      render: (rowData) => getDate(rowData?.expiryDate)
    },
    { title: t("inventoryReport.unitName"), field: "defaultSkuName", width: "150" },
    { title: "Tồn đầu kỳ", field: "quantity" },
    { title: t("inventoryReport.input"), field: "inQuantityInterm", width: "150" },
    { title: "Xuất kho", field: "outQuantityInterm", width: "150" },
    { title: t("inventoryReport.numberInventory"), field: "inventoryQuantity", width: "150" },

  ];
  return (
    <GlobitsTable data={originReport} columns={columns} noPagination />
  );
});
