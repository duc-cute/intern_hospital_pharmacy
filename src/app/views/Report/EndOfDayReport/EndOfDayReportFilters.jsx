import React from "react";
import { useStore } from "app/stores";
import { observer } from "mobx-react";
import { Grid, Button } from "@material-ui/core";
import { Formik, Form } from "formik";
import SearchIcon from "@material-ui/icons/Search";
import DateTimePicker from "app/common/form/GlobitsDateTimePicker";
import GetAppIcon from "@material-ui/icons/GetApp";
import SelectInput from "app/common/form/GlobitsSelectInput";
import GlobitsTextField from "app/common/form/GlobitsTextField";
import GlobitsPagingAutocomplete from "app/common/form/GlobitsPagingAutocomplete";
import { pagingStaffs } from "app/views/Staff/StaffService";
import {
  END_OF_DAY_REPORT_CONCERN_TYPE,
  PaymentMethodList,
  REPORT_DISPLAY_TYPE,
} from "app/common/Constant/LocalConstantList";

export default observer(function EndOfDayReportFilters() {
  const {
    endOfDayReportSearch,
    handleChangeSearchObject,
    handleDownloadReportFile,
  } = useStore().endOfDayReportStore;

  return (
    <Formik
      enableReinitialize
      initialValues={{ ...endOfDayReportSearch }}
      onSubmit={handleChangeSearchObject}
    >
      {({ values, setValues }) => {
        return (
          <Form autoComplete="off">
            <Grid container spacing={2} className="mb-16">
              <Grid item lg={3} md={6} xs={12}>
                <SelectInput
                  label="Kiểu hiển thị"
                  name="displayType"
                  options={REPORT_DISPLAY_TYPE}
                  noNullOption
                  disabled
                />
              </Grid>
              <Grid item lg={3} md={6} xs={12}>
                <SelectInput
                  label="Mối quan tâm"
                  name="concernType"
                  options={END_OF_DAY_REPORT_CONCERN_TYPE}
                  noNullOption
                />
              </Grid>
              <Grid item lg={3} md={6} xs={12}>
                <DateTimePicker
                  isDateTimePicker
                  label="Từ ngày"
                  name="fromDate"
                  maxDate={values?.toDate || null}
                />
              </Grid>
              <Grid item lg={3} md={6} xs={12}>
                <DateTimePicker
                  isDateTimePicker
                  label="Đến ngày"
                  name="toDate"
                  minDate={values?.fromDate || null}
                />
              </Grid>
              <Grid item lg={3} md={6} xs={12}>
                <GlobitsTextField
                  label="Khách hàng"
                  name="customer"
                  placeholder="Theo mã, tên, điện thoại"
                />
              </Grid>
              <Grid item lg={3} md={6} xs={12}>
                <GlobitsPagingAutocomplete
                  label="Nhân viên"
                  name="staff"
                  api={pagingStaffs}
                  displayData="displayName"
                  // multiple
                  // value={values?.staff || []}
                  // renderTags={(value, getTagProps) =>
                  //   value.map((option, index) => (
                  //     <Chip
                  //       variant="outlined"
                  //       label={option}
                  //       {...getTagProps({ index })}
                  //     />
                  //   ))
                  // }
                />
              </Grid>
              <Grid item lg={3} md={6} xs={12}>
                <GlobitsPagingAutocomplete
                  label="Người tạo"
                  name="createBy"
                  api={pagingStaffs}
                  displayData="displayName"
                  // multiple
                />
              </Grid>
              <Grid item lg={3} md={6} xs={12}>
                <SelectInput
                  label="Phương thức thanh toán"
                  name="paymentType"
                  options={PaymentMethodList}
                />
              </Grid>
              <Grid item lg={3} md={6} xs={12}>
                <SelectInput
                  label="Phương thức bán hàng"
                  name="saleType"
                  options={[]}
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <Button
                  startIcon={<SearchIcon />}
                  className="btn-orange mr-8 mt-18"
                  type="submit"
                >
                  Tìm kiếm
                </Button>

                <Button
                  startIcon={<GetAppIcon />}
                  className="btn-green mt-18"
                  onClick={handleDownloadReportFile}
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
});
