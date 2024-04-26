import React, {useEffect, useState} from "react";
import {Button, Grid} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import BlockIcon from "@material-ui/icons/Block";
import {useTranslation} from "react-i18next";
import {useStore} from "../../stores";
import * as Yup from "yup";
import {observer} from "mobx-react";
import GlobitsTextField from "../../common/form/GlobitsTextField";
import GlobitsAutocomplete from "app/common/form/GlobitsAutocomplete";
import PopupForm from "app/common/Component/Popup/PopupForm";
import GlobitsPagingAutocomplete from "app/common/form/GlobitsPagingAutocomplete";
import {pagingCategoryType} from "../CategoryType/CategoryTypeService";
import {ProductType} from "../../common/Constant/LocalConstant";

const defaultCategory = {
    id: "",
    name: "",
    code: "",
    parent: null,
    productType: ProductType.MEDICAL_SUPPLY,
}

export default observer(function CategoryDrugForm({handleAfterSubmit, updateListOnClose, open}) {
    const {categoryStore} = useStore();
    const {t} = useTranslation();
    const {
        handleClose,
        createCategory,
        editCategory,
        selectedCategory,
        getListTreeCategorys,
        listTreeCategory,
        searchObject
    } = categoryStore;

    const [category, setCategory] = useState(defaultCategory);
    const validationSchema = Yup.object({});

    useEffect(() => {
        if (selectedCategory) setCategory(selectedCategory)
        else setCategory({...defaultCategory, categoryType: searchObject?.categoryTypeId})
    }, [selectedCategory]);


    useEffect(() => {
        getListTreeCategorys();
    }, [])

    function handleFormSubmit(category) {
        let res;
        if (category?.id?.length === 0) {
            res = createCategory(category);
        } else {
            res = editCategory(category);
        }
        if (handleAfterSubmit) handleAfterSubmit(res)
    }

    return (
        <PopupForm
            size="sm"
            open={open}
            handleClose={handleClose}
            title={(selectedCategory?.id ? t("general.button.edit") : t("general.button.add")) + " nhóm thuốc"}
            formik={{
                enableReinitialize: true,
                validationSchema: validationSchema,
                initialValues: category,
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
                    <GlobitsTextField label="Tên nhóm thuốc" name="name"/>
                </Grid>

                <Grid item xs={12}>
                    <GlobitsTextField label="Mã nhóm thuốc" name="code"/>
                </Grid>

                <Grid item xs={12}>
                    <GlobitsAutocomplete
                        name="parent"
                        label="Nhóm thuốc cha"
                        options={listTreeCategory}
                    />
                </Grid>

                <Grid item xs={12}>
                    <GlobitsPagingAutocomplete
                        name="categoryType"
                        label="Nhóm phân loại"
                        api={pagingCategoryType}
                    />
                </Grid>
                <Grid item xs={12}>
                    <GlobitsTextField isTextArea label="Miêu tả" name="description"/>
                </Grid>
            </Grid>
        </PopupForm>
    );
});
