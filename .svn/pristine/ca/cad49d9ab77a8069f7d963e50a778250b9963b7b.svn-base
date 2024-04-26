import { Button, Grid } from "@material-ui/core";
import { Add, Search } from "@material-ui/icons";
import React from "react";
import { useStore } from "app/stores";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import GlobitsPagingAutocomplete from "app/common/form/GlobitsPagingAutocomplete";
import { Form, Formik } from "formik";
import GlobitsTextField from "app/common/form/GlobitsTextField";
import { pagingCategories } from "../Category/CategoryService";

export default observer(function ProductSearch() {

  const { productStore } = useStore();
  const { t } = useTranslation();

  const {
    searchObject,
    handleSetSearchObject,
    updatePageData,
    handleEditProduct
  } = productStore;

  function handleFormSubmit(searchObj) {
    let listCategoryId = [];
    if (searchObj?.listCategory?.length > 0) {
      listCategoryId = searchObj?.listCategory?.map(item => item["id"]);
    }
    const newSearchObject = {
      ...searchObj,
      listCategoryId
    };
    handleSetSearchObject(newSearchObject);
    updatePageData();
  }

  return (
    <Formik
      initialValues={searchObject}
      onSubmit={handleFormSubmit}
    >
      <Form autoComplete="off" className="mb-24">
        <Grid container spacing={2} alignItems="center">
          <Grid item md={6} xs={12}>
            <GlobitsTextField
              notDelay
              name="keyword"
              label="Từ khóa"
              placeholder={t("general.enter_search")}
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <GlobitsPagingAutocomplete
              multiple
              name="listCategory"
              label="Nhóm thuốc"
              searchObject={{productType: 1}}
              api={pagingCategories}
              getOptionLabel={(value) => value?.name || value?.category?.name || ''}
            />
          </Grid>

          <Grid item xs={12} class="flex items-center justify-center w-full gap-8">
            <Button startIcon={<Search />} className="btn-orange" type="submit" >
              {t("general.button.search")}
            </Button>

            <Button startIcon={<Add />} className="btn-green" onClick={() => handleEditProduct()}>
              {t("general.button.add")}
            </Button>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
});
