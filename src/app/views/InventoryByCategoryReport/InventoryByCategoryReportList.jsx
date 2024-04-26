import React from "react";
import GlobitsTable from "../../common/GlobitsTable";
import { useStore } from "../../stores";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";


export default observer(function InventoryByCategoryReportList() {
  const { inventoryByCategoryReportStore } = useStore();
  const { t } = useTranslation();

  const {
    inventoryReportList,
  } = inventoryByCategoryReportStore;

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
    { title: t("category.code"), field: "categoryCode", width: "150" },
    { title: t("category.name"), field: "categoryName", width: "150" },
    { title: 'Thuốc - vật tư y tế', field: "productName", width: "150" },
    { title: 'Đơn vị tính', field: "defaultSku.skuName", width: "150" },
    { 
      title: 'Tồn đầu kỳ', 
      field: "quantity", 
      width: "150",
      render: rowData => parseInt(rowData?.quantity) ? parseInt(rowData?.quantity)?.toLocaleString() : 0
    },
    { 
      title: t("inventoryReport.input"), 
      field: "inQuantityInterm", 
      width: "150",
      render: rowData => parseInt(rowData?.inQuantityInterm) ? parseInt(rowData?.inQuantityInterm)?.toLocaleString() : 0
    },
    { 
      title: t("inventoryReport.output"), 
      field: "outQuantityInterm", 
      width: "150",
      render: rowData => parseInt(rowData?.outQuantityInterm) ? parseInt(rowData?.outQuantityInterm)?.toLocaleString() : 0
    },
    { 
      title: 'Tồn cuối kỳ', 
      field: "inventoryQuantity", 
      width: "150",
      render: rowData => parseInt(rowData?.inventoryQuantity) ? parseInt(rowData?.inventoryQuantity)?.toLocaleString() : 0
    },
  ];
  return (
    <GlobitsTable
      data={inventoryReportList}
      columns={columns}
      noPagination
    />
  );
});
