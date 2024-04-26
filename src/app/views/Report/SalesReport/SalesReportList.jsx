import React from "react";
import { useStore } from "app/stores";
import { observer } from "mobx-react";
import ReportTable from "../Components/ReportTable";
import { getReportDetails } from "./SalesReportService";
import { SALES_REPORT_CONCERN_TYPE } from "app/common/Constant/LocalConstantList";
import { getDate } from "app/common/Constant/LocalFunction";

export default observer(function SalesReportList() {

  const { salesReport, salesReportSearch } = useStore().salesReportStore;

  let tableProps = {}


  switch (salesReportSearch.concernType) {
    case SALES_REPORT_CONCERN_TYPE[0].value: {
      tableProps.columns = [
        {
          title: "Thời gian",
          field: "time",
          align: "left",
          generateSubTable: getReportDetails,
          searchBy: ["date"],
        },
        {
          title: "Doanh thu",
          field: "revenue",
          align: "right",
          render: (row) => {
            if (row.revenue) return row.revenue.toLocaleString();
            return 0
          }
        },
        {
          title: "Giá trị trả",
          field: "returnOrderAmount",
          align: "right",
          render: (row) => {
            if (row.returnOrderAmount) return row.returnOrderAmount.toLocaleString();
            return 0
          }
        },
        {
          title: "Doanh thu thuần",
          field: "netRevenue",
          align: "right",
          render: (row) => {
            if (row.netRevenue) return row.netRevenue.toLocaleString();
            return 0
          }
        },
      ]
      tableProps.rowNegativeValue = "netRevenue";
      tableProps.subColumns = [
        {
          title: "Mã hóa đơn",
          field: "code",
          align: "left",
        },
        {
          title: "Thời gian",
          field: "time",
          align: "left",
          render: row => getDate(row.time, "DD/MM/YYYY HH:mm", "DD/MM/YYYY HH:mm:ss")
        },
        {
          title: "Khách hàng",
          field: "customerName",
          align: "left",
        },
        {
          title: "Doanh thu",
          field: "custom",
          align: "right",
          render: (row) => {
            if (row.netRevenue) return row.netRevenue.toLocaleString();
            return 0
          }
        }
      ]
      break;
    }
    case SALES_REPORT_CONCERN_TYPE[1].value: {
      tableProps.columns = [
        { title: "Thời gian", field: "blank", width: "150" },
        { title: "Tổng tiền hàng", field: "blank", width: "150" },
        { title: "Giảm giá", field: "blank", width: "150" },
        { title: "Doanh thu", field: "blankCode", width: "150" },
        { title: "Tổng giá vốn", field: "blankCode", width: "150" },
        { title: "Lợi nhuận gộp", field: "blankCode", width: "150" },
      ]
      break;
    }
    case SALES_REPORT_CONCERN_TYPE[2].value: {
      tableProps.columns = [
        { title: "Thời gian", field: "blank", width: "150" },
        { title: "Tổng hóa đơn", field: "blank", width: "150" },
        { title: "Giá trị hóa đơn", field: "blank", width: "150" },
        { title: "Giảm giá HĐ", field: "blank", width: "150" },
      ]
      break;
    }
    case SALES_REPORT_CONCERN_TYPE[3].value: {
      tableProps.columns = [
        { title: "Thời gian", field: "blank", width: "150" },
        { title: "SL phiếu trị", field: "blank", width: "150" },
        { title: "Giá trị trả", field: "blank", width: "150" },
      ]
      break;
    }
    case SALES_REPORT_CONCERN_TYPE[4].value: {
      tableProps.columns = [
        { title: "Người bán", field: "blank", width: "150" },
        { title: "Doanh thu", field: "blank", width: "150" },
        { title: "Giá trị trả", field: "blank", width: "150" },
        { title: "Doanh thu thuần", field: "blank", width: "150" },
      ]
      break;
    }
    default: { }
  }

  return (
    <ReportTable
      // columns={columns}
      // subColumns={subColumns}
      {...tableProps}
      data={salesReport?.items || []}
      totalRow={(salesReport?.revenue || salesReport?.returnOrderAmount) ? salesReport : null}
    />
  );
});
