/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Formik } from "formik";
import React from "react";
import { Grid, Button } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import PagingAutocomplete from "app/common/form/GlobitsPagingAutocomplete";
import { pagingStores } from "../Store/StoreService";
import DateTimePicker from "app/common/form/GlobitsDateTimePicker";
import localStorageService from "app/services/localStorageService";
import { pagingProducts } from "../Product/ProductService";
import { toast } from "react-toastify";
import { viewReport } from "../Report/InventoryUsageReport/InventoryUsageReportService";
import { SearchObject } from "app/common/Model/SearchObject";
import { getDefaultStore } from "app/common/Constant/LocalFunction";
import { memo } from "react";

function DashboardSearchForm({ setData }) {
  const [formValues, setFormValues] = React.useState(new SearchObject());

  React.useEffect(() => {
    handelSubmitForm(new SearchObject({
      fromDate: new Date().setMonth(0, 1),
      toDate: new Date(),
      ...getDefaultStore(),
    }));
  }, []);

  async function handelSubmitForm(values) {
    try {
      const obj = {
        ...values,
        storeId: values.store?.id,
        productId: values.product?.id,
        groupByFields: ["category", "product", "transactionAtt", "source", "lot"],
      }
      let res = await viewReport(obj);
      setData(res.data);
    } catch (error) {
      toast.warning("toast.load_fail");
    }
    setFormValues(values)
  }

  return (
    <Formik
      enableReinitialize
      initialValues={formValues}
      onSubmit={handelSubmitForm}
    >
      {({ values }) => (
        <Form autoComplete="off" className="mb-16">
          <Grid container spacing={2}>
            <Grid item lg={3} md={6} xs={12}>
              <DateTimePicker label="Từ ngày" name="fromDate" maxDate={values?.toDate || null} />
            </Grid>

            <Grid item lg={3} md={6} xs={12}>
              <DateTimePicker label="Đến ngày" name="toDate" minDate={values?.fromDate || null} />
            </Grid>

            <Grid item lg={3} md={6} xs={12}>
              <PagingAutocomplete label="Kho" name="store" api={pagingStores} disableClearable={localStorageService.isStore()} />
            </Grid>

            <Grid item lg={3} md={6} xs={12}>
              <PagingAutocomplete label="Thuốc - vật tư y tế" name="product" api={pagingProducts} />
            </Grid>

            <Grid item xs={12} className="text-center">
              <Button variant="contained" className="btn-orange" type="submit" startIcon={<VisibilityIcon />} >
                Xem số liệu
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

export default memo(DashboardSearchForm);