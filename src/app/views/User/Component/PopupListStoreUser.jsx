/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { getAllChildByParentId } from "app/views/AdministrativeUnit/AdministrativeUnitService";
import GlobitsAutocomplete from "app/common/form/GlobitsAutocomplete";
import GlobitsTextField from "app/common/form/GlobitsTextField";
import BlockIcon from "@material-ui/icons/Block";
import SaveIcon from "@material-ui/icons/Save";
import SearchIcon from "@material-ui/icons/Search";
import { useStore } from "app/stores";
import { Grid, Button, Checkbox, DialogActions, DialogContent } from "@material-ui/core";
import { Form, Formik, useFormikContext } from 'formik';
import GlobitsTable from 'app/common/GlobitsTable';
import { observer } from 'mobx-react';
import { saveStoreManagement } from '../UserService';
import { toast } from 'react-toastify';
import GlobitsPopup from 'app/common/GlobitsPopup';

function PopupListStoreUser({ handleClose, optionRegion }) {
  const { values: user, setFieldValue } = useFormikContext();

  const { searchStore, pageStore, handleChangeFormSearch, resetStore } = useStore().storeStore;
  const { t } = useTranslation();

  const [optionProvince, setOptionProvince] = useState([]);
  const [optionDistrict, setOptionDistrict] = useState([])
  const [optionWard, setOptionWard] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    handleChangeFormSearch({ ...searchStore, excludeUserId: user.id + '' });
    return () => resetStore();
  }, []);

  function loadOptionsByParentId(id, setOption) {
    getAllChildByParentId(id).then(({ data }) => setOption(data))
  }

  function handleSelectItem(value) {
    const selectedIndex = selected.findIndex(item => item.storeId === value.storeId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, value);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  }

  function handleSubmitFormStore(values) {
    const newSearchObj = { ...searchStore }

    if (values.ward) {
      newSearchObj.administrativeUnitId = values.ward.id;
    } else if (values.district) {
      newSearchObj.administrativeUnitId = values.district.id;
    } else if (values.province) {
      newSearchObj.administrativeUnitId = values.province.id;
    }

    handleChangeFormSearch(newSearchObj)
  }

  return (
    <GlobitsPopup
      open={true}
      titleHeader='Danh Sách Kho'
      handleClose={handleClose}
      size='md'
      id="store-list"
    >
      <Formik
        initialValues={searchStore}
        onSubmit={handleSubmitFormStore}
      >
        {({ setValues, values }) => (
          <Form className="dialog-form">
            <DialogContent className="dialog-body">
              <Grid container spacing={2} className="d-inline-flex">
                <Grid item xs={3}>
                  <GlobitsAutocomplete
                    name={`region`}
                    label="Miền"
                    options={optionRegion}
                    handleChange={(_, value) => {
                      if (value) {
                        loadOptionsByParentId(value.id, setOptionProvince);
                      }
                      setValues({ ...values, region: value, province: null, district: null, ward: null });
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <GlobitsAutocomplete
                    name={`province`}
                    label="Tỉnh"
                    options={optionProvince}
                    handleChange={(_, value) => {
                      if (value) {
                        loadOptionsByParentId(value.id, setOptionDistrict);
                      }
                      setValues({ ...values, province: value, district: null, ward: null })
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <GlobitsAutocomplete
                    name={`district`}
                    label="Huyện"
                    options={optionDistrict}
                    handleChange={(_, value) => {
                      if (value) {
                        loadOptionsByParentId(value.id, setOptionWard);
                      }
                      setValues({ ...values, district: value, ward: null })
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <GlobitsAutocomplete name={`ward`} label="Phường/Xã" options={optionWard} />
                </Grid>
                <Grid item xs={7}>
                  <GlobitsTextField label="Từ khóa tìm kiếm" name="keyword" notDelay />
                </Grid>
                <Grid item xs={2}>
                  <Button type="submit"   startIcon={<SearchIcon />}  className="btn-orange px-8 mt-18">
                    Tìm kiếm
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <GlobitsTable
                    data={pageStore?.content}
                    handleChangePage={(_, pageIndex) => handleChangeFormSearch({ pageIndex })}
                    setRowsPerPage={({ target }) => handleChangeFormSearch({ pageSize: target.value })}
                    totalPages={pageStore?.totalPages}
                    totalElements={pageStore?.totalElements}
                    pageSize={searchStore?.pageSize}
                    page={searchStore?.pageIndex}
                    maxBodyHeight='440px' searchObj
                    rowStyle={(rowData, index) => ({
                      backgroundColor: index % 2 === 1 ? 'rgb(237, 245, 251)' : '#FFF',
                    })}
                    columns={[{
                      title: "Chọn", field: "check",
                      render: (rowData) => {
                        const checked = selected.some(e => e.storeId === rowData.id);
                        return (
                          <Checkbox checked={checked} name="checked" color="primary"
                            onClick={() => handleSelectItem({
                              ...rowData,
                              storeName: rowData.name,
                              storeCode: rowData.code,
                              storeId: rowData.id
                            })}
                          />
                        )
                      }
                    },
                    { title: "Mã", field: "code", },
                    { title: 'Tên', field: "name", },
                    ]}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <div className="flex flex-space-between flex-middle">
                <Button
                  startIcon={<BlockIcon />}
                  variant="contained"
                  className="mr-12 btn btn-secondary d-inline-flex"
                  color="secondary"
                  onClick={() => handleClose()}
                >
                  {t("general.button.cancel")}
                </Button>
                <Button
                  startIcon={<SaveIcon />}
                  className="mr-0 btn btn-primary d-inline-flex"
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    saveStoreManagement({ user: user, listStore: selected, })
                      .then((response) => {
                        handleClose();
                        if (response?.data?.length > 0) {
                          if (user?.storeManagement?.length > 0) {
                            setFieldValue("storeManagement", [...response?.data, ...user?.storeManagement]);
                          } else {
                            setFieldValue("storeManagement", [...response.data]);
                          }
                        }
                      }).catch((e) => {
                        console.error("🔥 ~ .then ~ e:", e)
                        toast.error('Có lỗi xảy ra, vui lòng thử lại sau')
                      })
                  }}
                >
                  {t("general.button.save")}
                </Button>
              </div>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </GlobitsPopup>
  )
}

export default memo(observer(PopupListStoreUser))