/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, memo } from 'react';
import { useTranslation } from 'react-i18next';
import GlobitsTextField from "app/common/form/GlobitsTextField";
import BlockIcon from "@material-ui/icons/Block";
import SaveIcon from "@material-ui/icons/Save";
import SearchIcon from "@material-ui/icons/Search";
import { useStore } from "app/stores";
import { Grid, Button, Checkbox, DialogActions, DialogContent } from "@material-ui/core";
import { Form, Formik, useFormikContext } from 'formik';
import GlobitsTable from 'app/common/GlobitsTable';
import { observer } from 'mobx-react';
import { saveListStoreOrganizationByUser } from '../UserService';
import { toast } from 'react-toastify';
import GlobitsPopup from 'app/common/GlobitsPopup';
import LocalConstants from 'app/LocalConstants';

function PopupListStoreUser({ handleClose }) {
  const { values: user, setFieldValue } = useFormikContext();

  const { 
    storeOrganizationList,
    totalPages,
    totalElements,
    rowsPerPage,
    page,
    handleChangePage,
    setRowsPerPage, 
    keyword,
    updatePageData, 
    resetStoreOrganizationStore 
  } = useStore().storeOrganizationStore;
  const { t } = useTranslation();
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    updatePageData({ excludeUserId: user.id });
    return () => resetStoreOrganizationStore();
  }, []);

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

  return (
    <GlobitsPopup
      open={true}
      titleHeader='Danh Sách Cơ sở sử dụng dịch vụ'
      handleClose={handleClose}
      size='md'
      id="store-organization-list"
    >
      <Formik
        initialValues={{keyword}}
        onSubmit={updatePageData}
      >
        {({ setValues, values }) => (
          <Form className="dialog-form">
            <DialogContent className="dialog-body">
              <Grid container spacing={2} className="d-inline-flex">
                <Grid item xs={7}>
                  <GlobitsTextField label="Từ khóa tìm kiếm" name="keyword" notDelay />
                </Grid>
                <Grid item xs={2}>
                  <Button type="submit" startIcon={<SearchIcon />} className="btn-orange px-8 mt-18">
                    Tìm kiếm
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <GlobitsTable
                    data={storeOrganizationList || []}
                    handleChangePage={handleChangePage}
                    setRowsPerPage={setRowsPerPage}
                    totalPages={totalPages}
                    totalElements={totalElements}
                    pageSize={rowsPerPage}
                    page={page}
                    maxBodyHeight='440px' searchObj
                    rowStyle={(rowData, index) => ({
                      backgroundColor: index % 2 === 1 ? 'rgb(237, 245, 251)' : '#FFF',
                    })}
                    columns={
                      [
                        {
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
                        {
                          title: "Loại dịch vụ",
                          field: 'orgProductType',
                          sorting: false,
                          render: row => {
                            return LocalConstants.ORG_PRODUCT_TYPE.find(f => f.value === row?.orgProductType)?.name
                          }
                        }
                      ]
                    }
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
                    saveListStoreOrganizationByUser({ user: user, listStoreOrganization: selected, })
                      .then((response) => {
                        handleClose();
                        if (response?.data?.length > 0) {
                          if (user?.organizationStoreUser?.length > 0) {
                            setFieldValue("organizationStoreUser", [...response?.data, ...user?.organizationStoreUser]);
                          } else {
                            setFieldValue("organizationStoreUser", [...response.data]);
                          }
                        }
                      }).catch((e) => {
                        console.error(e)
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