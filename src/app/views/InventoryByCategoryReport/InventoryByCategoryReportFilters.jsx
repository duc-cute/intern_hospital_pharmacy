import React from "react";
import { useStore } from "../../stores";
import { observer } from "mobx-react";
import { Grid, Button } from "@material-ui/core";
import { Formik, Form } from "formik";
import SearchIcon from "@material-ui/icons/Search";
import GetAppIcon from '@material-ui/icons/GetApp';
import GlobitsDateTimePicker from "app/common/form/GlobitsDateTimePicker";
import GlobitsPagingAutocomplete from "app/common/form/GlobitsPagingAutocomplete";
import GlobitsAutocomplete from "app/common/form/GlobitsAutocomplete";
import { pagingStores } from "app/views/Store/StoreService";
import * as Yup from "yup";

export default observer(function InventoryByCategoryReportFilters() {
  const { inventoryByCategoryReportStore } = useStore();
  const {
    searchObject,
    handleChangeSearchObject,
    listCategory,
    handleDownloadReportFile,
  } = inventoryByCategoryReportStore;

  const validationSchema = Yup.object({})


  return (
    <Formik
      validationSchema={validationSchema}
      enableReinitialize
      initialValues={searchObject}
      onSubmit={handleChangeSearchObject}
    >
      {({ isSubmitting, values, setFieldValue, submitForm }) => (
        <Form autoComplete="off">
          <Grid container spacing={2} className="mb-16">
            <Grid item xs={3}>
              <GlobitsDateTimePicker
                label="Từ ngày"
                name="fromDate"
                maxDate={values?.toDate || null}
              />
            </Grid>
            <Grid item xs={3}>
              <GlobitsDateTimePicker
                label="Đến ngày"
                name="toDate"
                minDate={values?.fromDate || null}
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                startIcon={<SearchIcon />}
                className="mr-0 btn btn-primary d-inline-flex"
                variant="contained"
                color="primary"
                type="submit"
              >
                Tìm kiếm
              </Button>
            </Grid>
            <Grid item xs={3}>
            </Grid>
            <Grid item xs={3}>
              <GlobitsPagingAutocomplete
                label="Kho"
                name="store"
                api={pagingStores}
              />
            </Grid>
            <Grid item xs={3}>
              <GlobitsAutocomplete
                label="Danh mục thuốc - vật tư y tế"
                name="category"
                options={listCategory ? listCategory : []}
              />
            </Grid>
            <Grid item xs={3}>
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
        </Form>)
      }
    </Formik >
  );
});
