import {
  Button,
  Collapse,
  DialogActions,
  Grid,
  IconButton,
} from "@material-ui/core";
import { Add, Block, FilterList, Search } from "@material-ui/icons";
import React from "react";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// import GlobitsSearchInput from "app/common/GlobitsSearchInput";
import { useStore } from "app/stores";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
// import GlobitsSelectInput from "app/common/form/GlobitsSelectInput";
import LocalConstants from "app/LocalConstants";
import GlobitsPagingAutocomplete from "app/common/form/GlobitsPagingAutocomplete";
import { Form, Formik } from "formik";
import GlobitsTextField from "app/common/form/GlobitsTextField";
import { pagingAdministratives } from "../AdministrativeUnit/AdministrativeUnitService";
import GlobitsSelectInput from "app/common/form/GlobitsSelectInput";

export default observer(function BiddingPackageFilters() {
  const { biddingPackageStore } = useStore();
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    searchObject,
    handleSetSearchObject,
    handleResetSearchObject,
    handleEditBiddingPackage,
    updatePageData
  } = biddingPackageStore;

  const [open, setOpen] = React.useState(false);

  function hanledFormSubmit(searchObj) {
    handleSetSearchObject(searchObj);
    updatePageData()
  }

  return (
    <Formik 
      initialValues={searchObject} 
      onSubmit={hanledFormSubmit}
    >
      {({ values, setFieldValue, resetForm }) => (
        <Form autoComplete="off">
          <Grid container spacing={2} alignItems="center" justifyContent="flex-end">
            <Grid item lg={6} md={6} sm={4} xs={4}>
              <Button
                className="mb-16 mr-16 btn btn-primary d-inline-flex"
                startIcon={<Add />}
                variant="contained"
                onClick={() => handleEditBiddingPackage()}
              >
                {!isMobile && t("general.button.add")}
              </Button>
            </Grid>
            <Grid item style={{flex: 1}}>
              {/* <GlobitsSearchInput
                search={({ keyword }) => setKeyWordStockIn(keyword)}
              /> */}

              <GlobitsTextField
                placeholder={t("general.enter_search")}
                name="keyword"
                variant="outlined"
                notDelay
                InputProps={{
                  endAdornment: (
                    <IconButton
                      className="p-0"
                      aria-label="search"
                      type="submit"
                    >
                      <Search />
                    </IconButton>
                  ),
                }}
              />
            </Grid>
            {/* <Grid item xs="auto">
              <Button
                className="m-0 mr-16 btn btn-outlined d-inline-flex"
                startIcon={<FilterList style={{ padding: "3px 0" }} />}
                variant="contained"
                onClick={() => {
                  setOpen((prev) => !prev);
                }}
              >
                {!isMobile && t("general.advancedsearch")}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Collapse in={open}>
                <Grid container spacing={2} className="pt-10" justifyContent="flex-end">
                  <Grid item md={3} sm={4} xs={12}>
                    <GlobitsSelectInput
                      name="type"
                      options={LocalConstants.TypeOfBiddingPackage || []}
                      label = "Loại"
                      value  = {values?.type || null}
                      keyValue = "value"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <DialogActions className="dialog-footer-new">
                      <Grid container justifyContent="flex-end">
                        <Grid item md="auto" xs={6}>
                          <Button
                            startIcon={<Block />}
                            variant="contained"
                            className="mr-12 btn btn-secondary d-inline-flex"
                            color="secondary"
                            onClick={() => {
                              resetForm();
                              handleResetSearchObject();
                              updatePageData()
                              // getListStockIn();
                            }}
                          >
                            {!isMobile && t("general.button.deleteFilter")}
                          </Button>
                        </Grid>
                        <Grid item md="auto" xs={6}>
                          <Button
                            startIcon={<Search />}
                            className="mr-0 btn btn-primary d-inline-flex"
                            variant="contained"
                            color="primary"
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
            </Grid> */}
          </Grid>
        </Form>
      )}
    </Formik>
  );
});
