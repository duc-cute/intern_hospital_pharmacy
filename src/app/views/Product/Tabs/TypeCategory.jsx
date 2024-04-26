import React, {useEffect} from "react";
import {Button, Grid} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {observer} from "mobx-react";
import {useStore} from "../../../stores";
import * as Yup from "yup";
import PopupForm from "../../../common/Component/Popup/PopupForm";
import BlockIcon from "@material-ui/icons/Block";
import SaveIcon from "@material-ui/icons/Save";
import {useFormikContext} from "formik";
import GlobitsAutocomplete from "../../../common/form/GlobitsAutocomplete";

export default observer(function TypeCategory() {
    const {productStore, categoryTypeStore, categoryStore} = useStore();
    const {t} = useTranslation();
    const {
        shouldOpenTypeCategory,
        handleCloseTypeCategory,
    } = productStore;

    const {
        categoryTypeList,
        getAllCategoryType
    } = categoryTypeStore;

    const {
        listTreeCategory,
        getListTreeCategorys
    } = categoryStore;

    const validationSchema = Yup.object();
    const {values, setFieldValue} = useFormikContext();

    useEffect(() => {
        getAllCategoryType();
        getListTreeCategorys();
    }, [])

    return (
        <PopupForm
            size='md'
            open={shouldOpenTypeCategory}
            handleClose={handleCloseTypeCategory}
            noDiaLogContent
            title={'Phân loại thuốc'}
            formik={{
                enableReinitialize: true,
                validationSchema: validationSchema,
                initialValues: {
                    listTreeCategory: []
                },
                onSubmit: (item) => {
                    debugger
                    if (item?.listTreeCategory?.length > 0) {
                        const normalObject = JSON.parse(JSON.stringify(item?.listTreeCategory.filter(item => item != null)));
                        if (normalObject?.length > 0) {
                            setFieldValue('categories', [...normalObject]);
                        } else {
                            setFieldValue('categories', []);
                        }
                    } else {
                        setFieldValue('categories', []);
                    }
                    handleCloseTypeCategory();
                },
            }}
            action={({isSubmitting}) => (
                <>
                    <Button
                        startIcon={<BlockIcon/>}
                        variant="contained"
                        className="mr-12 btn btn-secondary d-inline-flex"
                        color="secondary"
                        onClick={() => handleCloseTypeCategory()}
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
            <Grid container>
                <Grid item xs={12}>
                    <div className={`table-root`} style={{overflowX: "scroll"}}>
                        <table className="table-container">
                            <thead>
                            <tr className="row-table-header">
                                <th>Phân loại</th>
                                <th>Nhóm thuốc</th>
                            </tr>
                            </thead>
                            <tbody>
                            {shouldOpenTypeCategory && categoryTypeList?.map((listValue, index) => {
                                const correspondingCategory = values?.categories?.find(category => category?.categoryType?.id === listValue.id);
                                console.log(correspondingCategory, index)
                                return (
                                    <tr key={index}>
                                        <td>{listValue.name}</td>
                                        <td align={"center"}>
                                            <GlobitsAutocomplete
                                                options={listTreeCategory.filter(item => item?.categoryType?.id === listValue.id)}
                                                name={`listTreeCategory[${index}]`}
                                                defaultValue={correspondingCategory || null}
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </Grid>
            </Grid>
        </PopupForm>
    );
});
