import React from "react";
import moment from "moment";
import GlobitsTable from "app/common/GlobitsTable";

export default function DashboardTable({ data }) {
  const columns = [
    {
      title: "Thuốc - vật tư y tế",
      field: "productName",
      cellStyle: {
        minWidth: "30%",
        whiteSpace: "nowrap",
      },
      render: (rowData) => {
        let productName = rowData?.productName
        if (productName && rowData?.defaultSku.skuName) {
          productName += " (" + rowData?.defaultSku.skuName + ")";
        }
        // let content = rowData?.productContent;
        // if (content && rowData?.productUnit) {
        //   content += " " + rowData?.productUnit;
        // }
        let hsdColor = "#000";
        if (rowData?.expiryDate && moment(rowData?.expiryDate).isBefore(moment(new Date()), "date")) {
          hsdColor = "red"
        } else if (moment(rowData?.expiryDate).isSameOrBefore(moment(new Date()).add(6, "months"), "date")) {
          hsdColor = "#fe851c"
        }
        const hsd = rowData?.expiryDate ? moment(rowData?.expiryDate).format("DD/MM/YYYY") : ""
        
        return (
          <div>
            <div className="text-primary"><strong>{productName}</strong></div>
            {/* <div>Nồng độ/Hàm lượng: {content}</div> */}
            {/* <div>Hoạt chất: {rowData?.productActiveIngredient || ""}</div> */}
            {/* <div>Đơn vị tính: {rowData?.defaultSku.skuName || ""}</div> */}
            <div>Số lô: <strong>{rowData?.batchCode || ""}</strong></div>
            <div>Nguồn: <strong>{rowData?.sourceCode || ""}</strong></div>
            <div>HSD: <strong style={{color: hsdColor}}>{hsd}</strong></div>
          </div>
        );
      },
    },
    {
      title: "Tồn đầu kỳ",
      field: "quantity",
      width: "10%",
      render: (rowData) =>
        parseInt(rowData?.quantity)
          ? parseInt(rowData.quantity).toLocaleString()
          : 0,
    },
    {
      title: "Nhập trong kỳ",
      field: "inQuantityInterm",
      width: "10%",
      render: (rowData) =>
        parseInt(rowData?.inQuantityInterm)
          ? parseInt(rowData?.inQuantityInterm)?.toLocaleString()
          : 0,
    },
    {
      title: "Xuất trong kỳ BN BHYT",
      field: "shiOutQuantityInterm",
      width: "10%",
      render: (rowData) =>
        parseInt(rowData?.shiOutQuantityInterm)
          ? parseInt(rowData?.shiOutQuantityInterm)?.toLocaleString()
          : 0,
    },
    {
      title: "Xuất trong kỳ BN khác",
      field: "shiOutQuantityInterm",
      width: "10%",
      render: (rowData) => {
        const result =
          parseInt(rowData?.outQuantityInterm) -
          parseInt(rowData?.shiOutQuantityInterm);
        return result ? result.toLocaleString() : 0;
      },
    },
    {
      title: "Hư hao",
      field: "huhao",
      width: "10%",
      render: (rowData) =>
        parseInt(rowData?.huhao)
          ? parseInt(rowData?.huhao)?.toLocaleString()
          : 0,
    },
    {
      title: "Tồn cuối kỳ",
      field: "inventoryQuantity",
      width: "10%",
      render: (rowData) =>
        parseInt(rowData?.inventoryQuantity)
          ? parseInt(rowData?.inventoryQuantity)?.toLocaleString()
          : 0,
    },
  ];

  return (
    <div className="mt-16">
      <GlobitsTable data={data || []} columns={columns} noPagination />
    </div>
  );
}
