import React from "react";
import { Formik, Form } from "formik";
import { Grid, DialogActions, Button, DialogContent } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import BlockIcon from "@material-ui/icons/Block";
import { useTranslation } from "react-i18next";
import { useStore } from "app/stores";
import * as Yup from "yup";
import GlobitsAsyncAutocomplete from "app/common/form/GlobitsAsyncAutocomplete";
import GlobitsTextField from "app/common/form/GlobitsTextField";
import { getAllRoles } from "./UserService";
import ChangePassWordAccordion from "./ChangePassWordAccordion";
import GlobitsSelectInput from "app/common/form/GlobitsSelectInput";
import LocalConstants from "app/LocalConstants";
import GlobitsCheckBox from "app/common/form/GlobitsCheckBox";
import { observer } from "mobx-react";
import UserStoreManagement from "./Component/UserStoreManagement";
import GlobitsPopup from "app/common/GlobitsPopup";
import FormikFocusError from "app/common/form/FormikFocusError";
import localStorageService from "app/services/localStorageService";
import StoreOrganizationUser from "./Component/StoreOrganizationUser";

export default observer(function UserForm() {

  const { userStore } = useStore();
  const { t } = useTranslation();
  const { 
    handleClosePopup, 
    dataEditUser, 
    handleSubmitFormUser, 
    openFormEditUser, 
    openStoreManagement, 
    updatePageData 
  } = userStore;

  const handleClose = () => {
    handleClosePopup()
    updatePageData()
  }

  const validationSchema = Yup.object({
    person: Yup.object({
      displayName: Yup.string().nullable().required(t("validation.required")), 
    }).nullable(),
    username: Yup.string().required(t("validation.required")).nullable(),
    email: Yup.string().email(t("validation.email")).required(t("validation.email")).nullable(),
    roles: Yup.array().required(t("validation.required")).nullable()
    .test("required-roles", t("validation.required"), function (value) {
      if (!(value?.length > 0)) {
        return false
      }
      return true
    }),
    confirmPassword: Yup.string().nullable().oneOf([Yup.ref("password"), null], t("validation.confirm_password")),
  });

  return (
    <GlobitsPopup
      open={openFormEditUser}
      handleClose={handleClose}
      titleHeader={(dataEditUser.id ? t("general.button.edit") : t("general.button.add")) + " " + t("user.title")}
      noDiaLogContent
    >
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={dataEditUser}
        onSubmit={handleSubmitFormUser}
      >
        {({ setFieldValue, isSubmitting, values, setValues }) => (
          <Form autoComplete="off" className="dialog-form" id="userForm">
            <FormikFocusError formId="userForm" />
            <DialogContent className="dialog-body">
              <Grid container spacing={2}>
                <Grid item sm={6} xs={12}>
                  <GlobitsTextField
                    variant="standard"
                    label={t("user.display_name")}
                    name="person.displayName"
                    requiredLabel
                    notDelay
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <GlobitsSelectInput
                    variant="standard"
                    label={t("user.gender")}
                    name="person.gender"
                    keyValue="id"
                    options={LocalConstants.ListGender}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <GlobitsTextField
                    variant="standard"
                    label={t("user.username")}
                    name="username"
                    requiredLabel
                    notDelay
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <GlobitsTextField
                    variant="standard"
                    type="email"
                    label={t("user.email")}
                    name="email"
                    requiredLabel
                    notDelay
                  />
                </Grid>
                <Grid item sm={12} xs={12}>
                  <GlobitsAsyncAutocomplete
                    variant="standard"
                    label={t("user.role.title")}
                    name="roles"
                    multiple
                    api={getAllRoles}
                    requiredLabel
                  />
                </Grid>
                <Grid item sm={12} xs={12}>
                  <GlobitsCheckBox label={t("user.active")} name="active" />
                </Grid>
                <ChangePassWordAccordion setFieldValue={setFieldValue} />
                {(values?.id || openStoreManagement) && (
                  <Grid item xs={12}>
                    <UserStoreManagement />
                  </Grid>
                )}
                {(values?.id && localStorageService.isSuperAdmin()) && (
                  <Grid item xs={12}>
                    <StoreOrganizationUser />
                  </Grid>
                )}
              </Grid>
            </DialogContent>

            <DialogActions className="dialog-footer p-0">
              <div className="flex flex-space-between flex-middle">
                <Button
                  startIcon={<BlockIcon />}
                  variant="contained"
                  className="mr-12 btn btn-secondary d-inline-flex"
                  color="secondary"
                  onClick={handleClose}
                >
                  {t("general.button.cancel")}
                </Button>
                <Button
                  startIcon={<SaveIcon />}
                  className="mr-0 btn btn-primary d-inline-flex"
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  {t("general.button.save")}
                </Button>
              </div>
            </DialogActions>

          </Form>
        )}
      </Formik>
    </GlobitsPopup>
  );
})