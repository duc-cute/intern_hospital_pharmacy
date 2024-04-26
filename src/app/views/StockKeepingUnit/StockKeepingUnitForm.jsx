import React from "react";
import { useTranslation } from "react-i18next";
import { useStore } from "../../stores";
import * as Yup from "yup";
import { observer } from "mobx-react";
import TextField from "../../common/form/GlobitsTextField";
import PopupForm from "app/common/Component/Popup/PopupForm";
import { memo } from "react";

function StockKeepingUnitForm() {
  const { stockKeepingUnitStore } = useStore();
  const { t } = useTranslation();
  const {
    openForm,
    selectedStockKeepingUnit,
    handleClosePopup,
    handleSaveStockKeepUnit
  } = stockKeepingUnitStore;

  const validationSchema = Yup.object({
    code: Yup.string().required(t("validation.required")).nullable(),
    name: Yup.string().required(t("validation.required")).nullable(),
  });

  return (
    <PopupForm
      open={openForm}
      handleClose={handleClosePopup}
      title={(selectedStockKeepingUnit?.id ? t("general.button.edit") : t("general.button.add")) + " " + t("stockKeepingUnit.title")}
      size="xs"
      formik={{
        enableReinitialize: true,
        validationSchema: validationSchema,
        initialValues: selectedStockKeepingUnit,
        onSubmit: handleSaveStockKeepUnit
      }}
    >
          <TextField label={t("stockKeepingUnit.name")} name="name" requiredLabel notDelay />

          <TextField label={t("stockKeepingUnit.code")} name="code" requiredLabel notDelay className="mt-16" />
    </PopupForm>
  );
};

export default memo(observer(StockKeepingUnitForm));