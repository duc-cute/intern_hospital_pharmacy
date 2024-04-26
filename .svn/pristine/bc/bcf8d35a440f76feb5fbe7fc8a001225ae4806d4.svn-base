import { Button, Grid } from "@material-ui/core";
import { useStore } from "app/stores";
import { observer } from "mobx-react"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import SaveIcon from '@material-ui/icons/Save';
import BlockIcon from '@material-ui/icons/Block';
import GlobitsTextField from "app/common/form/GlobitsTextField";
import { getAllByLevel, getAllChildByParentId } from "../AdministrativeUnit/AdministrativeUnitService";
import { LevelAdministrative } from "app/common/Constant/LocalConstant";
import GlobitsAutocomplete from "app/common/form/GlobitsAutocomplete";
import PopupForm from "app/common/Component/Popup/PopupForm";

const DeliveryPlaceForm = (props) => {
  const { handleClose, selectedDelPlace, createDelPlace, editDelPlace } = useStore().DeliveryPlaceStore;
  const { t } = useTranslation();
  const [delPlace, setDelPlace] = useState({
    name: "",
    code: "",
    phoneNumber: "",
    address: "",
    description: "",
    administrativeUnit: null,
    administrativeUnitProvince: null,
    administrativeUnitDistrict: null
  })
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
    administrativeUnit: Yup.object().required(t("validation.required")).nullable(),
    administrativeUnitProvince: Yup.object().required(t("validation.required")).nullable(),
    administrativeUnitDistrict: Yup.object().required(t("validation.required")).nullable(),
  });

  useEffect(() => {
    if (selectedDelPlace) {
      setDelPlace({
        ...selectedDelPlace,
        administrativeUnitProvince: selectedDelPlace.administrativeUnit.parent.parent,
        administrativeUnitDistrict: selectedDelPlace.administrativeUnit.parent
      })
    } else {
      setDelPlace(selectedDelPlace)
    }
  }, [selectedDelPlace])

  const handleSubmit = (values) => {
    if (values.id) {
      editDelPlace(values);
    } else {
      createDelPlace(values);
    }
  }

  return (
    <PopupForm
      open={props.open}
      handleClose={handleClose}
      size="sm"
      title={(selectedDelPlace?.id ? t("general.button.edit") : t("general.button.add")) + " Địa chỉ"}
      formik={{
        enableReinitialize: true,
        initialValues: { ...delPlace },
        validationSchema: validationSchema,
        onSubmit: handleSubmit
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
          setFieldValue('administrativeUnitProvince', value)
          setFieldValue('administrativeUnitDistrict', null)
          setFieldValue('administrativeUnit', null)
          let response = value ? await getAllChildByParentId(value?.id) : null;
          setListDistrict(response?.data || []);
          setListWard([]);
        }

        async function handleChangeDistrict(_, value) {
          setFieldValue('administrativeUnitDistrict', value)
          const response = value ? await getAllChildByParentId(value?.id) : null;
          setListWard(response?.data || []);
          setFieldValue('administrativeUnit', null)
        }

        return (
          <Grid container spacing={2} className="w-full">
            <Grid item xs={12} md={6}>
              <GlobitsTextField label={t("deliveryPlace.name")} name="name" requiredLabel />
            </Grid>

            <Grid item xs={12} md={6}>
              <GlobitsTextField label={t("deliveryPlace.code")} name="code" requiredLabel />
            </Grid>

            <Grid item xs={12} md={6}>
              <GlobitsTextField label={t("deliveryPlace.phoneNumber")} name="phoneNumber" />
            </Grid>

            <Grid item xs={12} md={6}>
              <GlobitsTextField label={t("deliveryPlace.address")} name="address" />
            </Grid>

            <Grid item xs={12} md={6}>
              <GlobitsTextField label={t("deliveryPlace.description")} name="description" />
            </Grid>

            <Grid item xs={12} md={6}>
              <GlobitsAutocomplete name="administrativeUnitProvince" options={listCity} label="Tỉnh/Thành" handleChange={handleChangeCity} />
            </Grid>

            <Grid item xs={12} md={6}>
              <GlobitsAutocomplete name="administrativeUnitDistrict" options={listDistrict} label="Quận/Huyện" handleChange={handleChangeDistrict} />
            </Grid>

            <Grid item xs={12} md={6}>
              <GlobitsAutocomplete name="administrativeUnit" options={listWard} label="Xã/Phường" />
            </Grid>
          </Grid>
        )
      }}
    </PopupForm>
  )
}

export default observer(DeliveryPlaceForm);