import React, { useEffect, useState } from "react";
import { Button, Grid } from "@material-ui/core";
import { useStore } from "app/stores";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import SaveIcon from '@material-ui/icons/Save';
import BlockIcon from '@material-ui/icons/Block';
import GlobitsAutocomplete from "app/common/form/GlobitsAutocomplete";
import { getAllByLevel, getAllChildByParentId } from "../AdministrativeUnit/AdministrativeUnitService";
import { LevelAdministrative } from "app/common/Constant/LocalConstant";
import * as Yup from "yup";
import { DeliveryPartner } from "app/common/Model/Delivery";
import GlobitsTextField from "app/common/form/GlobitsTextField";
import GlobitsVNDCurrencyInput from "app/common/form/GlobitsVNDCurrencyInput";
import PopupForm from "app/common/Component/Popup/PopupForm";

const DeliveryPartnerForm = (props) => {
  const { handleClose, selectedDelPartner, createOrUpdateDelPartner } = useStore().DeliveryPartnerStore;
  const { t } = useTranslation();

  const [listCity, setListCity] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listWard, setListWard] = useState([]);

  useEffect(() => {
    getCity();
  }, []);

  const getCity = async () => {
    try {
      const res = await getAllByLevel(LevelAdministrative.PROVINCE);
      if (res?.data) {
        setListCity(res?.data);
      }
    } catch (err) {
      console.error(err);
    }
  }

  const validationSchema = Yup.object({
    name: Yup.string().required(t("validation.required")).nullable(),
    code: Yup.string().required(t("validation.required")).nullable(),
    ward: Yup.object().required(t("validation.required")).nullable(),
    province: Yup.object().required(t("validation.required")).nullable(),
    district: Yup.object().required(t("validation.required")).nullable(),
  });

  return (
    <PopupForm
      open={props.open}
      handleClose={handleClose}
      size="sm"
      title={(selectedDelPartner?.id ? t("general.button.edit") : t("general.button.add")) + " Đơn Vị"}
      formik={{
        enableReinitialize: true,
        validationSchema: validationSchema,
        initialValues: selectedDelPartner?.id ? selectedDelPartner : new DeliveryPartner(),
        onSubmit: (values) => createOrUpdateDelPartner(values),
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
      {({ setFieldValue }) => {
        async function handleChangeCity(_, value) {
          setFieldValue('province', value)
          setFieldValue('district', null)
          setFieldValue('ward', null)
          let response = value ? await getAllChildByParentId(value?.id) : null;
          setListDistrict(response?.data || []);
          setListWard([]);
        }

        async function handleChangeDistrict(_, value) {
          setFieldValue('district', value)
          setFieldValue('ward', null)
          const response = value ? await getAllChildByParentId(value?.id) : null;
          setListWard(response?.data || []);
        }

        return (
          <Grid container spacing={2} className="w-full">
            <Grid item xs={12} md={6}>
              <GlobitsTextField label="Tên đơn vị" name="name" requiredLabel />

            </Grid>
            <Grid item xs={12} md={6}>
              <GlobitsTextField label="Mã đơn vị" name="code" requiredLabel />

            </Grid>
            <Grid item xs={12} md={6}>
              <GlobitsTextField label="Số điện thoại" name="phoneNumber" />
            </Grid>

            <Grid item xs={12} md={6}>
              <GlobitsTextField label="Địa chỉ" name="address" />
            </Grid>

            <Grid item xs={12} md={6}>
              <GlobitsVNDCurrencyInput label="Giá vận chuyển" name="shippingCost" />
            </Grid>

            <Grid item xs={12} md={6}>
              <GlobitsAutocomplete name="province" options={listCity} label="Tỉnh/Thành" handleChange={handleChangeCity} requiredLabel />
            </Grid>

            <Grid item xs={12} md={6}>
              <GlobitsAutocomplete name="district" options={listDistrict} label="Quận/Huyện" handleChange={handleChangeDistrict} requiredLabel/>
            </Grid>

            <Grid item xs={12} md={6}>
              <GlobitsAutocomplete name="ward" options={listWard} label="Xã/Phường" requiredLabel/>
            </Grid>

            <Grid item xs={12}>
              <GlobitsTextField label="Mô tả" name="description" multiline minRows={3} />
            </Grid>
          </Grid>
        )
      }}
    </PopupForm>
  )
}

export default observer(DeliveryPartnerForm);