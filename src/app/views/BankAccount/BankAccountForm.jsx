import { Button, Grid } from "@material-ui/core";
import { useStore } from "app/stores";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import SaveIcon from '@material-ui/icons/Save';
import BlockIcon from '@material-ui/icons/Block';
import GlobitsTextField from "app/common/form/GlobitsTextField";
import GlobitsPagingAutocomplete from "app/common/form/GlobitsPagingAutocomplete";
import { pagingBank } from "../Bank/BankService";
import PopupForm from "app/common/Component/Popup/PopupForm";

const BankAccountForm = (props) => {
  const { handleClose, selectedBankAccount, editBankAccount } = useStore().bankAccountStore;
  const { t } = useTranslation();
  const [bankAccount, setBankAccount] = useState({
    name: "",
    accountNumber: "",
    organization: null,
    bank: null,
    id: null,
  })

  const validationSchema = Yup.object({
    name: Yup.string().nullable().required(t("validation.required")),
    bank: Yup.mixed().nullable().required(t("validation.required")),
    accountNumber: Yup.mixed().nullable().required(t("validation.required")),
  });

  useEffect(() => {
    setBankAccount(selectedBankAccount)
  }, [selectedBankAccount])

  return (
    <PopupForm
      open={props.open}
      handleClose={handleClose}
      size="sm"
      title={(selectedBankAccount?.id ? t("general.button.edit") : t("general.button.add")) + " Tài khoản ngân hàng"}
      formik={{
        enableReinitialize: true,
        initialValues: { ...bankAccount },
        validationSchema: validationSchema,
        onSubmit: editBankAccount
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
        <Grid item xs={12}>
          <GlobitsPagingAutocomplete
            label="Ngân hàng"
            name="bank"
            api={pagingBank}
            requiredLabel
            getOptionLabel={(option) => {
              let ret = "";
              if (option?.shortName) {
                if (ret) ret += " - "
                ret += option.shortName
              }
              if (option?.name) {
                if (ret) ret += " - "
                ret += option.name
              }
              return ret;
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <GlobitsTextField label="Tên chủ thẻ" name="name" requiredLabel />
        </Grid>

        <Grid item xs={12}>
          <GlobitsTextField label="Số tài khoản" name="accountNumber" requiredLabel />
        </Grid>

        <Grid item xs={12}>
          <GlobitsTextField label="Mã thẻ" name="cardCode" />
        </Grid>
      </Grid>
    </PopupForm>
  )
}

export default observer(BankAccountForm);