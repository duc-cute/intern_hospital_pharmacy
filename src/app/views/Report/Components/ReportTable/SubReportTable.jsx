import React from 'react'
import { renderRow } from './index'

/**
 * Component SubReportTable
 * @param data - `data` props is an array contains rows of table, default []
 * @param columns -  `columns` props is an array contains columns of table, default []
 */
export default function SubReportTable({data, columns, rowNegativeValue}) {
  let className = "report-sub-table";
  return (
    <table className={className}>
      <thead>
        <tr>
          {columns.map(c => <th key={c.title} align={c.align}>{c.title}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.map((d, di) => {
          let className;
          if (!isNaN(d?.[rowNegativeValue]) && d?.[rowNegativeValue] < 0) {
            className = "row-negative-value";
          }
          return <tr key={di} className={className}>{renderRow(columns, d)}</tr>
        })}
      </tbody>
    </table>
  )
}
