import React from "react";
import { Dialog, DialogTitle, Icon, IconButton } from "@material-ui/core";
import Draggable from "react-draggable";
import Paper from "@material-ui/core/Paper";
import { useTranslation } from "react-i18next";
import { useStore } from "../../stores";
import BiddingPackageForm from "./BiddingPackageForm";
import { observer } from "mobx-react";

function PaperComponent(props) {
  return (
    <div className="paper-container">
      <Draggable
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Paper {...props} />
      </Draggable>
    </div>
  );
}

export default observer(function BiddingPackageCreateEditPopup(props) {
  const { biddingPackageStore } = useStore();
  const { t } = useTranslation();
  const { handleClose, selectedBiddingPackage } = biddingPackageStore;
  const { open } = props;

  return (
    <Dialog
      className="dialog-container"
      open={open}
      PaperComponent={PaperComponent}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle
        className="dialog-header bgc-primary-d1"
        style={{ cursor: "move" }}
        id="draggable-dialog-title"
      >
        <span className="mb-20 text-white">
          {" "}
          {(selectedBiddingPackage?.id
            ? t("general.button.edit")
            : t("general.button.add")) +
            " " +
            t("biddingPackage.title")}{" "}
        </span>
        <IconButton
          style={{ position: "absolute", right: "10px", top: "10px" }}
          onClick={() => handleClose()}
        >
          <Icon color="disabled" title={t("general.close")}>
            close
          </Icon>
        </IconButton>
      </DialogTitle>
      <BiddingPackageForm />
    </Dialog>
  );
});
