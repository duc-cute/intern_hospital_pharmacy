import PopupForm from 'app/common/Component/Popup/PopupForm';
import { useStore } from 'app/stores';
import React, { memo } from 'react'
import { Button, Grid } from "@material-ui/core";
import GlobitsTextField from 'app/common/form/GlobitsTextField';
import GlobitsDateTimePicker from 'app/common/form/GlobitsDateTimePicker';
import { observer } from 'mobx-react';
import { StatusStoreRequest } from 'app/common/Constant/LocalConstant';
import GlobitsAutocomplete from 'app/common/form/GlobitsAutocomplete';
import GlobitsTable from 'app/common/GlobitsTable';
import { StoreRequest } from 'app/common/Model/StoreRequest';
import StoreRequestPrint from './StoreRequestPrint';

function StoreRequestForm() {
    const { openForm, selectedStoreRequest, handleClosePopup, confirmStatusStoreRequest } 
    = useStore()._StoreRequestStore;

    return (
        <PopupForm
            title="Duyệt phiếu yêu cầu xuất kho"
            open={openForm}
            handleClose={handleClosePopup}
            formik={{
                initialValues: selectedStoreRequest,
                // onSubmit: saveOrUpdateStoreRequest,
            }}
            action={(
                <>
                    {(selectedStoreRequest?.status !== StatusStoreRequest.REFUSE && selectedStoreRequest?.status !== StatusStoreRequest.BROWSER) && (
                        <>
                            <Button className="btn-orange mr-2 btn-container" variant="contained" onClick={() => confirmStatusStoreRequest(StatusStoreRequest.BROWSER)}>
                                <p className='btn-content'>Duyệt</p>
                            </Button>
                            <Button className="btn-orange mr-2 btn-container" variant="contained" onClick={() => confirmStatusStoreRequest(StatusStoreRequest.REFUSE)}>
                                <p className='btn-content'>Từ chối</p>
                            </Button>
                        </>
                    )}
                    <StoreRequestPrint />
                    <Button className="btn-gray btn-container" variant="contained" onClick={handleClosePopup}>
                        <p className='btn-content'>Đóng</p>
                    </Button>
                </>
            )}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <GlobitsTextField label="Mã phiếu" name="code" disabled />
                </Grid>

                <Grid item xs={12} md={4}>
                    <GlobitsDateTimePicker label="Ngày yêu cầu" name="dateIssue" isDateTimePicker disabled />
                </Grid>
                <Grid item xs={12} md={4}>
                    <GlobitsAutocomplete label="Phòng ban" name="department" disabled />
                </Grid>

                <Grid item xs={12}>
                    <p>Danh sách thuốc - vật tư y tế</p>
                    <GlobitsTable
                        data={selectedStoreRequest?.items || []}
                        columns={[
                            { title: "Loại thuốc - vật tư y tế", field: "productType", render: value => StoreRequest.getProductType(value?.productType) },
                            { title: "Tên thuốc - vật tư y tế", field: "drug", render: value => value?.drug?.name || value?.medicalSupply?.name || "" },
                            { title: "Số lượng", field: "quantity", align: "center" },
                        ]}
                        noPagination
                    />
                </Grid>
            </Grid>
        </PopupForm>
    )
}

export default memo(observer(StoreRequestForm))
