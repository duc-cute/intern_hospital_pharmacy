import { Button, Grid } from "@material-ui/core";
import { Add, GetApp, Search } from "@material-ui/icons";
import { LIST_STATUS_STORE_REQUEST } from "app/common/Constant/LocalConstantList";
import GlobitsDateTimePicker from "app/common/form/GlobitsDateTimePicker";
import GlobitsSelectInput from "app/common/form/GlobitsSelectInput";
import GlobitsTextField from "app/common/form/GlobitsTextField";
import { useStore } from "app/stores";
import { Form, Formik } from "formik";
import { observer } from "mobx-react";
import React, { memo } from "react";

export default memo(
  observer(function StoreRequestSearch({ isPopup }) {
    const { handleChangeForm, handleEditStoreRequest, searchStoreRequest } =
      useStore()._StoreRequestStore;

    return (
      <Formik
        initialValues={searchStoreRequest}
        enableReinitialize
        onSubmit={handleChangeForm}
      >
        {({ values }) => {
          return (
            <Form>
              <Grid className="mb-10" container spacing={2}>
                <Grid item md={3} xs={12}>
                  <GlobitsTextField label="Nhập từ khoá để tìm kiếm" name="keyword" />
                </Grid>
                <Grid item md={3} xs={12}>
                  <GlobitsSelectInput
                    label="Trạng thái"
                    name="status"
                    fullWidth
                    options={LIST_STATUS_STORE_REQUEST}
                    disabled={isPopup}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <GlobitsDateTimePicker label="Từ ngày" name="fromDate" maxDate={values?.toDate || null} />
                </Grid>

                <Grid item md={3} xs={12}>
                  <GlobitsDateTimePicker label="Đến ngày" name="toDate" minDate={values?.fromDate || null} />
                </Grid>
                {/* <Grid item md={6} xs={12}>
                  <GlobitsSearchInput search={handleChangeForm} />
                </Grid> */}
                <Grid item xs={12} className="text-center">
                  <Button startIcon={<Search />} className="btn-blue mr-4" type="submit">
                    Tìm kiếm
                  </Button>

                  {!isPopup &&
                    <Button startIcon={<Add />} className="btn-orange mr-4" onClick={() => handleEditStoreRequest()} >
                      Thêm yêu cầu xuất kho
                    </Button>
                  }
                </Grid>
              </Grid>
            </Form>
          )
        }}
      </Formik>
    );
  })
);
