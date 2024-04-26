import React from "react";
import GlobitsTextField from "app/common/form/GlobitsTextField";
import { Chip, Collapse, Grid } from "@material-ui/core";
import GlobitsCheckBox from "app/common/form/GlobitsCheckBox";
import { useTranslation } from "react-i18next";
import { useFormikContext } from "formik";
import GlobitsAsyncAutocomplete from "app/common/form/GlobitsAsyncAutocomplete";
import { getAllRoles } from "app/views/User/UserService";

export default function CreateUserStaffForm() {
  const { t } = useTranslation();
  const { values, setFieldValue } = useFormikContext();
  return (
    <>
      <Grid item xs={12} md={3} className="flex flex-middle">
        {!values?.user?.id ? (
          <GlobitsCheckBox
            name="createUser"
            label="Tạo tài khoản"
            onChange={(event) => {
              const checked = event.target.checked;
              setFieldValue("createUser", checked);
              setFieldValue("user", {
                username: null,
                password: null,
                confirmPassword: null,
                roles: [],
                active: true,
              });
            }}
          />
        ) : (
          <GlobitsTextField
            name="user.username"
            label="Tài khoản"
            disabled
            notDelay
          />
        )}
      </Grid>
      <Collapse in={values?.createUser} className="w-100">
        <Grid container spacing={2} className="m-0 w-100">
          <Grid item xs={12} md={3}>
            <GlobitsTextField
              name="user.username"
              label={t("user.username")}
              requiredLabel
              notDelay
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <GlobitsTextField
              variant="standard"
              type="password"
              label={t("user.password")}
              validate="true"
              name="user.password"
              notDelay
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <GlobitsTextField
              variant="standard"
              type="password"
              validate="true"
              label={t("user.re_password")}
              name="user.confirmPassword"
              notDelay
            />
          </Grid>
          <Grid item xs={12} md={3} className="flex flex-middle">
            <GlobitsCheckBox label={t("user.active")} name="user.active" />
          </Grid>
          <Grid item xs={12} md={3}>
            <GlobitsAsyncAutocomplete
              variant="standard"
              label={t("user.role.title")}
              name="user.roles"
              multiple
              api={getAllRoles}
              requiredLabel
              disableClearable
              hiddenOptions={["ROLE_SUPER_ADMIN"]}
              keyOption="authority"
              renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => {
                  return (
                    <Chip
                      label={option?.name}
                      {...getTagProps({ index })}
                      disabled={option?.authority === "ROLE_SUPER_ADMIN"}
                    />
                  );
                })
              }
            />
          </Grid>
        </Grid>
      </Collapse>
    </>
  );
}
