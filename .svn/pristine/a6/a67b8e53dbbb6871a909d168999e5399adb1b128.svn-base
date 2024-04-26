import React from "react";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";
import { useStore } from "app/stores";
import GlobitsTable from "app/common/GlobitsTable";
import moment from "moment";


export default observer(function InventoryByCategoryReportList() {
  const { inventoryUsageReportStore } = useStore();
  const { t } = useTranslation();

  const {
    reportViewDataList,
  } = inventoryUsageReportStore;

  let columns = [
    { title: "Nguồn", field: "sourceCode" },
    { title: 'Tên thuốc - vật tư y tế', field: "productName" },
    { title: 'Tên hoạt chất', field: "productActiveIngredient" },
    {
      title: 'Nồng độ, hàm lượng', field: "productContent",
      render: (rowData) => {
        let content = rowData?.productContent;
        if (content && rowData?.productUnit) {
          content += " " + rowData?.productUnit
        }
        return content
      },
    },
    { title: 'Đơn vị tính', field: "defaultSku.skuName" },
    { title: 'Số lô', field: "batchCode" },
    {
      title: "Hạn sử dụng", field: "expiryDate",
      render: (rowData) => {
        return (
          <div>
            {rowData?.expiryDate ? moment(rowData?.expiryDate).format("DD/MM/YYYY") : ""}
          </div>
        )
      },
      cellStyle: (index, rowData) => (
        { 
            color: (rowData?.expiryDate && (moment(rowData?.expiryDate).isBefore(moment(new Date()), "date")) ? "red" : ((moment(rowData?.expiryDate).isSameOrBefore(moment(new Date()).add(6, "months"), "date")) ? "#fe851c" : "#000"))
        }
    ),
    },
    {
      title: 'Số lượng tồn đầu kỳ',
      field: "quantity",
      render: rowData => parseInt(rowData?.quantity) ? parseInt(rowData.quantity).toLocaleString() : 0
    },
    {
      title: 'Số lượng nhập trong kỳ',
      field: "inQuantityInterm",
      render: rowData => parseInt(rowData?.inQuantityInterm) ? parseInt(rowData?.inQuantityInterm)?.toLocaleString() : 0
    },
    { 
      title: 'Số lượng xuất trong kỳ BN BHYT', 
      field: "shiOutQuantityInterm",
      render: rowData => parseInt(rowData?.shiOutQuantityInterm) ? parseInt(rowData?.shiOutQuantityInterm)?.toLocaleString() : 0
    },
    {
      title: 'Số lượng xuất trong kỳ BN khác', field: "shiOutQuantityInterm",
      render: (rowData) => {
        const result = (parseInt(rowData?.outQuantityInterm) - parseInt(rowData?.shiOutQuantityInterm))
        return result ? result.toLocaleString() : 0
      },
    },
    { 
      title: 'Số lượng hư hao', 
      field: "huhao",
      render: rowData => parseInt(rowData?.huhao) ? parseInt(rowData?.huhao)?.toLocaleString() : 0
    },
    { 
      title: 'Số lượng tồn cuối kỳ', 
      field: "inventoryQuantity",
      render: rowData => parseInt(rowData?.inventoryQuantity) ? parseInt(rowData?.inventoryQuantity)?.toLocaleString() : 0
    },

  ];
  return (
    <GlobitsTable
      data={reportViewDataList?.length > 0 ? reportViewDataList : []}
      columns={columns}
      noPagination
    />
  );
});