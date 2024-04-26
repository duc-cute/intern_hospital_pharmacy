import { useStore } from 'app/stores';
import { observer } from 'mobx-react'
import React from 'react'
import { useTranslation } from 'react-i18next';
import * as Yup from "yup";
import SaveIcon from '@material-ui/icons/Save';
import { Button, Grid } from '@material-ui/core';
import BlockIcon from '@material-ui/icons/Block';
import GlobitsDateTimePicker from 'app/common/form/GlobitsDateTimePicker';
import GlobitsTextField from 'app/common/form/GlobitsTextField';
import { SaleAssociate } from 'app/common/Model/SaleAssociate';
import GlobitsNumberInput from 'app/common/form/GlobitsNumberInput';
import GlobitsRadioButton from 'app/common/form/GlobitsRadioButton';
import { Gender } from 'app/common/Constant/LocalConstant';
import PopupForm from 'app/common/Component/Popup/PopupForm';

export const SaleAssociateForm = (props) => {
  const { handleClose, selectedSaleAss, createOrUpdateSaleAss } = useStore().saleAssociateStore;
  const { t } = useTranslation();

  const validationSchema = Yup.object({
    code: Yup.string().required(t("validation.required")).nullable(),
  });

  return (
    <PopupForm
      open={props.open}
      handleClose={handleClose}
      size="sm"
      title={(selectedSaleAss?.id ? t("general.button.edit") : t("general.button.add")) + " " + t("saleAssociate.title")}
      formik={{
        enableReinitialize: true,
        initialValues: selectedSaleAss?.id ? selectedSaleAss : new SaleAssociate(),
        validationSchema: validationSchema,
        onSubmit: createOrUpdateSaleAss
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
          <GlobitsTextField label="Tên CTV" name="displayName" />
        </Grid>

        <Grid item xs={12} md={6}>
          <GlobitsTextField label={t("saleAssociate.code")} name="code" requiredLabel />
        </Grid>

        <Grid item xs={12} md={6}>
          <GlobitsNumberInput type="text" name="phoneNumber" label="Số điện thoại" notDefault />
        </Grid>

        <Grid item xs={12} md={6}>
          <GlobitsTextField label="Tên thường gọi" name="shortName" />
        </Grid>

        <Grid item xs={12} md={6}>
          <GlobitsTextField label="Email" name="email" type="email" />
        </Grid>

        <Grid item xs={12} md={6}>
          <GlobitsDateTimePicker name="birthDate" label="Ngày sinh" />
        </Grid>

        <Grid item xs={12} md={6}>
          <GlobitsDateTimePicker
            label={t("saleAssociate.startTime")}
            name="startTime"
            requiredLabel
            format="HH:mm"
            isDateTimePicker
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <GlobitsDateTimePicker
            label={t("saleAssociate.endTime")}
            name="endTime"
            requiredLabel
            format="HH:mm"
            isDateTimePicker
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <GlobitsNumberInput type="text" name="idNumber" label="Số CMND/CCCD" notDefault />
        </Grid>

        <Grid item xs={12} md={6} className="flex items-center gap-20">
          <p>Giới tính</p>

          <GlobitsRadioButton name="gender" value={Gender.MALE} label="Nam" type="radio" />
          <GlobitsRadioButton name="gender" value={Gender.FEMALE} label="Nữ" type="radio" />
        </Grid>

      </Grid>
    </PopupForm>
  )
}

export default observer(SaleAssociateForm)