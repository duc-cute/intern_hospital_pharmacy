import React from "react";
import MaterialTable from "material-table";
import GlobitsPagination from "./GlobitsPagination";
import { useTranslation } from "react-i18next";

export default function GlobitsTable(props) {
  const { t } = useTranslation();
  const {
    data,
    columns,
    totalPages,
    handleChangePage,
    setRowsPerPage,
    pageSize,
    pageSizeOption = [1, 2, 3, 5, 10, 25],
    totalElements,
    page,
    selection,
    parentChildData,
    handleSelectList,
    rowStyle,
    noPagination,
    maxBodyHeight,
    onRowClick,
    options,
    doubleSidePagination = true,
    className="tablePrimaryStyle",
    ...otherProps
  } = props;

  return (
    <div className={className} >
      {doubleSidePagination && !noPagination &&
        <GlobitsPagination
          totalPages={totalPages}
          handleChangePage={handleChangePage}
          setRowsPerPage={setRowsPerPage}
          pageSize={pageSize}
          pageSizeOption={pageSizeOption}
          totalElements={totalElements}
          page={page}
        />}
      <MaterialTable
        {...otherProps}
        data={data}
        columns={columns}
        parentChildData={parentChildData}
        options={{
          selection: selection ? true : false,
          actionsColumnIndex: -1,
          paging: false,
          search: false,
          toolbar: false,
          draggable: false,
          headerStyle: {
            paddingLeft: "15px",
            paddingRight: "15px",
            position: "sticky",
            fontWeight: "700",
            fontSize: "14px",
            lineHeight: "24px",
            color: "rgba(0, 0, 0, 0.87)",
          },
        }}
        onSelectionChange={(rows) => {
          handleSelectList(rows);
        }}
        localization={{
          body: {
            emptyDataSourceMessage: `${t("general.emptyDataMessageTable")}`,
          },
        }}>

      </MaterialTable>
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
  );
}
