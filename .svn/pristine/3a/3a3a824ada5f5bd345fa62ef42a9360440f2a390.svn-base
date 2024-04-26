import {
  Button,
  Collapse,
  DialogActions,
  Grid,
  IconButton,
} from "@material-ui/core";
import { Add, Block, FilterList, Search } from "@material-ui/icons";
import React from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useStore } from "app/stores";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import LocalConstants from "app/LocalConstants";
import GlobitsPagingAutocomplete from "app/common/form/GlobitsPagingAutocomplete";
import { Form, Formik } from "formik";
import GlobitsTextField from "app/common/form/GlobitsTextField";
import { pagingStores } from "../Store/StoreService";
import GlobitsSelectInput from "app/common/form/GlobitsSelectInput";
import GlobitsCheckBox from "app/common/form/GlobitsCheckBox";
import { NavLink } from "react-router-dom";
import Config from "app/appConfig";

export default observer(function StockOutSearch() {
  const { stockOutStore } = useStore();
  const { t } = useTranslation();
  const isMobile = useMediaQuery(theme => theme.breakpoints.down("sm"));
  const [open, setOpen] = React.useState(false);

  const {
    searchObject,
    handleSetSearchObject,
    getListStockOut,
    handleResetSearchObject,
  } = stockOutStore;


  function handleFormSubmit(searchObj) {
    handleSetSearchObject({ ...searchObj });
    getListStockOut();
  }

  return (
    <Formik
      initialValues={searchObject}
      onSubmit={handleFormSubmit}
    >
      {({ values, setFieldValue, resetForm }) => (
        <Form autoComplete="off" className="mb-16">
          <Grid container spacing={2} alignItems="center">
            <Grid item md={6} xs={4}>
              <Button
                className="mt-14 btn btn-primary d-inline-flex"
                startIcon={<Add />}
                component={NavLink}
                to={Config.ROOT_PATH + "manage/stock-out/form"}
              >
                Xuất kho
              </Button>
            </Grid>

            <Grid item style={{ flex: 1 }}>
              <GlobitsTextField
                placeholder={t("general.enter_search")}
                name="keyword"
                notDelay
                InputProps={{
                  endAdornment: (
                    <IconButton className="p-0" type="submit">
                      <Search />
                    </IconButton>
                  ),
                }}
              />
            </Grid>

            <Grid item xs="auto">
              <Button
                className=" btn btn-outlined d-inline-flex"
                startIcon={<FilterList style={{ padding: "3px 0" }} />}
                onClick={() => setOpen((prev) => !prev)}
              >
                {!isMobile && t("general.advancedsearch")}
              </Button>
            </Grid>
          </Grid>

          <Collapse in={open}>
            <Grid container spacing={2} className="pt-10">
              <Grid item md={3} sm={4} xs={12}>
                <GlobitsPagingAutocomplete
                  label="Kho"
                  name="store1"
                  api={pagingStores}
                  searchObject={{
                    noParent: true
                  }}
                  onChange={(_, value) => {
                    setFieldValue("store1", value);
                    setFieldValue("store2", null);
                    setFieldValue("store3", null);
                    setFieldValue("store4", null);
                  }}
                />
              </Grid>

              <Grid item md={3} sm={4} xs={12}>
                <GlobitsSelectInput
                  label="Loại xuất kho"
                  name="kind"
                  keyValue="value"
                  options={LocalConstants.ListStoreTransactionKindOut}
                />
              </Grid>

              <Grid item md={3} sm={4} xs={12}>
                <GlobitsSelectInput
                  label="Trạng thái"
                  name="status"
                  options={LocalConstants?.TRANSACTION_STATUS || []}
                />
              </Grid>

              <Grid item md={3} sm={4} xs={12}>
                <GlobitsCheckBox label="Hàng đang đi đường" name="notComplete" />
              </Grid>

              <Grid item md={3} sm={4} xs={12}>
                <GlobitsCheckBox label="Yêu cầu xuất kho" name="stockOutRequired" />
              </Grid>

              <Grid item xs={12}>
                <DialogActions className="dialog-footer-new">
                  <Grid container justifyContent="flex-end">
                    <Grid item md="auto" xs={6}>
                      <Button
                        startIcon={<Block />}
                        className="mr-12 btn btn-secondary d-inline-flex"
                        onClick={() => {
                          resetForm();
                          handleResetSearchObject();
                          getListStockOut();
                        }}
                      >
                        {!isMobile && t("general.button.deleteFilter")}
                      </Button>
                    </Grid>
                    <Grid item md="auto" xs={6}>
                      <Button
                        startIcon={<Search />}
                        className="mr-0 btn btn-primary d-inline-flex"
                        type="submit"
                      >
                        {!isMobile && t("general.button.search")}
                      </Button>
                    </Grid>
                  </Grid>
                </DialogActions>
              </Grid>
            </Grid>
          </Collapse>
        </Form>
      )}
    </Formik>
  );
});
