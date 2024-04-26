import { Grid } from '@material-ui/core';
import PopupForm from 'app/common/Component/Popup/PopupForm'
import { CustomerType, Gender } from 'app/common/Constant/LocalConstant';
import GlobitsDateTimePicker from 'app/common/form/GlobitsDateTimePicker';
import GlobitsRadioButton from 'app/common/form/GlobitsRadioButton';
import GlobitsTextField from 'app/common/form/GlobitsTextField';
import { useStore } from 'app/stores'
import { observer } from 'mobx-react';
import React, { memo, useEffect } from 'react'
import { getAllByLevel, getAllChildByParentId } from '../AdministrativeUnit/AdministrativeUnitService';
import { useState } from 'react';
import GlobitsAutocomplete from 'app/common/form/GlobitsAutocomplete';
import { LevelAdministrative } from 'app/common/Constant/LocalConstant';
import * as Yup from "yup";
import { useTranslation } from 'react-i18next';

function CreateOrEditCustomer({ onSaveCustomer, open, handleClose }) {
    const { selectedCustomer, createCustomer, editCustomer } = useStore().customerStore;
    const { t } = useTranslation()

    const [listCity, setListCity] = useState([]);
    const [listDistrict, setListDistrict] = useState([]);
    const [listWard, setListWard] = useState([]);

    useEffect(() => {
        getCity();
        // initializeLocation();
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

    // const initializeLocation = async () => {
    //     const { city, district } = selectedCustomer;
    //     if (city.id) {
    //         const { data } = await getAllChildByParentId(city.id);
    //         setListDistrict(data)
    //     }
    //     if (district.id) {
    //         const { data } = await getAllChildByParentId(district.id);
    //         setListDistrict(data)
    //     }
    // }

    const validationSchema = Yup.object({
        name: Yup.string().required(t("validation.required")).nullable(),
        code: Yup.string().required(t("validation.required")).nullable(),
    });

    const handleSubmit = async (values) => {
        try {
            let data = null
            if (values.id) {
                data = await editCustomer(values);
            } else {
                data = await createCustomer(values);
            }

            if (onSaveCustomer) {
                onSaveCustomer(data)
            }
        } catch {

        }
    }

    return (
        <PopupForm
            open={open}
            title={`${!selectedCustomer?.id ? "Thêm" : "Cập nhật"} khách hàng`}
            handleClose={handleClose}
            formik={{
                enableReinitialize: true,
                initialValues: { ...selectedCustomer, customerType: CustomerType.INDIVIDUAL },
                validationSchema,
                onSubmit: handleSubmit
            }}
        >
            {({ setFieldValue }) => {
                async function handleChangeCity(_, value) {
                    setFieldValue('city', value)
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
                    <Grid container spacing={2}>
                        <Grid item md={6}>
                            <GlobitsTextField name="name" label="Tên khách hàng" requiredLabel />
                        </Grid>

                        <Grid item md={6}>
                            <GlobitsTextField name="code" label="Mã khách hàng" requiredLabel />
                        </Grid>

                        <Grid item md={4}>
                            <GlobitsDateTimePicker name="birthDate" label="Ngày sinh" />
                        </Grid>

                        <Grid item md={4}>
                            <GlobitsTextField name="email" label="Email" type="email" />
                        </Grid>

                        <Grid item md={4}>
                            <GlobitsTextField name="phoneNumber" label="Số điện thoại" />
                        </Grid>

                        <Grid item md={4}>
                            <GlobitsAutocomplete name="city" options={listCity} label="Tỉnh/Thành" handleChange={handleChangeCity} />
                        </Grid>
                        <Grid item md={4}>
                            <GlobitsAutocomplete name="district" options={listDistrict} label="Quận/Huyện" handleChange={handleChangeDistrict} />
                        </Grid>
                        <Grid item md={4}>
                            <GlobitsAutocomplete name="ward" options={listWard} label="Xã/Phường" />
                        </Grid>

                        <Grid item md={12}>
                            <GlobitsTextField name="address" label="Địa chỉ" multiline minRows={3} />
                        </Grid>

                        <Grid item md={12} className='flex items-center gap-10'>
                            Giới tính:
                            <GlobitsRadioButton name="gender" value={Gender.MALE} label="Nam" type="radio" />
                            <GlobitsRadioButton name="gender" value={Gender.FEMALE} label="Nữ" type="radio" />
                        </Grid>

                        <Grid item md={12} className='flex items-center gap-10'>
                            Loại khách hàng:
                            <GlobitsRadioButton name="customerType" value={CustomerType.INDIVIDUAL} label="Cá nhân" type="radio" />
                            <GlobitsRadioButton name="customerType" value={CustomerType.COMPANY} label="Công ty" type="radio" />
                        </Grid>
                    </Grid>
                )
            }}
        </PopupForm>
    )
}

export default memo(observer(CreateOrEditCustomer));