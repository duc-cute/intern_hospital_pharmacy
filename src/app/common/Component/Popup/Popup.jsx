import React, { memo } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@material-ui/core";
import IconClose from "app/common/Icon/IconClose";

function Popup({ title, open, id = "draggable-dialog-title", handleClose, size = 'md', children, action }) {

    return (
        <Dialog open={open} fullWidth maxWidth={size} aria-labelledby={id} className="popup-container">
            {Boolean(title) && (
                <DialogTitle id={id} className="popup-header title">
                    <p className="titleText">{title}</p>
                    <IconButton aria-label="close" onClick={handleClose} className="popup__iconBtn">
                        <IconClose className="popup__icon" color="#000000" />
                    </IconButton>
                </DialogTitle>
            )}

            <DialogContent>
                {children}
            </DialogContent>

            {action && (
                <DialogActions className="action-popup-form">
                    {action}
                </DialogActions>
            )}
        </Dialog>
    );
}

export default memo(Popup);