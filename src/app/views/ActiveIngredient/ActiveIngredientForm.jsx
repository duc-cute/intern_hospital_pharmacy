import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import BlockIcon from "@material-ui/icons/Block";
import { useTranslation } from "react-i18next";
import { useStore } from "../../stores";
import * as Yup from "yup";
import { observer } from "mobx-react";
import GlobitsTextField from "../../common/form/GlobitsTextField";
import PopupForm from "app/common/Component/Popup/PopupForm";

export default observer(function ActiveIngredientForm({ handleAfterSubmit }) {
  const { t } = useTranslation();
  const { activeIngredientStore } = useStore();

  const {
    shouldOpenEditorDialog,
    handleClose,
    createActiveIngredient,
    editActiveIngredient,
    selectedActiveIngredient,
  } = activeIngredientStore;

  const [activeIngredient, setActiveIngredient] = useState({
    id: null,
    code: null,
    name: null,
  });

  const validationSchema = Yup.object({
    code: Yup.string().required(t("validation.required")).nullable(),
    name: Yup.string().required(t("validation.required")).nullable(),
  });

  useEffect(() => {
    if (selectedActiveIngredient) setActiveIngredient(selectedActiveIngredient);
  }, [selectedActiveIngredient]);

  async function handleFormSubmit(activeIngredient) {
    let res = null;
    if (!activeIngredient.id) {
      res = await createActiveIngredient(activeIngredient);
    } else {
      res = await editActiveIngredient(activeIngredient);
    }
    if (handleAfterSubmit) handleAfterSubmit(res)
  }


  return (
    <PopupForm
      size="sm"
      title={(selectedActiveIngredient?.id ? t("general.button.edit") : t("general.button.add")) + " " + t("activeIngredient.title")}
      open={shouldOpenEditorDialog}
      handleClose={handleClose}
      formik={{
        enableReinitialize: true,
        validationSchema: validationSchema,
        initialValues: activeIngredient,
        onSubmit: handleFormSubmit,
      }}
      action={
        <>
          <Button
            startIcon={<BlockIcon />}
            variant="contained"
            className="mr-12 btn btn-secondary d-inline-flex"
            color="secondary"
            onClick={() => handleClose()}
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
        </>
      }
    >
      <GlobitsTextField label={t("activeIngredient.name")} name="name" requiredLabel />
      <GlobitsTextField label={t("activeIngredient.code")} name="code" requiredLabel className="mt-8" />
      <GlobitsTextField label={t("activeIngredient.healthInsuranceCode")} name="healthInsuranceCode" className="mt-8" />
    </PopupForm>
  )
});
