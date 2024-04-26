import React from "react";
import Pagination from "./Pagination";
import { getIn } from "formik";
import { useTranslation } from "react-i18next";

const TableComponent = ({
  data,
  columns,
  onRowClick,
  titleNodata,
  className,
  dataPagination,
  showOrdinalNumbers,
  finalRow,
  renderRow,
}) => {
  const pageIndex = dataPagination?.pageIndex || 0;
  const pageSize = dataPagination?.pageSize || 0;
  const totalColumns = showOrdinalNumbers
    ? columns?.length + 1
    : columns?.length;
  const align = columns[0]?.align || "left";
  const { t } = useTranslation();
  if (!titleNodata) titleNodata = t("general.emptyDataMessageTable");

  return (
    <div className={`${className} table-container`}>
      <div className={`table-root`}>
        <table className="table-container">
          <thead>
            <tr className="row-table-header">
              {showOrdinalNumbers && <th align={align}>STT</th>}
              {columns.map((item, index) => (
                <th
                  key={index}
                  align={item?.align || "left"}
                  width={item?.width}
                  style={{ wordWrap: "break-word" }}
                >
                  {item.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data && data?.length > 0 ? (
              <>
                {data?.map((row, index) => {
                  if (renderRow) {
                    const rowProps = {
                      data: row,
                      columns: columns,
                      rowIndex: index,
                      
                    }
                    return renderRow(rowProps)
                  }
                  return (
                    <tr
                      key={index}
                      className={`row-table-body ${
                        onRowClick ? "row-selection" : ""
                      }`}
                      onClick={onRowClick ? () => onRowClick(row) : undefined}
                    >
                      {showOrdinalNumbers && (
                        <td align={align}>
                          <p className={`${align === "left" ? "ml-1" : ""}`}>
                            {(pageIndex - 1) * pageSize + index + 1}
                          </p>
                        </td>
                      )}
                      {columns.map((item, number) => (
                        <td
                          key={number}
                          align={item?.align}
                          width={item?.width}
                          style={{ wordWrap: "break-word" }}
                        >
                          {item?.render
                            ? item.render(row, index)
                            : getIn(row, item?.field)}
                        </td>
                      ))}
                    </tr>
                  );
                })}
                {finalRow && (
                  <tr className={"w-100 bg-green-black"}>
                    <td colSpan={totalColumns || 0} align="right">
                      <h5>
                        <strong>{finalRow}</strong>
                      </h5>
                    </td>
                  </tr>
                )}
              </>
            ) : (
              <tr className={"row-table-body"}>
                <td colSpan={totalColumns || 0} align="center">
                  {titleNodata}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {Boolean(dataPagination) && <Pagination {...dataPagination} />}
    </div>
  );
};

export default TableComponent;
