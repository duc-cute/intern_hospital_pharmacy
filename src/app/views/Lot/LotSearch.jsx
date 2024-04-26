import React from "react";
import { Button, Grid } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { useStore } from "app/stores";
import { Form, Formik } from "formik";
import TextField from "app/common/form/GlobitsTextField";
import SearchIcon from "@material-ui/icons/Search";
import GetAppIcon from '@material-ui/icons/GetApp';
import DateTimePicker from "app/common/form/GlobitsDateTimePicker";
import { memo } from "react";

const LotSearch = () => {
  const { searchObject, handleOpenForm, handleChangeFormSearch } = useStore().lotStore;

  return (
    <Formik
      initialValues={{ ...searchObject }}
      onSubmit={handleChangeFormSearch}
    >
      {({ values }) => (
        <Form autoComplete="off">
          <Grid container spacing={2} className="mb-16">
            <Grid item xs={12} md={4}>
              <TextField label="Mã hoặc tên lô" name="keyword" />
            </Grid>

            <Grid item xs={12} md={4}>
              <DateTimePicker label="Ngày nhập" name="expiryDateFrom" maxDate={values?.toDate || null} />
            </Grid>

            <Grid item xs={12} md={4}>
              <DateTimePicker label="Ngày hết hạn" name="expiryDateTo" minDate={values?.fromDate || null} />
            </Grid>

            <Grid item xs={12} className="text-center">
              <Button startIcon={<SearchIcon />} className="btn-blue mr-4" type="submit">
                Tìm kiếm
              </Button>

              <Button startIcon={<Add />} className="btn-orange mr-4" onClick={() => handleOpenForm()} >
                Thêm mới
              </Button>

              <Button startIcon={<GetAppIcon />} className="btn-green">
                Xuất excel
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}

export default memo(LotSearch);