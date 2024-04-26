import React from "react";
import { Icon, IconButton } from "@material-ui/core";
import GlobitsTable from "app/common/GlobitsTable";
import { useStore } from "app/stores";
import { observer } from "mobx-react"
import { useTranslation } from "react-i18next";

const MaterialButton = (props) => {
  const { item, onSelect } = props;
  return (
    <>
      <IconButton size="small" onClick={() => onSelect(item, 0)}>
        <Icon fontSize="small" color="primary">
          edit
        </Icon>
      </IconButton>
      <IconButton size="small" onClick={() => onSelect(item, 1)}>
        <Icon fontSize="small" color="error">
          delete
        </Icon>
      </IconButton>
    </>
  );
}

const DeliveryPlaceList = () => {
  const { t } = useTranslation();
  const {
    delPlaceList,
    totalPages,
    totalElements,
    rowsPerPage,
    page,
    handleChangePage,
    setRowsPerPage,
    handleDelete,
    handleEditDelPlace,
    handleSelectListDelPlace,
  } = useStore().DeliveryPlaceStore;

  let columns = [
    { title: t("deliveryPlace.name"), field: "name", align: "center", width: "150" },
    {
      title: t("deliveryPlace.code"),
      field: "code",
      align: "center",
      width: "150",
    },
    {
      title: t("deliveryPlace.administrativeUnit"), field: "administrativeUnit", align: "left", width: "150", render: (rowData) => {
        const locations = [
          rowData?.administrativeUnit?.parent?.parent?.name ?? '',
          rowData?.administrativeUnit?.parent?.name ?? '',
          rowData?.administrativeUnit?.name ?? ''
        ];
        return locations.filter(Boolean).join(', ')
      }
    },
    {
      title: t("general.action"),
      align: "center",
      render: (rowData) => (
        <MaterialButton
          item={rowData}
          onSelect={(rowData, method) => {
            if (method === 0) {
              handleEditDelPlace(rowData.id);
            } else if (method === 1) {
              handleDelete(rowData.id);
            } else {
              alert("Call Selected Here:" + rowData.id);
            }
          }}
        />
      ),
    },
  ]

  return (
    <GlobitsTable
      selection
      data={delPlaceList}
      handleSelectList={handleSelectListDelPlace}
      columns={columns}
      totalPages={totalPages}
      handleChangePage={handleChangePage}
      setRowsPerPage={setRowsPerPage}
      pageSize={rowsPerPage}
      pageSizeOption={[1, 2, 3, 5, 10, 25]}
      totalElements={totalElements}
      page={page}
    />
  )
}

export default observer(DeliveryPlaceList)