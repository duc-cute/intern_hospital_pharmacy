import React from "react";
import { Grid, Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import BlockIcon from "@material-ui/icons/Block";
import { useTranslation } from "react-i18next";
import { useStore } from "app/stores";
import * as Yup from "yup";
import GlobitsTextField from "app/common/form/GlobitsTextField";
import GlobitsSelectInput from "app/common/form/GlobitsSelectInput";
import { observer } from "mobx-react";
import UserIndex from "../User/UserIndex";
import { ORG_PRODUCT_TYPE } from "app/common/Constant/LocalConstant";
import PopupForm from "app/common/Component/Popup/PopupForm";

function StoreOrganizationForm() {
  const { storeOrganizationStore } = useStore();
  const { t } = useTranslation();
  const {
    selectedStoreOrganization,
    openFormEditStoreOrganization,
    handleSubmitFormStoreOrganization,
    handleClosePopup
  } = storeOrganizationStore;

  const validationSchema = Yup.object({
    code: Yup.mixed().nullable().required(t("validation.required")),
    name: Yup.mixed().nullable().required(t("validation.required")),
    orgProductType: Yup.mixed().nullable().required(t("validation.required")),
  });

  return (
    <PopupForm
      id="storeOrganizationForm"
      size="md"
      title={(selectedStoreOrganization?.id ? t("general.button.edit") : t("general.button.add")) + " " + t("storeOrganization.title")}
      open={openFormEditStoreOrganization}
      handleClose={handleClosePopup}
      formik={{
        validationSchema: validationSchema,
        enableReinitialize: true,
        initialValues: selectedStoreOrganization,
        onSubmit: handleSubmitFormStoreOrganization
      }}
      action={
        <>
          <Button
            startIcon={<BlockIcon />}
            className="mr-12 btn btn-secondary d-inline-flex"
            onClick={handleClosePopup}
          >
            {t("general.button.cancel")}
          </Button>
          <Button
            startIcon={<SaveIcon />}
            className="mr-0 btn btn-primary d-inline-flex"
            type="submit"
          >
            {t("general.button.save")}
          </Button>
        </>
      }
    >
      {({ values }) => (
        <Grid container spacing={2}>
          <Grid item md={4} xs={12}>
            <GlobitsTextField
              label={t("storeOrganization.code")}
              name="code"
              requiredLabel
              notDelay
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <GlobitsTextField
              label={t("storeOrganization.name")}
              name="name"
              requiredLabel
              notDelay
            />
          </Grid>

          <Grid item md={4} xs={12}>
            <GlobitsSelectInput
              label={t("storeOrganization.orgProductType")}
              name="orgProductType"
              options={ORG_PRODUCT_TYPE}
              requiredLabel
            />
          </Grid>

          {values?.id && (
            <Grid item xs={12}>
              <h4 className="m-0 text-primary mb-2">Danh sách tài khoản của cơ sở</h4>

              <UserIndex storeOrganizationId={values?.id} />
            </Grid>
          )}
        </Grid>
      )}
    </PopupForm>
  );
}

export default observer(StoreOrganizationForm);