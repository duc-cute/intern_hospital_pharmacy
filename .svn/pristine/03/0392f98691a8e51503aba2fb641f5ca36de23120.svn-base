import React from "react";
import { useStore } from "app/stores";
import { observer } from "mobx-react";
import { Grid, Button } from "@material-ui/core";
import { Formik, Form, useFormikContext } from "formik";
import SearchIcon from "@material-ui/icons/Search";
import DateTimePicker from "app/common/form/GlobitsDateTimePicker";
import GetAppIcon from '@material-ui/icons/GetApp';
import SelectInput from "app/common/form/GlobitsSelectInput";
import { REPORT_DISPLAY_TYPE, REPORT_TYPE_TIME, SALES_REPORT_CONCERN_TYPE } from "app/common/Constant/LocalConstantList";
import { endOfDay, endOfLastWeek, startOfDay, startOfLastWeek, startOfWeek } from "app/common/Constant/LocalFunction";

export default observer(function SalesReportFilters() {
  const {
    salesReportSearch,
    handleChangeSearchObject,
    handleDownloadReportFile
  } = useStore().salesReportStore;

  return (
    <Formik
      enableReinitialize
      initialValues={{ ...salesReportSearch }}
      onSubmit={handleChangeSearchObject}
    >
      {({ values, setValues }) => (
        <Form autoComplete="off">
          <Grid container spacing={2} className="mb-16">
            <Grid item lg={3} md={6} xs={12}>
              <SelectInput
                label="Kiểu hiển thị"
                name="displayType"
                options={REPORT_DISPLAY_TYPE}
                noNullOption
              />
            </Grid>
            <Grid item lg={3} md={6} xs={12}>
              <SelectInput
                label="Mối quan tâm"
                name="concernType"
                options={SALES_REPORT_CONCERN_TYPE}
                noNullOption
              />
            </Grid>
            <Grid item lg={3} md={6} xs={12}>
              <SelectInput
                label="Phương thức bán hàng"
                name="salesType"
                options={[]}
              />
            </Grid>
            <Grid item lg={3} md={6} xs={12}>
              <SelectInput
                label="Kênh bán hàng"
                name="salesChannel"
                options={[]}
              />
            </Grid>
            <Grid item lg={3} md={6} xs={12}>
              <SelectTypeTime />
            </Grid>
            <Grid item lg={3} md={6} xs={12}>
              <DateTimePicker isDateTimePicker label="Từ ngày" name="fromDate" maxDate={values?.toDate || null} />
            </Grid>
            <Grid item lg={3} md={6} xs={12}>
              <DateTimePicker isDateTimePicker label="Đến ngày" name="toDate" minDate={values?.fromDate || null} />
            </Grid>

            <Grid item md={6} xs={12}>
              <Button startIcon={<SearchIcon />} className="btn-orange mr-8 mt-18" type="submit">
                Tìm kiếm
              </Button>

              <Button startIcon={<GetAppIcon />} className="btn-green mt-18" onClick={handleDownloadReportFile}>
                Xuất excel
              </Button>
            </Grid>
          </Grid>
        </Form>)}
    </Formik>
  );
});


const SelectTypeTime = () => {
  const { setFieldValue } = useFormikContext();

  const handleChange = (event) => {
    const value = event.target.value;
    setFieldValue("typeTime", value)
    switch(value) {
      case REPORT_TYPE_TIME[0].value: {
        setFieldValue("fromDate", startOfDay(new Date()))
        setFieldValue("toDate", new Date())
        break;
      }
      case REPORT_TYPE_TIME[1].value: {
        const date = new Date(), y = date.getFullYear(), m = date.getMonth(),
        yesterday = new Date(y, m, date.getDate() - 1);
        setFieldValue("fromDate", startOfDay(yesterday))
        setFieldValue("toDate", endOfDay(yesterday))
        break;
      }
      case REPORT_TYPE_TIME[2].value: {
        setFieldValue("fromDate", startOfWeek(new Date()))
        setFieldValue("toDate", new Date())
        break;
      }
      case REPORT_TYPE_TIME[3].value: {
        setFieldValue("fromDate", startOfLastWeek(new Date()))
        setFieldValue("toDate", endOfLastWeek(new Date()))
        break;
      }
      case REPORT_TYPE_TIME[4].value: {
        const date = new Date(), y = date.getFullYear(), m = date.getMonth()
        setFieldValue("fromDate", startOfDay(new Date(y, m, date.getDate() - 6)))
        setFieldValue("toDate", date)
        break;
      }
      case REPORT_TYPE_TIME[5].value: {
        const date = new Date(), y = date.getFullYear(), m = date.getMonth()
        setFieldValue("fromDate", startOfDay(new Date(y, m, 1)))
        setFieldValue("toDate", date)
        break;
      }
      case REPORT_TYPE_TIME[6].value: {
        const date = new Date(), y = date.getFullYear(), m = date.getMonth()
        setFieldValue("fromDate", startOfDay(new Date(y, m-1, 1)))
        setFieldValue("toDate", endOfDay(new Date(y, m, 0)))
        break;
      }
      case REPORT_TYPE_TIME[7].value: {
        const date = new Date(), y = date.getFullYear(), m = date.getMonth()
        setFieldValue("fromDate", startOfDay(new Date(y, m, date.getDate() - 30)))
        setFieldValue("toDate", date)
        break;
      }
      case REPORT_TYPE_TIME[8].value: {
        const date = new Date(), y = date.getFullYear(), m = date.getMonth(), q = Math.floor((m / 3));
        setFieldValue("fromDate", startOfDay(new Date(y, q*3, 1)))
        setFieldValue("toDate", date)
        break;
      }
      case REPORT_TYPE_TIME[9].value: {
        const date = new Date(), y = date.getFullYear(), m = date.getMonth(), q = Math.floor((m / 3));
        const start = new Date(startOfDay(new Date(y, q*3-3, 1)))
        setFieldValue("fromDate", start)
        setFieldValue("toDate", endOfDay(new Date(y, start.getMonth() + 3, 0)))
        break;
      }
      case REPORT_TYPE_TIME[10].value: {
        const date = new Date(), y = date.getFullYear()
        setFieldValue("fromDate", startOfDay(new Date(y, 0, 1)))
        setFieldValue("toDate", date)
        break;
      }
      case REPORT_TYPE_TIME[11].value: {
        const date = new Date(), y = date.getFullYear()
        setFieldValue("fromDate", startOfDay(new Date(y-1, 0, 1)))
        setFieldValue("toDate", endOfDay(new Date(y, 0, 0)))
        break;
      }
      default: {}
    }
  }

  return (
    <SelectInput
      label="Thời gian"
      name="typeTime"
      options={REPORT_TYPE_TIME}
      noNullOption
      handleChange={handleChange}
    />
  )
}