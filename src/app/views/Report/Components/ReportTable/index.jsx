import React from "react";
import "./styles.scss"
import SubReportTable from "./SubReportTable";
import { IconButton, Icon } from "@material-ui/core";
import { toast } from "react-toastify";
import clsx from "clsx";

/**
 * Component ReportTable
 * @param data - `data` props is an array contains rows of table, default []
 * @param columns -  `columns` props is an array contains columns of table, default []
 * @param totalRow - `totalRow` props is an object contains infomation of total row which display in very top of table, default undefined
 * @param subColumns - `subColumns` props is an array contains columns of sub table, default []
 * @param type - `type` props is type of table: 1-display total row by `totalRow` props, 2-display `data` as `totalRow` style and hide `totalRow`, default 1
 */
export default function ReportTable({ 
  data = [], 
  columns = [],
  totalRow,
  subColumns = [],
  type = 1,
  rowNegativeValue
}) {
  return (
    <table className="report-rich-table">
      <thead>
        <tr>
          {columns.map(c => <th key={c.title} align={c.align}>{c.title}</th>)}
        </tr>
      </thead>
      <tbody>
        {(type === 1 && totalRow) && (
          <tr className="bg-total-row total-row">
            {columns.map(c => {
              if (c.render) return <td key={c.title} align={c.align}>{c.render(totalRow)}</td>;
              if (c.field) return <td key={c.title} align={c.align}>{totalRow?.[c.field]}</td>
              return <td key={c.title} align={c.align}></td>
            })}
          </tr>
        )}
        {data?.length === 0 && (
          <tr className="bg-total-row"><td colSpan={columns.length} align="center"><i>Báo cáo không có dữ liệu</i></td></tr>
        )}
        {data.map((d, di) => {
          return (
            <Row 
              key={di}
              columns={columns}
              rowData={d}
              subColumns={subColumns}
              type={type}
              rowNegativeValue={rowNegativeValue}
            />
          )
        })}
      </tbody>
    </table>
  )
}

const Row = ({
  columns,
  rowData,
  subColumns,
  type,
  rowNegativeValue
}) => {

  const [subData, setSubData] = React.useState([]);
  let className = "";
  if (type === 2) {
    className="bg-total-row total-row"
  }

  return (
    <>
      <tr className={className}>{renderRow(columns, rowData, setSubData)}</tr>
      {type === 1 &&
        <tr>
          <td colSpan={columns.length} className={clsx("p-0",type !== 2 && "pl-32")}>
            {(subData?.length > 0) && <SubReportTable data={subData} columns={subColumns} rowNegativeValue={rowNegativeValue} />}
          </td>
        </tr>
      }
      {(type === 2 && subData?.length > 0) &&
        subData.map((s, si) => {
          let className;
          if (!isNaN(s?.[rowNegativeValue]) && s?.[rowNegativeValue] < 0) {
            className = "row-negative-value";
          }
          return <tr key={si} className={className}>{renderRow(subColumns, s)}</tr>
        })
      }
    </>
  )
}

export const renderRow = (columns, row, setSubData) => {
  return (
    columns.map(c => {
      let expandButton;
      if (c.generateSubTable) {
        expandButton = <ExpandButton setSubData={setSubData} col={c} row={row} />
      }
      if (c.render) return <td key={c.title} align={c.align}>{expandButton}{c.render(row)}</td>;
      if (c.field) return <td key={c.title} align={c.align}>{expandButton}{row?.[c.field]}</td>
      return <td key={c.title} align={c.align}></td>
    })
  )
}

const ExpandButton = ({
  setSubData,
  col,
  row,
}) => {
  const [loading, setLoading] = React.useState(false);
  const [ico, setIco] = React.useState("add")
  const onClick = () => {
    if (ico === "add") {
      setLoading(true)
      let searchObject = {...col?.searchObject};
      if (col.searchBy?.length > 0) {
        for (const field of col.searchBy) {
          searchObject[field] = row[field];
        }
      } else {
        searchObject = {date: row.date};
      }
      col.generateSubTable(searchObject).then((res) => {
        setIco("remove")
        setSubData(res?.data || [])
      }).catch((err) => {
        console.error(err);
        toast.error("Có lỗi xảy ra, vui lòng thử lại sau")
      })
      .finally(() => {
        setLoading(false)
      })
    } else {
      setIco("add")
      setSubData([])
    }
  }
  return (
    <IconButton onClick={onClick} disabled={loading} className="p-4">
      <Icon>{ico}</Icon>
    </IconButton>
  )
}