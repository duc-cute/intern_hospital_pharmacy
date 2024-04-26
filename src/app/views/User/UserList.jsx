import React from "react";
import GlobitsTable from "../../common/GlobitsTable";
import { useStore } from "../../stores";
import { useTranslation } from "react-i18next";
import { IconButton, Icon } from "@material-ui/core";
import { observer } from "mobx-react";

function MaterialButton(props) {
  const { item } = props;
  return (
    <div>
      <IconButton size="small" onClick={() => props.onSelect(item, 0)}>
        <Icon fontSize="small" color="primary">
          edit
        </Icon>
      </IconButton>
      <IconButton size="small" onClick={() => props.onSelect(item, 1)}>
        <Icon fontSize="small" color="error">
          delete
        </Icon>
      </IconButton>
    </div>
  );
}

export default observer(function List() {
  const { userStore } = useStore();
  const { t } = useTranslation();

  const {
    userList,
    totalPages,
    totalElements,
    rowsPerPage,
    page,
    handleChangePage,
    setRowsPerPage,
    handleDeleteUser,
    handleOpenFormUser
  } = userStore;

  let columns = [

    { title: t("user.username"), field: "username", align: "left", width: "150" },
    { title: t("user.display_name"), field: "person.displayName", width: "150" },
    { title: t("Email"), field: "email", align: "left", width: "150" },
    {
      title: t("general.action"),
      render: (rowData) => (
        <MaterialButton
          item={rowData}
          onSelect={(rowData, method) => {
            if (method === 0) {
              handleOpenFormUser(rowData.id);
            } else if (method === 1) {
              handleDeleteUser(rowData);
            } else {
              alert("Call Selected Here:" + rowData.id);
            }
          }}
        />
      ),
    },

  ];
  return (
    <GlobitsTable
      doubleSidePagination={false}
      data={userList ? userList : []}
      columns={columns}
      totalPages={totalPages}
      handleChangePage={handleChangePage}
      setRowsPerPage={setRowsPerPage}
      pageSize={rowsPerPage}
      totalElements={totalElements}
      page={page}
    />
  );
})
