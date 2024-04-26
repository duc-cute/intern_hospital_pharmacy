import { Grid, Button, IconButton, Icon, makeStyles, Checkbox } from "@material-ui/core";
import { observer } from "mobx-react";
import React, { useState } from "react";
import Config from "../../../common/GlobitsConfigConst";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import AddIcon from "@material-ui/icons/Add";
import { useFormikContext } from "formik";
import GlobitsTable from "app/common/GlobitsTable";
import { deleteStoreUser, updateEditAble, updateEditAbleAll, updateViewAble, updateViewAbleAll } from "../UserService";
import { toast } from "react-toastify";
import PopupListStoreUser from "./PopupListStoreUser";
import { useEffect } from "react";
import { getAllByLevel } from "app/views/AdministrativeUnit/AdministrativeUnitService";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "12px",
  },
}));

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

export default observer(function UserStoreManagement() {
  const { values, setFieldValue } = useFormikContext();

  const { t } = useTranslation();
  const classes = useStyles();
  const [openCreatePopup, setOpenCreatePopup] = useState(false);
  const [optionRegion, setOptionRegion] = useState([]);

  useEffect(() => {
    getAllByLevel(2).then(({ data }) => setOptionRegion(data));
  }, []);

  function handleViewAble(rowData, name, api) {
    rowData[name] = !rowData[name];

    api(rowData).then(() => {
      setFieldValue(`storeManagement[${values?.storeManagement?.findIndex(e => e.id === rowData.id)}]`, rowData)
    }).catch((res) => toast.error('Đã có lỗi xảy ra!'));
  }

  const handleChangeAll = (name, status) => {
    let newData = values?.storeManagement;

    if (name === "editAble" && newData.length > 0) {
      updateEditAbleAll({ listUserStore: newData, editAble: status }).then((res) => {
        setFieldValue(`storeManagement`, newData.map((item, index) => ({ ...item, editAble: status })))
      });
    }

    if (name === "viewAble" && newData.length > 0) {
      updateViewAbleAll({ listUserStore: newData, viewAble: status }).then((res) => {
        setFieldValue(`storeManagement`, newData.map((item, index) => ({ ...item, viewAble: status })))
      });
    }
  }

  let columns = [
    {
      title: t("general.action"),
      render: (rowData) => (
        <MaterialButton
          item={rowData}
          onSelect={(rowData, method) => {
            if (method === 0) {
            } else if (method === 1) {
              deleteStoreUser(rowData.id).then(() => {
                setFieldValue("storeManagement", values?.storeManagement?.filter((e) => e.id !== rowData.id));
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
      title: "Mã kho",
      field: 'storeCode',
      sorting: false,
      ...Config.tableCellConfig,
    },
    {
      title: "Tên kho",
      field: 'storeName',
      sorting: false,
      ...Config.tableCellConfig,
    },
    {
      title: (
        <span style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <Checkbox
            color="primary"
            disabled={values?.storeManagement?.length === 0}
            checked={values?.storeManagement?.length > 0 && !values?.storeManagement?.some(e => !e.viewAble)}
            onClick={(e) => handleChangeAll('viewAble', e.target.checked)}
          />
          <span>
            Xem dữ liệu
          </span>
        </span>
      ),
      render: (rowData, e2) => (
        <Checkbox color="primary"
          checked={rowData.viewAble ? true : false}
          onClick={() => handleViewAble(rowData, 'viewAble', updateViewAble)}
        />
      ),
      sorting: false,
      ...Config.tableCellConfig,
    },
    {
      title: (
        <span style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <Checkbox
            color="primary"
            disabled={values?.storeManagement?.length === 0}
            checked={values?.storeManagement?.length > 0 && !values?.storeManagement?.some(e => !e.editAble)}
            onClick={(e) => handleChangeAll('editAble', e.target.checked)}
          />
          <span>
            Sửa dữ liệu
          </span>
        </span>
      ),
      render: (rowData) => (
        <Checkbox color="primary"
          checked={rowData.editAble ? true : false}
          onClick={() => handleViewAble(rowData, 'editAble', updateEditAble)}
        />
      ),
      sorting: false,
      ...Config.tableCellConfig,
    },
  ];

  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item md={12} sm={12} xs={12}>
        <Grid container spacing={3}>
          <Grid item md={12} sm={12} xs={12}>
            <Button
              className="mb-16 mr-16 btn btn-secondary d-inline-flex"
              startIcon={<AddIcon />}
              variant="contained"
              onClick={() => setOpenCreatePopup(true)}
            >
              Quản lý kho
            </Button>
          </Grid>
          <Grid item xs={12}>
            <GlobitsTable
              data={values?.storeManagement}
              columns={columns}
              noPagination={true}
            />
          </Grid>
        </Grid>
      </Grid>
      {openCreatePopup && (
        <PopupListStoreUser
          handleClose={() => setOpenCreatePopup(false)}
          optionRegion={optionRegion}
        />
      )}
    </Grid>
  );
});