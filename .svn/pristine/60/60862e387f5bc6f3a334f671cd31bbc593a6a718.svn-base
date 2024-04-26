import { Button, Grid } from "@material-ui/core";
import { useStore } from "app/stores";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import SaveIcon from '@material-ui/icons/Save';
import BlockIcon from '@material-ui/icons/Block';
import GlobitsTextField from "app/common/form/GlobitsTextField";
import PopupForm from "app/common/Component/Popup/PopupForm";

const BankForm = (props) => {
  const { handleClose, selectedBank, editBank } = useStore().bankStore;
  const { t } = useTranslation();
  const [bank, setBank] = useState({
    name: "",
    code: "",
    shortName: "",
    organization: null,
    id: null,
  })

  const validationSchema = Yup.object({
    code: Yup.string().nullable().required(t("validation.required")),
    name: Yup.string().nullable().required(t("validation.required")),
    shortName: Yup.string().nullable().required(t("validation.required")),
    bin: Yup.string().nullable().required(t("validation.required")),
  });

  useEffect(() => {
    setBank(selectedBank)
  }, [selectedBank])

  return (
    <PopupForm
      open={props.open}
      handleClose={handleClose}
      size="sm"
      title={(selectedBank?.id ? t("general.button.edit") : t("general.button.add")) + " Tài khoản ngân hàng"}
      formik={{
        enableReinitialize: true,
        initialValues: { ...bank },
        validationSchema: validationSchema,
        onSubmit: editBank,
      }}
      action={
        <>
          <Button
            startIcon={<BlockIcon />}
            className="btn btn-secondary d-inline-flex"
            onClick={() => handleClose()}
          >
            {t("general.button.cancel")}
          </Button>
          <Button
            startIcon={<SaveIcon />}
            className="btn btn-primary d-inline-flex"
            type="submit"
          >
            {t("general.button.save")}
          </Button>
        </>
      }
    >
      <Grid container spacing={2} className="w-full">
        <Grid item xs={12} md={6}>
          <GlobitsTextField
            label="Tên ngân hàng"
            name="name"
            requiredLabel
            notDelay
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <GlobitsTextField
            label="Mã ngân hàng"
            name="code"
            requiredLabel
            notDelay
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <GlobitsTextField
            label="Tên rút gọn"
            name="shortName"
            requiredLabel
            notDelay
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <GlobitsTextField
            label="Mã BIN"
            name="bin"
            requiredLabel
            notDelay
          />
        </Grid>
      </Grid>
    </PopupForm>
  )
}

export default observer(BankForm);