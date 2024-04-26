/* eslint-disable jsx-a11y/alt-text */
import { Grid } from "@material-ui/core";
import PopupForm from "app/common/Component/Popup/PopupForm";
import React, { memo, useEffect } from "react";
import GlobitsTextField from "app/common/form/GlobitsTextField";
import CommonButton from "../Button/CommonButton";
import { useState } from "react";

export default memo(function ScanQRPopup({ open, onScan, onClose }) {
    const [qrCodeRef, setQrCodeRef] = useState();

    useEffect(() => {
        if (qrCodeRef) {
            qrCodeRef.focus();
        }
    }, [qrCodeRef]);

    return (
        <PopupForm
            size="xs"
            title="Quét mã QR"
            open={open}
            handleClose={onClose}
            formik={{
                enableReinitialize: true,
                initialValues: { qrTextCode: "" },
            }}
            hideFooter
        >
            {({ values, setFieldValue }) => (
                <>
                    <Grid container spacing={2} style={{ textAlign: "center" }} justifyContent="center">
                        <Grid item xs={12}>
                            <img src={require('../../Image/scanQR.jpg')} width="250px" />
                        </Grid>
                        <Grid item xs={12}>
                            <strong>Mời quét QR trên giấy tờ được cung cấp</strong>
                        </Grid>
                        <Grid item xs={12}>
                            <GlobitsTextField
                                name="qrTextCode"
                                inputProps={{
                                    placeholder: "Mã QR"
                                }}
                                onBlur={(event) => event.target.focus()}
                                ref={setQrCodeRef}
                                onChange={(event) => {
                                    setFieldValue(event.target.id, event.target.value);
                                    if (event.target.value && onScan) {
                                        onScan(event.target.value, { close: onClose });
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <CommonButton
                                fullWidth
                                onClick={() => {
                                    setFieldValue("qrTextCode", "")
                                }}>
                                <strong className='ml-2'>Quét lại</strong>
                            </CommonButton>
                        </Grid>
                    </Grid>
                </>
            )}
        </PopupForm>
    );
})
