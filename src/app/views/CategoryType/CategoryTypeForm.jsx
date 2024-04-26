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

const defaultCategoryType = {
    id: "",
    name: "",
    code: "",
    orderNumber: null,
}

export default observer(function CategoryTypeForm({handleAfterSubmit, updateListOnClose, open}) {
    const {categoryTypeStore} = useStore();
    const {t} = useTranslation();
    const {
        handleClose,
        createOrUpdateCategoryType,
        // createCategoryType,
        // editCategoryType,
        selectedCategoryType,
    } = categoryTypeStore;

    const [categoryType, setCategoryType] = useState(defaultCategoryType);
    const validationSchema = Yup.object({
        // store: Yup.object().required(t("validation.required")).typeError(t("validation.required")),

    });

    useEffect(() => {
        if (selectedCategoryType) setCategoryType(selectedCategoryType)
        else setCategoryType(defaultCategoryType)
    }, [selectedCategoryType]);

    function handleFormSubmit(categoryType) {
        let res = createOrUpdateCategoryType(categoryType);
        // if (categoryType?.id?.length === 0) {
        //     res = createCategoryType(categoryType);
        // } else {
        //     res = editCategoryType(categoryType);
        // }
        if (handleAfterSubmit) handleAfterSubmit(res)
    }

    return (
        <PopupForm
            size="sm"
            open={open}
            handleClose={handleClose}
            title={(selectedCategoryType?.id ? t("general.button.edit") : t("general.button.add")) + " nhóm phân loại"}
            formik={{
                enableReinitialize: true,
                validationSchema: validationSchema,
                initialValues: categoryType,
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
                    <GlobitsTextField label="Thứ tự hiển thị" name="orderNumber"/>
                </Grid>
            </Grid>
        </PopupForm>
    );
});
