import { Icon, IconButton } from "@material-ui/core";
import { formatPriceVND } from "app/common/Constant/LocalFunction";
import GlobitsTable from "app/common/GlobitsTable";
import { useStore } from "app/stores";
import { observer } from "mobx-react"
import React from "react"
import { useTranslation } from "react-i18next";

const MaterialButton = (props) => {
  const { item, onSelect } = props;
  return (
    <div>
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
    </div>
  );
}

const DeliveryPartnerList = () => {
  const { t } = useTranslation();
  const {
    delPartnerList,
    totalPages,
    totalElements,
    rowsPerPage,
    page,
    handleChangePage,
    setRowsPerPage,
    handleDelete,
    handleEditDelPartner,
    handleSelectListDelPartner,
  } = useStore().DeliveryPartnerStore;

  let columns = [
    { title: t("deliveryPartner.name"), field: "name", align: "center", width: "150" },
    {
      title: t("deliveryPartner.code"),
      field: "code",
      align: "center",
      width: "150",
    },
    {
      title: t("deliveryPartner.shippingCost"),
      field: "shippingCost",
      align: "center",
      width: "150",
      render: (rowData) => (
        <>{formatPriceVND(rowData?.shippingCost)}</>
      )
    },
    {
      title: t("deliveryPartner.address"),
      field: "address",
      align: "center",
      width: "150",
    },
    {
      title: t("general.action"),
      align: "center",
      render: (rowData) => (
        <MaterialButton
          item={rowData}
          onSelect={(rowData, method) => {
            if (method === 0) {
              handleEditDelPartner(rowData.id);
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
      data={delPartnerList}
      handleSelectList={handleSelectListDelPartner}
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

export default observer(DeliveryPartnerList);