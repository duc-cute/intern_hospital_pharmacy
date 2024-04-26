import React from "react";
// import GlobitsSelectInput from "app/common/form/GlobitsSelectInput";
import { Form, Formik } from "formik";
import GlobitsDateTimePicker from "app/common/form/GlobitsDateTimePicker";
// import LocalConstants from "app/LocalConstants";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { getDefaultStore } from "app/common/CommonFunctions";
// import moment from "moment";
// import * as Yup from "yup";
import { Visibility } from "@material-ui/icons";
import GetAppIcon from '@material-ui/icons/GetApp';
import { Button, Grid } from "@material-ui/core";
import GlobitsPagingAutocomplete from "app/common/form/GlobitsPagingAutocomplete";
import { pagingProducts } from "app/views/Product/ProductService";
import { useStore } from "app/stores";
import { pagingStores } from "app/views/Store/StoreService";
import { exportDrugUseAndInventoriesReport } from "./InventoryUsageReportService";
import { toast } from "react-toastify";
import { observer } from "mobx-react";
import localStorageService from "app/services/localStorageService";

// Yup.addMethod(Yup.date, "dateYupTypeValidation", function (field, fieldName) {
//   return dateYupTypeValidation(this, field, fieldName);
// });

function InventoryUsageReportSearch({
  setData
}) {
  const { inventoryUsageReportStore } = useStore();

  const {
    updatePageData,
    searchObject,
    handleSetSearchObject
  } = inventoryUsageReportStore;

  const { t } = useTranslation();

  useEffect(() => {
    const { store } = getDefaultStore();
    handleSetSearchObject({...searchObject, store: store})
  }, [])

  const handleSubmit = (values) => {
    updatePageData(values)
  }

  const handleExport = (values) => {
    const obj = { 
      ...values, 
      categoryId: values?.category?.id || null, 
      storeId: values?.store?.id || null,
      groupByFields: ["category", "product", "transactionAtt", "source", "lot"]
    }
    exportDrugUseAndInventoriesReport(obj).then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "BAO_CAO_TINH_HINH_SU_DUNG_VA_TON_KHO_THUOC_" 
      + new Date().getTime() + ".xlsx");
      document.body.appendChild(link);
      link.click();
    }).catch(error => {
      console.log(error);
      toast.warning(t("toast.error"));
    })
  }

  return (
    <Formik
      enableReinitialize
      initialValues={searchObject}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, isSubmitting, errors }) => {
        return (
          <Form autoComplete="off">
            <Grid container spacing={2} className="mt-16 mb-16">
              <>
                <Grid item md={3} xs={12}>
                  <GlobitsDateTimePicker
                    label="Từ ngày"
                    name="fromDate"
                    maxDate={values?.toDate || null}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <GlobitsDateTimePicker
                    label="Đến ngày"
                    name="toDate"
                    minDate={values?.fromDate || null}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <GlobitsPagingAutocomplete
                    label="Kho"
                    name="store"
                    api={pagingStores}
                    value={values?.store || null}
                    disableClearable={localStorageService.isStore()}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <GlobitsPagingAutocomplete
                    label="Thuốc - vật tư y tế"
                    name="product"
                    api={pagingProducts}
                  />
                </Grid>
              </>
              <Grid item xs={12} md="auto">
                <Button
                  className="btn btn-primary d-inline-flex mr-8"
                  startIcon={<Visibility />}
                  type="submit"
                  // disabled={isSubmitting}
                >
                  Xem báo cáo
                </Button>
                <Button
                  startIcon={<GetAppIcon />}
                  className="mr-16 btn btn-save d-inline-flex"
                  // disabled={isSubmitting}
                  onClick={() => handleExport(values)}
                >
                  Xuất excel
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default observer(InventoryUsageReportSearch);