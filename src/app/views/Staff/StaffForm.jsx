import React from "react";
import { observer } from "mobx-react";
import PopupForm from "app/common/Component/Popup/PopupForm";
import { useStore } from "app/stores";
import GlobitsTextField from "app/common/form/GlobitsTextField";
import GlobitsDateTimePicker from "app/common/form/GlobitsDateTimePicker";
import GlobitsNumberInput from "app/common/form/GlobitsNumberInput";
import GlobitsRadioButton from "app/common/form/GlobitsRadioButton";
import { Gender } from "app/common/Constant/LocalConstant";
import { Grid } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import CreateUserStaffForm from "./Components/CreateUserStaffForm";
import * as Yup from "yup";
import { dateYupTypeValidation } from "app/common/CommonFunctions";
Yup.addMethod(Yup.date, "dateYupTypeValidation", function (field, fieldName) {
  return dateYupTypeValidation(this, field, fieldName);
});

function StaffForm() {
  const { t } = useTranslation();
  const { openForm, selectedStaff, handleClosePopup, handleSaveStaff } =
    useStore().staffStore;

  const validationSchema = Yup.object({
    // staffCode: Yup.string().required(t("validation.required")),
    displayName: Yup.string().required(t("validation.required")).nullable(),
    birthDate: Yup.date()
      .nullable()
      .dateYupTypeValidation("birthDate", "Ngày sinh"),
    // idNumber: Yup.string().required(t("validation.required")),
    email: Yup.string().nullable()
      .email(t("validation.email"))
      .test("required-email", t("validation.required"), function (value) {
        const { createUser } = this.parent;
        if (createUser && !value) {
          return false;
        }
        return true;
      }),
    user: Yup.object({
      username: Yup.string().required(t("validation.required")).nullable(),
      roles: Yup.array()
        .required(t("validation.required"))
        .nullable()
        .test("required-roles", t("validation.required"), function (value) {
          if (!(value?.length > 0)) {
            return false;
          }
          return true;
        }),
      password: Yup.string()
        .nullable()
        .test("required-password", t("validation.required"), function (value) {
          const { id } = this.parent;
          if (!id && !(value?.length > 0)) {
            return false;
          }
          return true;
        }),
      confirmPassword: Yup.string()
        .nullable()
        .oneOf([Yup.ref("password"), null], t("validation.confirm_password")),
    }).nullable(),
    // phoneNumber: Yup.string()
    //   .required(t("validation.required"))
    //   .matches(/^[0-9]+$/, "Must be only digits")
    //   .min(9, "Must be min 9 digits"),
  });

  return (
    <PopupForm
      size="lg"
      open={openForm}
      handleClose={handleClosePopup}
      title={selectedStaff?.id ? "Cập nhật nhân viên" : "Thêm nhân viên mới"}
      formik={{
        enableReinitialize: true,
        initialValues: selectedStaff,
        validationSchema,
        onSubmit: handleSaveStaff,
      }}
    >
      {({ values }) => {
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <GlobitsTextField
                label="Mã nhân viên"
                name="staffCode"
                disabled
                placeholder="Mã tự động"
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <GlobitsTextField
                label="Họ tên"
                name="displayName"
                requiredLabel
                notDelay
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <GlobitsDateTimePicker name="birthDate" label="Ngày sinh" />
            </Grid>

            <Grid item xs={12} md={3} className="flex items-center gap-20">
              <p>Giới tính</p>

              <GlobitsRadioButton
                name="gender"
                value={Gender.MALE}
                label="Nam"
                type="radio"
              />
              <GlobitsRadioButton
                name="gender"
                value={Gender.FEMALE}
                label="Nữ"
                type="radio"
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <GlobitsNumberInput
                type="text"
                name="phoneNumber"
                label="Số điện thoại"
                notDefault
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <GlobitsTextField
                label="Email"
                name="email"
                type="email"
                notDelay
                requiredLabel={values?.createUser}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <GlobitsNumberInput
                type="text"
                name="idNumber"
                label="Số CMND/CCCD"
                notDefault
              />
            </Grid>

            <CreateUserStaffForm />
          </Grid>
        );
      }}
    </PopupForm>
  );
}

export default observer(StaffForm);
