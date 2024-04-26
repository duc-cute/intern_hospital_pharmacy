import React from "react";
import { useStore } from "app/stores";
import { observer } from "mobx-react";
import ReportTable from "../Components/ReportTable";
import { getReportDetails } from "./EndOfDayReportService";
import moment from "moment";
import { END_OF_DAY_REPORT_CONCERN_TYPE } from "app/common/Constant/LocalConstantList";

export default observer(function EndOfDayReportList() {

  const { endOfDayReport, endOfDayReportSearch } = useStore().endOfDayReportStore;

  let tableProps = {}
  
  switch(endOfDayReportSearch.concernType) {
    //bán hàng
    case END_OF_DAY_REPORT_CONCERN_TYPE[0].value: {
      tableProps.type = 2;
      tableProps.data = endOfDayReport?.items || []
      tableProps.columns = [
        { 
          title: "Mã giao dịch", 
          field: "code", 
          align: "left",
          generateSubTable: getReportDetails,
          searchBy: ["type"],
          searchObject: endOfDayReportSearch,
          render: (row) => {
            if (row.type === 1) return "Hóa đơn: " + row.billQuantity
            if (row.type === 2) return "Trả hàng: " + row.billQuantity
            return null
          }
        },
        { 
          title: "Thời gian", 
          field: "time", 
          align: "left",
        },
        { 
          title: "SL",
          field: "productQuantity", 
          align: "right",
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
          title: "Thu khác", 
          field: "otherRevenue", 
          align: "right",
          render: (row) => {
            if (row.otherRevenue) return row.otherRevenue.toLocaleString();
            return 0
          }
        },
        {
          title: "Giảm giá",
          field: "discount",
          align: "right",
          render: (row) => {
            if (row.discount) return row.discount.toLocaleString();
            return 0
          }
        },
        { 
          title: "Phí trả hàng", 
          field: "returnFee", 
          align: "right",
          render: (row) => {
            if (row.returnFee) return row.returnFee.toLocaleString();
            return 0
          }
        },
        { 
          title: "Thực thu", 
          field: "realRevenue", 
          align: "right",
          render: (row) => {
            if (row.realRevenue) return row.realRevenue.toLocaleString();
            return 0
          }
        },
      ]
      tableProps.rowNegativeValue = "realRevenue";
      tableProps.subColumns = [
        {
          title: "Mã giao dịch",
          field: "code",
          align: "left",
        },
        {
          title: "Thời gian",
          field: "date",
          align: "left",
          render: row => (row.date && moment(row.date).isValid()) ? moment(row.date).format("DD/MM/YYYY HH:mm") : null
        },
        {
          title: "SL",
          field: "productQuantity",
          align: "right",
        },
        {
          title: "Doanh thu",
          field: "custom",
          align: "right",
          render: (row) => {
            if (row.revenue) return row.revenue.toLocaleString();
            return 0
          }
        },
        {
          title: "Thu khác",
          field: "custom",
          align: "right",
          render: (row) => {
            if (row.otherRevenue) return row.otherRevenue.toLocaleString();
            return 0
          }
        },
        {
          title: "Giảm giá",
          field: "discount",
          align: "right",
          render: (row) => {
            if (row.discount) return row.discount.toLocaleString();
            return 0
          }
        },
        {
          title: "Phí trả hàng",
          field: "custom",
          align: "right",
          render: (row) => {
            if (row.returnFee) return row.returnFee.toLocaleString();
            return 0
          }
        },
        {
          title: "Thực thu",
          field: "custom",
          align: "right",
          render: (row) => {
            if (row.realRevenue) return row.realRevenue.toLocaleString();
            return 0
          }
        }
      ]
      break;
    }
    //thu chi
    case END_OF_DAY_REPORT_CONCERN_TYPE[1].value: {
      tableProps.type = 1;
      tableProps.data = endOfDayReport?.items || []
      tableProps.columns = [
        { 
          title: "Mã phiếu thu/chi", 
          field: "code", 
          align: "left",
        },
        { 
          title: "Người nộp/nhận", 
          field: "customer", 
          align: "left",
        },
        { 
          title: "Thu/Chi",
          field: "revenue", 
          align: "right",
          render: (row) => {
            if (row.revenue) return row.revenue.toLocaleString();
            return 0
          }
        },
        { 
          title: "Thời gian", 
          field: "date", 
          align: "left",
          render: row => (row.date && moment(row.date).isValid()) ? moment(row.date).format("DD/MM/YYYY HH:mm") : null
        },
        { 
          title: "Mã chứng từ", 
          field: "invoiceCode", 
          align: "left",
        },
      ]
      if (endOfDayReport?.billQuantity) {
        tableProps.totalRow = {
          code: "SL phiếu: " + endOfDayReport?.billQuantity,
          revenue: endOfDayReport?.revenue
        }
      }
      break;
    }
    //hàng hóa
    case END_OF_DAY_REPORT_CONCERN_TYPE[2].value: {
      tableProps.type = 1;
      tableProps.data = endOfDayReport?.items || []
      tableProps.columns = [
        { 
          title: "Mã hàng", 
          field: "code", 
          align: "left",
        },
        { 
          title: "Tên hàng", 
          field: "productName", 
          align: "left",
        },
        { 
          title: "SL bán",
          field: "salesQuantity", 
          align: "right",
          render: (row) => {
            if (row.salesQuantity) return row.salesQuantity.toLocaleString();
            return 0
          }
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
          title: "SL trả",
          field: "returnQuantity", 
          align: "right",
          render: (row) => {
            if (row.returnQuantity) return row.returnQuantity.toLocaleString();
            return 0
          }
        },
        { 
          title: "Giá trị trả",
          field: "returnAmount", 
          align: "right",
          render: (row) => {
            if (row.returnAmount) return row.returnAmount.toLocaleString();
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
      if (endOfDayReport?.productQuantity) {
        tableProps.totalRow = {
          code: "SL mặt hàng: " + endOfDayReport?.productQuantity,
          //TODO
        }
      }
      break;
    }
    //tổng hợp
    case END_OF_DAY_REPORT_CONCERN_TYPE[3].value: {
      
      break;
    }

    
    default: { }
  }

  return (
    <ReportTable {...tableProps} />
  );
});
