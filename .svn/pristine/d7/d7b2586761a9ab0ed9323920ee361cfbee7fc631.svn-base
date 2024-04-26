import React, {useEffect, useState} from "react";
import {Button, Grid} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import BlockIcon from "@material-ui/icons/Block";
import {useTranslation} from "react-i18next";
import {useStore} from "../../stores";
import * as Yup from "yup";
import {observer} from "mobx-react";
import GlobitsTextField from "../../common/form/GlobitsTextField";
import PopupForm from "app/common/Component/Popup/PopupForm";

const defaultCountry = {
    id: "",
    name: "",
    code: "",
    description: null,
}

export default observer(function CountryForm({handleAfterSubmit, updateListOnClose, open}) {
    const {countryStore} = useStore();
    const {t} = useTranslation();
    const {
        handleClose,
        saveOrUpdateCountry,
        selectedCountry,
    } = countryStore;

    const [country, setCountry] = useState(defaultCountry);
    const validationSchema = Yup.object({
        // store: Yup.object().required(t("validation.required")).typeError(t("validation.required")),

    });

    useEffect(() => {
        if (selectedCountry) setCountry(selectedCountry)
        else setCountry(defaultCountry)
    }, [selectedCountry]);

    function handleFormSubmit(country) {
        let res = saveOrUpdateCountry(country);
        if (handleAfterSubmit) handleAfterSubmit(res)
    }

    return (
        <PopupForm
            size="sm"
            open={open}
            handleClose={handleClose}
            title={(selectedCountry?.id ? t("general.button.edit") : t("general.button.add")) + " quốc gia"}
            formik={{
                enableReinitialize: true,
                validationSchema: validationSchema,
                initialValues: country,
                onSubmit: (values) => handleFormSubmit(values),
            }}
            action={({isSubmitting}) => (
                <>
                    <Button
                        startIcon={<BlockIcon/>}
                        className="btn btn-secondary d-inline-flex"
                        onClick={() => handleClose(updateListOnClose)}
                    >
                        {t("general.button.cancel")}
                    </Button>
                    <Button
                        startIcon={<SaveIcon/>}
                        className="btn btn-primary d-inline-flex"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {t("general.button.save")}
                    </Button>
                </>
            )}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <GlobitsTextField label="Tên" name="name"/>
                </Grid>

                <Grid item xs={12}>
                    <GlobitsTextField label="Mã" name="code"/>
                </Grid>

                <Grid item xs={12}>
                    <GlobitsTextField label="Miêu tả" name="description"/>
                </Grid>
            </Grid>
        </PopupForm>
    );
});
