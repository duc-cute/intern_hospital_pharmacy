import React from "react";
import { useStore } from "../../stores";
import { useTranslation } from "react-i18next";
import GlobitsTable from "../../common/GlobitsTable";

export default function List() {
  const { roleStore } = useStore();
  const { t } = useTranslation();

  const {
    roleList,
    totalPages,
    totalElements,
    rowsPerPage,
    page,
    handleChangePage,
    setRowsPerPage,
  } = roleStore;

  let columns = [
    { title: t("role.name"), field: "name", width: "150" },
    { title: t("role.authority"), field: "authority", width: "150" },
    {
      title: t("role.createdBy"),
      field: "createdBy",
      align: "left",
      width: "150",
    },
  ];

  return (
    <GlobitsTable
      data={roleList}
      columns={columns}
      totalPages={totalPages}
      handleChangePage={handleChangePage}
      setRowsPerPage={setRowsPerPage}
      pageSize={rowsPerPage}
      pageSizeOption={[1, 2, 3, 5, 10, 25]}
      totalElements={totalElements}
      page={page}
    />
  );
}
