import React from "react";
import GlobitsTable from "../../common/GlobitsTable";
import { useStore } from "../../stores";
import { useTranslation } from "react-i18next";
import { IconButton, Icon } from "@material-ui/core";
import { observer } from "mobx-react";
import { getGender } from "app/common/Constant/LocalFunction";

export default observer(function List() {
  const { staffStore } = useStore();
  const { t } = useTranslation();

  const {
    pageStaff,
    searchStaff,
    handleOpenConfirmDelete,
    handleChangeFormSearch,
    handleOpenForm
  } = staffStore;

  let columns = [
    { title: "Mã nhân viên", field: "staffCode" },
    { title: "Tên nhân viên", field: "displayName" },
    { title: "Giới tính", field: "gender", render: (item) => getGender(item?.gender) },
    { title: "Số điện thoại", field: "phoneNumber" },
    { title: "Số CMND/CCCD", field: "idNumber" },
    { title: "Email", field: "email" },
    { title: "Tài khoản", field: "user.username" },

    {
      title: t("general.action"),
      render: (rowData) => (
        <>
          <IconButton size="small" onClick={() => handleOpenForm(rowData?.id)}>
            <Icon fontSize="small" color="primary">
              edit
            </Icon>
          </IconButton>
          <IconButton size="small" onClick={() => handleOpenConfirmDelete(rowData.id)}>
            <Icon fontSize="small" color="error">
              delete
            </Icon>
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <GlobitsTable
      data={pageStaff?.content || []}
      columns={columns}
      totalPages={pageStaff?.totalPages}
      handleChangePage={(_, pageIndex) => handleChangeFormSearch({ pageIndex })}
      setRowsPerPage={e => handleChangeFormSearch({ pageSize: e.target.value })}
      pageSize={searchStaff?.pageSize}
      pageSizeOption={[1, 2, 3, 5, 10, 25]}
      totalElements={pageStaff?.totalElements}
      page={searchStaff?.pageIndex}
      doubleSidePagination={false}
    />
  );
});
