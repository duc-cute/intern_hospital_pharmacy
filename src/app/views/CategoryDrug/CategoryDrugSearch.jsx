import React, {memo} from "react";
import {Button, Grid} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import {useStore} from "app/stores";
import {Form, Formik} from "formik";
import TextField from "app/common/form/GlobitsTextField";
import SearchIcon from "@material-ui/icons/Search";
import {pagingCategoryType} from "../CategoryType/CategoryTypeService";
import GlobitsPagingAutocomplete from "../../common/form/GlobitsPagingAutocomplete";

const CategoryDrugSearch = () => {
    const {categoryStore} = useStore();
    const {searchObject, updatePageData, handleEditCategory} = categoryStore;

    return (
        <Formik
            initialValues={{...searchObject}}
            onSubmit={updatePageData}
        >
            {({values, setFieldValue}) => (
                <Form autoComplete="off">
                    <Grid container spacing={2} className="mb-16">
                        <Grid item xs={12} md={4}>
                            <TextField label="Mã hoặc tên nhóm thuốc" name="keyword" />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <GlobitsPagingAutocomplete
                                name="categoryTypeId"
                                label="Nhóm phân loại"
                                api={pagingCategoryType}
                            />
                        </Grid>
                        <Grid item xs={12} className="text-center">
                            <Button startIcon={<SearchIcon/>} className="btn-blue mr-4" type="submit">
                                Tìm kiếm
                            </Button>

                            <Button startIcon={<Add/>} className="btn-orange mr-4" onClick={() => handleEditCategory()}>
                                Thêm mới
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    )
}

export default memo(CategoryDrugSearch);