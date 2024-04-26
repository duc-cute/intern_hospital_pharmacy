import React from "react";
import { useStore } from "app/stores";
import { observer } from "mobx-react";
import { Grid, Button } from "@material-ui/core";
import { Formik, Form } from "formik";
import SearchIcon from "@material-ui/icons/Search";
import PagingAutocomplete from "app/common/form/GlobitsPagingAutocomplete";
import { pagingStores } from "app/views/Store/StoreService";
import GetAppIcon from '@material-ui/icons/GetApp';
import SelectInput from "app/common/form/GlobitsSelectInput";
import { ListProductType } from "app/LocalConstants";
import { pagingProducts } from "app/views/Product/ProductService";

export default observer(function InventoryReportFilters() {
  const { inventoryReportStore } = useStore();
  const {
    inventorySearch,
    handleChangeSearchObject,
    handleDownloadReportFile
  } = inventoryReportStore;

  return (
    <Formik
      enableReinitialize
      initialValues={{ ...inventorySearch }}
      onSubmit={handleChangeSearchObject}
    >
      {({ values, setValues }) => (
        <Form autoComplete="off">
          <Grid container spacing={2} className="mb-16">
            <Grid item md={3} xs={6}>
              <PagingAutocomplete label="Kho" name="store" api={pagingStores} />
            </Grid>

            <Grid item md={3} xs={6}>
              <SelectInput
                label="Loại thuốc - vật tư y tế"
                name="productType"
                options={ListProductType}
                handleChange={(e) => setValues(prev => ({ ...prev, productType: e.target.value, listProduct: [] }))}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <PagingAutocomplete
                label="thuốc - vật tư y tế"
                name="listProduct"
                api={pagingProducts}
                searchObject={{ productType: values?.productType }}
                multiple
                disableCloseOnSelect
              />
            </Grid>

            <Grid item xs={12}>
              <Button startIcon={<SearchIcon />} className="btn-orange mr-8" type="submit">
                Tìm kiếm
              </Button>

              <Button startIcon={<GetAppIcon />} className="btn-green" onClick={handleDownloadReportFile}>
                Xuất excel
              </Button>
            </Grid>
          </Grid>
        </Form>)}
    </Formik>
  );
});
