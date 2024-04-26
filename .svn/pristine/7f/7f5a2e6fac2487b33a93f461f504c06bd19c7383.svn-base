import { Button, Grid } from "@material-ui/core";
import { useStore } from "app/stores";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import SaveIcon from '@material-ui/icons/Save';
import BlockIcon from '@material-ui/icons/Block';
import GlobitsTextField from "app/common/form/GlobitsTextField";
import GlobitsTimePicker from "app/common/form/GlobitsTimePicker";
import { dateYupTypeValidation } from "app/common/CommonFunctions";
import PopupForm from "app/common/Component/Popup/PopupForm";
Yup.addMethod(Yup.date, "dateYupTypeValidation", function (field, fieldName) {
  return dateYupTypeValidation(this, field, fieldName);
});
const ShiftworkForm = (props) => {
  const { handleClose, selectedShiftwork, createShiftwork, editShiftwork } = useStore().ShiftworkStore;
  const { t } = useTranslation();
  const [shiftwork, setShiftwork] = useState({
    name: "",
    code: "",
    organization: null,
    start: null,
    end: null,
    id: null,
  })

  const validationSchema = Yup.object({
    name: Yup.string().required(t("validation.required")).nullable(),
    code: Yup.string().required(t("validation.required")).nullable(),
    start: Yup.date().nullable()
      .dateYupTypeValidation("start", "Thời gian bắt đầu")
      .required(t("validation.required")),
    end: Yup.date().nullable()
      .dateYupTypeValidation("end", "Thời gian kết thúc")
      .required(t("validation.required")),
  });

  useEffect(() => {
    setShiftwork(selectedShiftwork)
  }, [selectedShiftwork])

  const handleSubmit = (values) => {
    if (values.id) {
      editShiftwork(values);
    } else {
      createShiftwork(values);
    }
  }

  return (
    <PopupForm
      className="dialog-container"
      open={props.open}
      handleClose={handleClose}
      size="sm"
      title={(selectedShiftwork?.id ? t("general.button.edit") : t("general.button.add")) + " " + t("shiftWork.title")}
      formik={{
        enableReinitialize: true,
        initialValues: { ...shiftwork },
        validationSchema: validationSchema,
        onSubmit: handleSubmit,
      }}
      action={
        <>
          <Button
            startIcon={<BlockIcon />}
            className="mr-12 btn btn-secondary d-inline-flex"
            onClick={() => handleClose()}
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
      <Grid container spacing={2} className="w-full">
        <Grid item xs={12} md={6}>
          <GlobitsTextField variant="standard" label={t("shiftWork.name")} name="name" requiredLabel />
        </Grid>

        <Grid item xs={12} md={6}>
          <GlobitsTextField variant="standard" label={t("shiftWork.code")} name="code" requiredLabel />
        </Grid>

        <Grid item xs={12} md={6}>
          <GlobitsTimePicker variant="standard" label={t("shiftWork.start")} name="start" requiredLabel format="HH:mm" />
        </Grid>

        <Grid item xs={12} md={6}>
          <GlobitsTimePicker variant="standard" label={t("shiftWork.end")} name="end" requiredLabel format="HH:mm" />
        </Grid>
      </Grid>
    </PopupForm>
  )
}

export default observer(ShiftworkForm);