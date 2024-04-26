import { getIn } from 'formik';
import React from 'react'
import { useTranslation } from 'react-i18next';
import GlobitsPagination from '../../GlobitsPagination';
import { IconButton } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';
import { toast } from 'react-toastify';

export default function GlobitsTreeViewTable({
  data,
  columns,
  onRowClick,
  titleNodata,
  className,
  showOrdinalNumbers,
  finalRow,
  renderRow,
  getChildrenApi,
  getChildrenSearchObject,
  totalPages,
  handleChangePage,
  setRowsPerPage,
  pageSize,
  pageSizeOption = [1, 2, 3, 5, 10, 25],
  totalElements,
  page,
  noPagination,
  doubleSidePagination = true,
}) {
  const totalColumns = showOrdinalNumbers
    ? columns?.length + 1
    : columns?.length;
  const align = columns[0]?.align || "left";
  const { t } = useTranslation();
  if (!titleNodata) titleNodata = t("general.emptyDataMessageTable");

  return (
    <div className={`${className} table-container`}>
      {doubleSidePagination && !noPagination &&
        <GlobitsPagination
          totalPages={totalPages}
          handleChangePage={handleChangePage}
          setRowsPerPage={setRowsPerPage}
          pageSize={pageSize}
          pageSizeOption={pageSizeOption}
          totalElements={totalElements}
          page={page}
        />
      }
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
                  const rowProps = {
                    data: row,
                    columns,
                    rowIndex: index,
                    onRowClick,
                    pageIndex: page,
                    pageSize,
                    showOrdinalNumbers,
                    align,
                    getChildrenApi,
                    getChildrenSearchObject,
                  }
                  if (renderRow) {
                    return renderRow(rowProps)
                  }
                  return <RowAccordion key={index} {...rowProps} />
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
      {!noPagination &&
        <GlobitsPagination
          totalPages={totalPages}
          handleChangePage={handleChangePage}
          setRowsPerPage={setRowsPerPage}
          pageSize={pageSize}
          pageSizeOption={pageSizeOption}
          totalElements={totalElements}
          page={page}
        />
      }
    </div>
  )
}

const RowAccordion = (rowProps) => {
  const {
    data,
    rowIndex,
    columns,
    onRowClick,
    showOrdinalNumbers,
    align,
    pageIndex,
    pageSize,
    getChildrenApi,
    getChildrenSearchObject,
    level = 0,
    className
  } = rowProps;

  React.useEffect(() => {
    setSubData([])
    setOpen(false)
  }, [data])

  const [subData, setSubData] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const handleOpen = async () => {
    try {
      setOpen(!open);
      if (!open) {
        if (getChildrenApi) {
          const res = await getChildrenApi({...getChildrenSearchObject, parentId: data?.id})
          setSubData(res?.data || []);
        }
      } else {
        setSubData([])
      }
    } catch (err) {
      console.error(err);
      toast.error("Có lỗi xảy ra, vui lòng thử lại")
    }
  }

  return (
    <>
      <tr
        className={`row-table-body ${
          onRowClick ? "row-selection" : ""
        } ${className}`}
        onClick={onRowClick ? () => onRowClick(data) : undefined}
      >
        {showOrdinalNumbers && (
          <td align={align}>
            <p className={`${align === "left" ? "ml-1" : ""}`}>
              {(pageIndex - 1) * pageSize + rowIndex + 1}
            </p>
          </td>
        )}
        {columns.map((item, number) => {
          const renderCell = item?.render ? item.render(data, rowIndex) : getIn(data, item?.field)
          let pl = 0;
          if (number === 0 && level > 0) {
            pl = level * 16
          }
          if (number === 0) {
            return (
              <td
                key={number}
                align={item?.align}
                width={item?.width}
                style={{ wordWrap: pl > 0 ? "auto" : "break-word" }}
              >
                <span style={{ paddingLeft: pl }}>
                  <IconButton
                    onClick={handleOpen}
                    className="p-4"
                  >
                    {open ? <Remove /> : <Add />}
                  </IconButton>
                  {renderCell}
                </span>
              </td>
            )
          }
          return (
            <td
              key={number}
              align={item?.align}
              width={item?.width}
              style={{ wordWrap: pl > 0 ? "auto" : "break-word" }}
            >
              {renderCell}
            </td>
          )
        })}
      </tr>
      {subData?.length > 0 &&
        subData?.map((rowData, index) => {
          const childrenRowProps = {
            ...rowProps,
            data: rowData,
            rowIndex: index,
            level: level + 1,
            className: "row-children"
          }
          return <RowAccordion {...childrenRowProps} />
        })
      }
    </>
  );
}
