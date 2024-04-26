import { Button, Grid, useMediaQuery, useTheme } from "@material-ui/core";
import React from "react";
import GlobitsSearchInput from "app/common/GlobitsSearchInput";
import { observer } from "mobx-react";
import { useStore } from "app/stores";
import { Form, Formik } from "formik";
import GlobitsTextField from "app/common/form/GlobitsTextField";
import GlobitsDateTimePicker from "app/common/form/GlobitsDateTimePicker";
import { Search } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import GlobitsPagingAutocomplete from "app/common/form/GlobitsPagingAutocomplete";
import { pagingStaffs } from "../Staff/StaffService";
import { pagingShiftwork } from "../Shiftwork/ShiftworkService";

function ShiftWorkChangeSearch() {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { updatePageData, searchObject, setSearchObject } =
    useStore().shiftWorkChangeStore;

  const handleFormSubmit = (values) => {
    setSearchObject(values);
    updatePageData();
  };
  return (
    <Formik initialValues={searchObject} onSubmit={handleFormSubmit}>
      <Form autoComplete="off" className="mb-16">
        <Grid container spacing={2}>
        <Grid item md={3} xs={12}>
            <GlobitsTextField
              name="keyword"
              label="Từ khóa"
              placeholder="Nhập từ khóa để tìm kiếm"
              notDelay
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <GlobitsDateTimePicker
              name="startDate"
              label="Từ ngày"
              isDateTimePicker
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <GlobitsDateTimePicker
              name="endDate"
              label="Đến ngày"
              isDateTimePicker
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <GlobitsPagingAutocomplete
              name="startStaff"
              api={pagingStaffs}
              label="Nhân viên mở ca"
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <GlobitsPagingAutocomplete
              name="endStaff"
              api={pagingStaffs}
              label="Nhân viên đóng ca"
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <GlobitsPagingAutocomplete
              name="shiftWork"
              api={pagingShiftwork}
              label="Ca làm việc"
            />
          </Grid>
          <Grid item md="auto" xs={12} className="flex flex-middle flex-wrap">
            <Button
              startIcon={<Search />}
              type="submit"
              className="p-8 mt-18 mr-16 btn-orange d-inline-flex"
            >
              {!isMobile && t("general.button.search")}
            </Button>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
}

export default React.memo(observer(ShiftWorkChangeSearch));
