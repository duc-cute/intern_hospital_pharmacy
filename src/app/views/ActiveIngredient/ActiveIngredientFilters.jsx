import { Button, Grid, IconButton } from "@material-ui/core";
import { Add, Search } from "@material-ui/icons";
import React from "react";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useStore } from "app/stores";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { Form, Formik } from "formik";
import GlobitsTextField from "app/common/form/GlobitsTextField";

export default observer(function ActiveIngredientFilters() {
  const { activeIngredientStore } = useStore();
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    searchObject,
    handleSetSearchObject,
    handleEditActiveIngredient,
    updatePageData
  } = activeIngredientStore;

  function handleFormSubmit(searchObj) {
    handleSetSearchObject(searchObj);
    updatePageData()
  }

  return (
    <Formik
      initialValues={searchObject}
      onSubmit={handleFormSubmit}
    >
      <Form autoComplete="off" className="mb-24">
        <Grid container spacing={2} alignItems="center" justifyContent="flex-end">
          <Grid item lg={6} md={6} sm={4} xs={4}>
            <Button
              className="mb-16 mr-16 btn btn-primary d-inline-flex"
              startIcon={<Add />}
              variant="contained"
              onClick={() => handleEditActiveIngredient()}
            >
              {!isMobile && t("general.button.add")}
            </Button>
          </Grid>
          <Grid item style={{ flex: 1 }}>

            <GlobitsTextField
              label={t("general.enter_search")}
              name="keyword"
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
        </Grid>
      </Form>
    </Formik>
  );
});
