import { Grid } from '@material-ui/core';
import React from 'react';
import * as Yup from "yup";
import GlobitsTextField from 'app/common/form/GlobitsTextField';
import GlobitsDateTimePicker from 'app/common/form/GlobitsDateTimePicker';
import StoreRequestItems from './Component/StoreRequestItems';
import PopupForm from 'app/common/Component/Popup/PopupForm';
import GlobitsSelectInput from 'app/common/form/GlobitsSelectInput';
import { LIST_STATUS_STORE_REQUEST } from 'app/common/Constant/LocalConstantList';
import GlobitsPagingAutocomplete from 'app/common/form/GlobitsPagingAutocomplete';
import { pagingStores } from '../Store/StoreService';

export default function StoreRequestPopup({
  open,
  handleClose,
  formData,
  handleSubmit
}) {

  const validationSchema = Yup.object({
    // items: Yup.array()
    //   .of(
    //     Yup.object({
    //       quantity: Yup.number()
    //         .nullable()
    //         .typeError("Không đúng định dạng")
    //         .test("Is positive?", "Phải nhập số >= 0", (value) => value >= 0),
    //       price: Yup.number()
    //         .nullable()
    //         .typeError("Không đúng định dạng")
    //         .test("Is positive?", "Phải nhập số >= 0", (value) => value >= 0),
    //     }).nullable()
    //   )
    //   .nullable(),
  });

  return (
    <PopupForm
      open={open}
      handleClose={handleClose}
      title={"Yêu cầu xuất kho"}
      // noDiaLogContent
      id="store-request-form"
      size="lg"
      formik={{
        initialValues: formData,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: handleSubmit
      }}
    >
      <Grid container spacing={2}>
        <Grid item md={3} sm={12} xs={12}>
          <GlobitsTextField
            label="Mã phiếu yêu cầu xuất kho"
            name="code"
            fullWidth
          />
        </Grid>
        <Grid item md={3} sm={12} xs={12}>
          <GlobitsDateTimePicker
            label="Ngày yêu cầu"
            name="dateIssue"
            fullWidth
            isDateTimePicker
          />
        </Grid>
        <Grid item md={3} sm={12} xs={12}>
          <GlobitsDateTimePicker
            label="Dự trù từ ngày"
            name="fromDateEstimate"
            fullWidth
          />
        </Grid>
        <Grid item md={3} sm={12} xs={12}>
          <GlobitsDateTimePicker
            label="Dự trù đến ngày"
            name="toDateEstimate"
            fullWidth
          />
        </Grid>
        <Grid item md={3} sm={12} xs={12}>
          <GlobitsPagingAutocomplete 
            label="Kho"
            name="dep"
            api={pagingStores}
          />
        </Grid>
        {/* <Grid item md={3} sm={12} xs={12}>
          <GlobitsTextField
            label="Mã phòng ban"
            name="depCode"
            fullWidth
          />
        </Grid>
        <Grid item md={3} sm={12} xs={12}>
          <GlobitsTextField
            label="Tên phòng ban"
            name="depName"
            fullWidth
          />
        </Grid> */}
        <Grid item md={3} sm={12} xs={12}>
          <GlobitsSelectInput
            label="Trạng thái"
            name="status"
            fullWidth
            options={LIST_STATUS_STORE_REQUEST}
          />
        </Grid>
        <Grid item xs={12}>
          <StoreRequestItems />
        </Grid>
      </Grid>
    </PopupForm>
  )
}
