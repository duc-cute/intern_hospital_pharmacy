import { Dialog, DialogTitle, Icon, IconButton } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { useTranslation } from "react-i18next";
import PaperComponent from './PaperComponent';

function GlobitsPopup({
    children,
    titleHeader,
    longTitle,
    open,
    handleClose,
    maxWidth="md",
    id="draggable-dialog-title",
    ...props
}) {
    const { t } = useTranslation();

    return (
        <Dialog
            open={open}
            PaperComponent={PaperComponent}
            fullWidth
            maxWidth={maxWidth}
            aria-labelledby={id}
        >
            <DialogTitle
                id={id}
                className={clsx("dialog-header bgc-primary-d1")}
                style={
                    !longTitle ?
                        { cursor: "move" } :
                        { cursor: "move", paddingRight: "54px" }
                }
            >
                <span className="header-title text-white">{titleHeader}</span>
            </DialogTitle>
            {handleClose &&
                <IconButton
                    style={{ position: "absolute", right: "6px", top: !!titleHeader ? "6px" : "-2px" }}
                    onClick={handleClose}
                >
                    <Icon title={t("general.close")} style={{color: "#fff"}}>
                        close
                    </Icon>
                </IconButton>
            }
            {children}
            {props?.dialogActions ? props?.dialogActions : <></>}
        </Dialog>
    );
}

export default GlobitsPopup;