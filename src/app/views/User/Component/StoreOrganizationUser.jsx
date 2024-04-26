import { Grid, Button, IconButton, Icon } from "@material-ui/core";
import { observer } from "mobx-react";
import React, { useState } from "react";
import Config from "app/common/GlobitsConfigConst";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import AddIcon from "@material-ui/icons/Add";
import { useFormikContext } from "formik";
import GlobitsTable from "app/common/GlobitsTable";
import { deleteStoreOrganizationUser } from "../UserService";
import { toast } from "react-toastify";
import LocalConstants from "app/LocalConstants";
import PopupListStoreOrganizationUser from "./PopupListStoreOrganizationUser";

function MaterialButton(props) {
  const { item } = props;
  return (
    <IconButton size="small" onClick={() => props.onSelect(item, 1)}>
      <Icon fontSize="small" color="error">
        delete
      </Icon>
    </IconButton>
  );
}

export default observer(function StoreOrganizationUser() {
  const { values, setFieldValue } = useFormikContext();

  const { t } = useTranslation();
  const [openCreatePopup, setOpenCreatePopup] = useState(false);

  let columns = [
    {
      title: t("general.action"),
      render: (rowData) => (
        <MaterialButton
          item={rowData}
          onSelect={(rowData, method) => {
            if (method === 0) {
            } else if (method === 1) {
              deleteStoreOrganizationUser(rowData.id).then(() => {
                setFieldValue("organizationStoreUser", values?.organizationStoreUser?.filter((e) => e.id !== rowData.id));
              }).catch(() => {
                toast.error('Xóa không thành công!')
              })
            } else {
              alert("Call Selected Here:" + rowData.id);
            }
          }}
        />
      ),
      sorting: false,
      ...Config.tableCellConfig,
    },
    {
      title: "Mã cơ sở",
      field: 'storeOrganization.code',
      sorting: false,
      ...Config.tableCellConfig,
    },
    {
      title: "Tên cơ sở",
      field: 'storeOrganization.name',
      sorting: false,
      ...Config.tableCellConfig,
    },
    {
      title: "Loại dịch vụ",
      field: 'storeOrganization.orgProductType',
      sorting: false,
      render: row => {
        return LocalConstants.ORG_PRODUCT_TYPE.find(f => f.value === row?.storeOrganization?.orgProductType)?.name
      }
    }
  ];

  return (
    <Grid container spacing={2} className="mt-4">
      <Grid item xs={12}>
        <Button
          className="btn btn-secondary d-inline-flex"
          startIcon={<AddIcon />}
          variant="contained"
          onClick={() => setOpenCreatePopup(true)}
        >
          Quản lý cơ sở kinh doanh
        </Button>
      </Grid>
      <Grid item xs={12}>
        <GlobitsTable
          data={values?.organizationStoreUser}
          columns={columns}
          noPagination={true}
        />
      </Grid>
      {openCreatePopup && (
        <PopupListStoreOrganizationUser
          handleClose={() => setOpenCreatePopup(false)}
        />
      )}
    </Grid>
  );
});