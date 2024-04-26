import React, {memo} from "react";
import {Grid} from "@material-ui/core";
import {observer} from "mobx-react";
import GlobitsTextField from "app/common/form/GlobitsTextField";
// import AddIcon from '@material-ui/icons/Add';
import {useStore} from "app/stores";
// import {useFormikContext} from "formik";
import CommonButton from "../../../common/Component/Button/CommonButton";
import TypeCategory from "./TypeCategory";
import GlobitsCheckBox from "../../../common/form/GlobitsCheckBox";
// import GlobitsSelectInput from "../../../common/form/GlobitsSelectInput";
// import {ListProductType} from "../../../LocalConstants";
//
// const AddCategoryButton = observer(() => {
//     const {handleEditCategory} = useStore().categoryStore;
//
//     return (
//         <div onClick={e => e.stopPropagation()}>
//             <Tooltip title="Thêm nhóm thuốc">
//                 <IconButton size="small" onClick={() => handleEditCategory()}>
//                     <AddIcon color="primary" fontSize="medium"/>
//                 </IconButton>
//             </Tooltip>
//         </div>
//     )
// })
//
// const AddActiveIngredientButton = observer(() => {
//     const {handleEditActiveIngredient} = useStore().activeIngredientStore;
//
//     return (
//         <div onClick={e => e.stopPropagation()}>
//             <Tooltip title="Thêm hoạt chất">
//                 <IconButton size="small" onClick={() => handleEditActiveIngredient()}>
//                     <AddIcon color="primary" fontSize="medium"/>
//                 </IconButton>
//             </Tooltip>
//         </div>
//     )
// })

function GeneralInformationTab() {
    // const {setFieldValue, values} = useFormikContext();
    // const {shouldOpenEditorDialog} = useStore().categoryStore;
    const {handleOpenTypeCategory} = useStore().productStore;
    return (
        <Grid container spacing={2}>
            {/*<Grid item md={3} xs={12} className="flex flex-middle">*/}
            {/*    <label htmlFor="name"><h5 className="m-0">Tên thuốc</h5></label>*/}
            {/*    <InfoTooltip title="Tên thuốc là tên của sản phẩm"/>*/}
            {/*</Grid>*/}
            <Grid item md={6} xs={12}>
                <GlobitsTextField name="name" label="Tên thuốc" requiredLabel/>
            </Grid>

            {/*<Grid item md={3} xs={12} className="flex flex-middle">*/}
            {/*    <label htmlFor="code"><h5 className="m-0">Mã thuốc</h5></label>*/}
            {/*    <InfoTooltip title="Mã thuốc là thông tin duy nhất"/>*/}
            {/*</Grid>*/}

            <Grid item md={6} xs={12}>
                {/*<InfoTooltip title="Mã thuốc là thông tin duy nhất"/>*/}
                <GlobitsTextField name="code" label="Mã thuốc" requiredLabel/>
            </Grid>

            {/*<Grid item md={3} xs={12} className="flex flex-middle">*/}
            {/*    <label htmlFor="ingredients"><h5 className="m-0">Hoạt chất</h5></label>*/}
            {/*</Grid>*/}

            {/*<Grid item md={9} xs={12}>*/}
            {/*    <GlobitsPagingAutocomplete*/}
            {/*        multiple={true}*/}
            {/*        api={pagingActiveIngredients}*/}
            {/*        name="ingredients"*/}
            {/*        endAdornment={<AddActiveIngredientButton/>}*/}
            {/*    />*/}

            {/*    <ActiveIngredientForm handleAfterSubmit={handleAfterSubmitActiveIngredient}/>*/}
            {/*</Grid>*/}

            {/*<Grid item md={3} xs={12} className="flex flex-middle">*/}
            {/*    <label htmlFor="description"><h5 className="m-0">Mô tả</h5></label>*/}
            {/*</Grid>*/}

            {/*<Grid item md={3} xs={12} className="flex flex-middle">*/}
            {/*    <label htmlFor="productType"><h5 className="m-0">Loại</h5></label>*/}
            {/*</Grid>*/}
            {/*<Grid item md={6} xs={12}>*/}
            {/*    <GlobitsSelectInput*/}
            {/*        options={ListProductType}*/}
            {/*        variant="standard"*/}
            {/*        name="productType"*/}
            {/*        label="Loại"*/}
            {/*    />*/}
            {/*</Grid>*/}

            {/*<Grid item md={3} xs={12} className="flex flex-middle">*/}
            {/*    <label htmlFor="registerCode"><h5 className="m-0">Số đăng ký</h5></label>*/}
            {/*</Grid>*/}
            <Grid item md={6} xs={12}>
                <GlobitsTextField
                    variant="standard"
                    name="registerCode"
                    label="Số đăng ký"
                />
            </Grid>

            <Grid item md={6} xs={12}>
                <GlobitsTextField
                    variant="standard"
                    name="description"
                    label="Mô tả"
                />
            </Grid>


            <Grid item md={6} className={"pt-10"}>
                <GlobitsCheckBox name="specialSupervision" label="Là thuốc gây nghiện ( Hướng thần )"/>
            </Grid>

            <Grid item xs={12} className="flex flex-middle">
                <CommonButton onClick={handleOpenTypeCategory}>Phân loại nhóm</CommonButton>

                <TypeCategory/>
            </Grid>
        </Grid>
    );
};

export default memo(observer(GeneralInformationTab));