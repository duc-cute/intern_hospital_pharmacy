import React, { useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import BlockIcon from "@material-ui/icons/Block";
import { useTranslation } from "react-i18next";
import { useStore } from "../../stores";
import * as Yup from "yup";
import { observer } from "mobx-react";
import GlobitsTextField from "../../common/form/GlobitsTextField";
import PopupForm from "app/common/Component/Popup/PopupForm";

const defaultPackagingForm = {
  id: "",
  name: "",
  code: "",
  orderNumber: null,
}

export default observer(function PackagingFormPopup({ handleAfterSubmit, updateListOnClose, open }) {
  const { packagingFormStore } = useStore();
  const { t } = useTranslation();
  const {
    handleClose,
    createPackagingForm,
    editPackagingForm,
    selectedPackagingForm,
  } = packagingFormStore;

  const [PackagingForm, setPackagingForm] = useState(defaultPackagingForm);
  const validationSchema = Yup.object({
    // store: Yup.object().required(t("validation.required")).typeError(t("validation.required")),

  });

  useEffect(() => {
    if (selectedPackagingForm) setPackagingForm(selectedPackagingForm)
    else setPackagingForm(defaultPackagingForm)
  }, [selectedPackagingForm]);

  function handleFormSubmit(PackagingForm) {
    let res;
    if (PackagingForm?.id?.length === 0) {
      res = createPackagingForm(PackagingForm);
    } else {
      res = editPackagingForm(PackagingForm);
    }
    if (handleAfterSubmit) handleAfterSubmit(res)
  }

  return (
    <PopupForm
      size="sm"
      open={open}
      handleClose={handleClose}
      title={(selectedPackagingForm?.id ? t("general.button.edit") : t("general.button.add")) + " nhóm phân loại"}
      formik={{
        enableReinitialize: true,
        validationSchema: validationSchema,
        initialValues: PackagingForm,
        onSubmit: (values) => handleFormSubmit(values),
      }}
      action={({ isSubmitting }) => (
        <>
          <Button
            startIcon={<BlockIcon />}
            className="btn btn-secondary d-inline-flex"
            onClick={() => handleClose(updateListOnClose)}
          >
            {t("general.button.cancel")}
          </Button>
          <Button
            startIcon={<SaveIcon />}
            className="btn btn-primary d-inline-flex"
            type="submit"
            disabled={isSubmitting}
          >
            {t("general.button.save")}
          </Button>
        </>
      )}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <GlobitsTextField label="Tên dạng bào chế" name="name" />
        </Grid>

        <Grid item xs={12}>
          <GlobitsTextField label="Mã dạng bào chế" name="code" />
        </Grid>

        <Grid item xs={12}>
          <GlobitsTextField label="Thứ tự hiển thị" name="orderNumber" />
        </Grid>
      </Grid>
    </PopupForm>
  );
});
