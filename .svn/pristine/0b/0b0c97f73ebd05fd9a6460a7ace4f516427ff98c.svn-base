import React, {memo} from "react";
import {Grid} from "@material-ui/core";
import {observer} from "mobx-react";
import {useStore} from "app/stores";
import CommonButton from "../../../common/Component/Button/CommonButton";
import TypeCategory from "../../Product/Tabs/TypeCategory";
import GlobitsTextField from "../../../common/form/GlobitsTextField";

function GeneralInformationTab() {
    const {handleOpenTypeCategory} = useStore().productStore;

    return (
        <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
                <GlobitsTextField name="name" label="Tên vật tư y tế" requiredLabel/>
            </Grid>

            <Grid item md={6} xs={12}>
                <GlobitsTextField name="code" label="Mã vật tư y tế" requiredLabel/>
            </Grid>

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


            {/*<Grid item md={6} className={"pt-10"}>*/}
            {/*    <GlobitsCheckBox name="specialSupervision" label="Hàng hóa thuộc diện giám sát đặc biệt"/>*/}
            {/*</Grid>*/}

            <Grid item xs={12} className="flex flex-middle">
                <CommonButton onClick={handleOpenTypeCategory}>Phân loại nhóm</CommonButton>

                <TypeCategory/>
            </Grid>
        </Grid>
    );
};

export default memo(observer(GeneralInformationTab));