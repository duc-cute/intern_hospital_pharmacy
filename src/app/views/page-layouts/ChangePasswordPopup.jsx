import { Grid, Button, DialogActions } from "@material-ui/core";
import React from "react";
import DialogContent from '@material-ui/core/DialogContent';
import 'react-image-crop/dist/ReactCrop.css';
import JwtAuthService from "../../services/jwtAuthService";
import GlobitsTextField from "app/common/form/GlobitsTextField";
import { Form, Formik } from "formik";
import GlobitsPopup from "app/common/GlobitsPopup";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { changePasswordSelf, resetPasswordUserKeyCloak } from "../User/UserService";

function ChangePasswordPopup({ handleClose, open, user }) {

  const { t } = useTranslation();

  const validationSchema = Yup.object({
    oldPassword: Yup.string().required(t("validation.required")).nullable(),
    password: Yup.string().required(t("validation.required")).nullable(),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], t("validation.confirm_password"))
      .required(t("validation.required"))
      .nullable(),
  });

  function handleChangePassword(values) {
    changePasswordSelf(values).then(() => {
      resetPasswordUserKeyCloak(values).then(() => {
        toast.success('Bạn đã đối mật khẩu thành công, vui lòng đăng nhập lại');
        setTimeout(() => {
          JwtAuthService.logout()
        }, 2000)
      }).catch(err => {
        toast.error('Có lỗi trong quá trình đổi mật khẩu');
      })
    }).catch(err => {
      toast.error('Có lỗi trong quá trình đổi mật khẩu');
    })
  }

  return (
    <GlobitsPopup
      noDiaLogContent
      open={open}
      handleClose={handleClose}
      titleHeader={"Đổi mật khẩu"}
      maxWidth="xs"
    >
      <Formik
        enableReinitialize
        initialValues={{
          id: user?.id,
          oldPassword: null,
          password: null,
          confirmPassword: null,
          changePass: true
        }}
        validationSchema={validationSchema}
        onSubmit={handleChangePassword}
      >
        {({ values }) => (
          <Form>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <GlobitsTextField
                    name='oldPassword'
                    type="password"
                    className="w-100"
                    fullWidth
                    label={t('user.current_password')}
                    requiredLabel
                  />
                </Grid>
                <Grid item xs={12}>
                  <GlobitsTextField
                    name='password'
                    type="password"
                    className="w-100"
                    fullWidth
                    label={t('user.new_password')}
                    requiredLabel
                  />
                </Grid>
                <Grid item xs={12}>
                  <GlobitsTextField
                    name='confirmPassword'
                    type="password"
                    className="w-100"
                    fullWidth
                    label={t('user.re_password')}
                    requiredLabel
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                className="mr-12 btn btn-secondary d-inline-flex"
                variant="contained"
                // color="secondary"
                onClick={() => handleClose()}>{t('general.button.cancel')}
              </Button>
              <Button
                className="mr-0 btn btn-primary d-inline-flex"
                variant="contained"
                // color="primary"
                type='submit'
              >
                {t('general.button.update')}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </GlobitsPopup>
  );
}

export default ChangePasswordPopup;