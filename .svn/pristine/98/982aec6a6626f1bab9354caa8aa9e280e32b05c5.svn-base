import React, { memo, useState } from "react";
import {  Dialog, DialogActions, DialogContent, DialogTitle, Grid} from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import BlockIcon from '@material-ui/icons/Block';
import CloseIcon from '@material-ui/icons/Close';
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CommonButton from "../Button/CommonButton";

const ConfirmPopup = (props) => {
    const {
        open,
        title = 'Xác nhận',
        textConfirm = "Xác nhận",
        textClose = "Hủy",
        text,
        onClose,
        onConfirm,
        isNotAPromise
    } = props;

    const [isDisable, setIsDisable] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

    return (
        <Dialog
            open={open}
            fullWidth
            maxWidth={"xs"}
            className="popup-container"
            onClose={onClose}
        >
            <DialogTitle className="confirm__title">
                <strong>
                    {title}
                </strong>
                <IconButton className="p-2" aria-label="close" onClick={onClose}>
                    <CloseIcon
                        className="title__icon"
                    />
                </IconButton>

            </DialogTitle>

            <DialogContent className="confirm__content">
                <h4 className="text-confirm">{text}</h4>
            </DialogContent>

            <DialogActions className="action-popup-form">
                {!isMobile && (
                    <>
                        <CommonButton
                            className="btn-gray mr-1"
                            onClick={onClose}
                        >
                            <BlockIcon
                                className="mr-2"
                                // color="white"
                            />
                            {textClose}
                        </CommonButton>
                        <CommonButton
                            disabled={isDisable}
                            onClick={() => {
                                setIsDisable(true);
                                if (isNotAPromise) {
                                    onConfirm();
                                    setIsDisable(false);
                                }
                                else onConfirm().finally(() => setIsDisable(false));
                            }}
                            className="btn-danger"
                        >
                            <DoneIcon
                                className="mr-2"
                                // color="white"
                            />
                            {textConfirm}
                        </CommonButton>
                    </>
                )}
                {isMobile && (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <CommonButton
                                className="btn-gray"
                                fullWidth
                                onClick={onClose}
                            >
                                <BlockIcon
                                    className="mr-2"
                                    color="white"
                                />
                                {textClose}
                            </CommonButton>
                        </Grid>
                        <Grid item xs={12}>
                            <CommonButton
                                fullWidth
                                disabled={isDisable}
                                onClick={() => {
                                    setIsDisable(true);
                                    if (isNotAPromise) {
                                        onConfirm();
                                        setIsDisable(false);
                                    }
                                    else onConfirm().finally(() => setIsDisable(false));
                                }}
                                className="btn-danger"
                            >
                                <DoneIcon
                                    className="mr-2"
                                    color="white"
                                />
                                {textConfirm}
                            </CommonButton>
                        </Grid>
                    </Grid>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default memo(ConfirmPopup);
