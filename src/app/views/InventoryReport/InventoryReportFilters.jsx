import React from "react";
import { useStore } from "../../stores";
import { observer } from "mobx-react";
import { Grid, Button } from "@material-ui/core";
import { Formik, Form } from "formik";
import SearchIcon from "@material-ui/icons/Search";
import GlobitsDateTimePicker from "app/common/form/GlobitsDateTimePicker";
import GlobitsPagingAutocomplete from "app/common/form/GlobitsPagingAutocomplete";
import { pagingStores } from "app/views/Store/StoreService";
import GetAppIcon from '@material-ui/icons/GetApp';
import GlobitsSelectInput from "app/common/form/GlobitsSelectInput";
import { ListProductType } from "app/LocalConstants";
import { pagingProducts } from "../Product/ProductService";

export default observer(function InventoryReportFilters() {
  const { inventoryReportStore } = useStore();
  const {
    searchObject,
    handleChangeSearchObject,
    handleDownloadReportFile
  } = inventoryReportStore;

  return (
    <Formik
      enableReinitialize
      initialValues={searchObject}
      onSubmit={handleChangeSearchObject}
    >
      {({ isSubmitting, values, setValues }) => (
        <Form autoComplete="off">
          <Grid container spacing={2} className="mb-16">
            <Grid item md={3} xs={6}>
              <GlobitsDateTimePicker label="Từ ngày" name="fromDate" maxDate={values?.toDate || null} />
            </Grid>

            <Grid item md={3} xs={6}>
              <GlobitsDateTimePicker label="Đến ngày" name="toDate" minDate={values?.fromDate || null} />
            </Grid>

            <Grid item md={3} xs={6}>
              <GlobitsPagingAutocomplete label="Kho" name="store" api={pagingStores} />
            </Grid>

            <Grid item md={3} xs={6}>
              <GlobitsSelectInput
                label="Loại thuốc - vật tư y tế"
                name="productType"
                options={ListProductType}
                handleChange={(e) => setValues(prev => ({ ...prev, productType: e.target.value, listProduct: [] }))}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <GlobitsPagingAutocomplete
                label="thuốc - vật tư y tế"
                name="listProduct"
                api={pagingProducts}
                searchObject={{ productType: values?.productType }}
                multiple
                disableCloseOnSelect
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <Button
                startIcon={<SearchIcon />}
                className="mr-0 btn btn-primary d-inline-flex mr-8"
                variant="contained"
                color="primary"
                type="submit"
              >
                Tìm kiếm
              </Button>

              <Button
                startIcon={<GetAppIcon />}
                className="mr-16 btn btn-save d-inline-flex"
                disabled={isSubmitting}
                onClick={handleDownloadReportFile}
              >
                Xuất excel
              </Button>
            </Grid>
          </Grid>
        </Form>)}
    </Formik>
  );
});
