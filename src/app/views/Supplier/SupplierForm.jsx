import React, {useEffect, useState} from "react";
import {Button, Grid} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import BlockIcon from "@material-ui/icons/Block";
import {useTranslation} from "react-i18next";
import {useStore} from "../../stores";
import * as Yup from "yup";
import {observer} from "mobx-react";
import LocalConstants, {LISTSUPPLIERTYPE} from "app/LocalConstants";
import GlobitsTextField from "../../common/form/GlobitsTextField";
import PopupForm from "app/common/Component/Popup/PopupForm";
import GlobitsPagingAutocomplete from "../../common/form/GlobitsPagingAutocomplete";
import GlobitsSelectInput from "../../common/form/GlobitsSelectInput";
import {pagingCountry} from "../Country/CountryService";


export default observer(function SupplierForm({handleAfterSubmit}) {
    const {supplierStore} = useStore();
    const {t} = useTranslation();
    const {
        handleClose,
        createSupplier,
        editSupplier,
        selectedSupplier,
        shouldOpenEditorDialog
    } = supplierStore;

    const [supplier, setSupplier] = useState({
        id: "",
        name: "",
        code: "",
        address: "",
        type: "",
        phoneNumber: "",
        email: "",
        representative: ""
    });

    const validationSchema = Yup.object({
        // store: Yup.object().required(t("validation.required")).typeError(t("validation.required")),
        name: Yup.string().required(t("validation.required")),
        phoneNumber: Yup.string().nullable()
            .matches(LocalConstants.PhoneRegExp, "SĐT không đúng định dạng"),
        email: Yup.string().email(t("validation.email")).nullable(),
    });

    useEffect(() => {
        if (selectedSupplier) setSupplier(selectedSupplier);
        else setSupplier({
            id: "",
            name: "",
            code: "",
            address: "",
            type: "",
            phoneNumber: "",
            email: "",
            representative: ""
        })
    }, [selectedSupplier]);

    async function handleFormSubmit(supplier) {
        let res;
        if (supplier.id.length === 0) {
            res = await createSupplier(supplier);
        } else {
            res = await editSupplier(supplier);
        }
        if (handleAfterSubmit) {
            handleAfterSubmit(res?.data)
        }
    }

    return (
        <PopupForm
            size='md'
            open={shouldOpenEditorDialog}
            handleClose={handleClose}
            noDiaLogContent
            title={(selectedSupplier?.id ? t("general.button.edit") : t("general.button.add")) + " " + t("supplier.title")}
            formik={{
                enableReinitialize: true,
                validationSchema: validationSchema,
                initialValues: supplier,
                onSubmit: handleFormSubmit,
            }}
            action={({isSubmitting}) => (
                <>
                    <Button
                        startIcon={<BlockIcon/>}
                        variant="contained"
                        className="mr-12 btn btn-secondary d-inline-flex"
                        color="secondary"
                        onClick={() => handleClose()}
                    >
                        {t("general.button.cancel")}
                    </Button>
                    <Button
                        startIcon={<SaveIcon/>}
                        className="mr-0 btn btn-primary d-inline-flex"
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {t("general.button.save")}
                    </Button>
                </>
            )}
        >
            <Grid container spacing={2}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <GlobitsTextField variant="standard" label={t("supplier.name")} name="name" requiredLabel/>
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <GlobitsTextField variant="standard" label={t("supplier.address")} name="address"/>
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <GlobitsTextField variant="standard" label={t("supplier.phoneNumber")} name="phoneNumber"/>
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <GlobitsTextField variant="standard" label={t("supplier.email")} name="email"/>
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <GlobitsTextField variant="standard" label={t("supplier.representative")} name="representative"/>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <GlobitsSelectInput options={LISTSUPPLIERTYPE} variant="standard" label={t("supplier.type")}
                                        name="type"/>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <GlobitsPagingAutocomplete
                        variant="standard" label={t("supplier.country")} name="country"
                        api={pagingCountry}
                    />
                </Grid>
            </Grid>
        </PopupForm>
    );
});
