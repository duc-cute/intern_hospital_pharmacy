import React from "react";
import {
  Button,
  Collapse,
  DialogActions,
  Grid,
  IconButton,
} from "@material-ui/core";
import { Add, Block, FilterList, Search } from "@material-ui/icons";
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

function StockInSearch() {
  const { t } = useTranslation();
  const { stockInStore } = useStore();
  const isMobile = useMediaQuery(theme => theme.breakpoints.down("sm"));
  const [open, setOpen] = React.useState(false);

  const {
    searchObject,
    handleSetSearchObject,
    getListStockIn,
    handleResetSearchObject,
  } = stockInStore;

  function handleFormSubmit(value) {
    handleSetSearchObject({ ...value });
    getListStockIn();
  }

  return (
    <Formik
      initialValues={searchObject}
      onSubmit={handleFormSubmit}
    >
      <Form autoComplete="off" className="mb-16">
        <Grid container spacing={2} alignItems="center">
          <Grid item md={6} xs={4}>
            <Button
              className="mt-14 btn btn-primary d-inline-flex"
              startIcon={<Add />}
              component={NavLink}
              to={Config.ROOT_PATH + "manage/stock-in/form"}
            >
              Nhập kho
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
              className="btn btn-outlined d-inline-flex"
              startIcon={<FilterList className="py-3" />}
              onClick={() => setOpen(prev => !prev)}
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
                searchObject={{ noParent: true }}
              />
            </Grid>

            <Grid item md={3} sm={4} xs={12}>
              <GlobitsSelectInput
                label="Loại nhập kho"
                name="kind"
                options={LocalConstants.ListStoreTransactionKindIn}
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
              <GlobitsCheckBox label="Hàng đang chuyển đến" name="notComplete" />
            </Grid>

            <Grid item xs={12}>
              <DialogActions className="dialog-footer-new">
                <Grid container justifyContent="flex-end">
                  <Grid item md="auto" xs={6}>
                    <Button
                      type="reset"
                      startIcon={<Block />}
                      className="mr-12 btn btn-secondary d-inline-flex"
                      onClick={() => {
                        handleResetSearchObject();
                        getListStockIn();
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
    </Formik>
  );
};

export default observer(StockInSearch)