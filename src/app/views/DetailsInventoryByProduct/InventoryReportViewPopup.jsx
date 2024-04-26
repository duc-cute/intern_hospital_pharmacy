import React, { useEffect } from "react";
import { 
  Dialog, 
  DialogTitle, 
  Icon, 
  IconButton, 
  DialogContent, 
  DialogActions 
} from "@material-ui/core";
import Draggable from "react-draggable";
import Paper from "@material-ui/core/Paper";
import { useTranslation } from "react-i18next";
import { useStore } from "../../stores";
import { observer } from "mobx-react";
import DetailsInventoryByProductList from "./DetailsInventoryByProductList";

function PaperComponent(props) {
  return (
    <div className="paper-container full-width">
      <Draggable
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Paper {...props} />
      </Draggable>
    </div>
  );
}

export default observer(function ProductCreateEditPopup(props) {
  const { 
    inventoryReportStore,
    detailsInventoryByProductStore 
  } = useStore();
  const { t } = useTranslation();
  const { handleClose, selectedInventoryReport, searchObject } = inventoryReportStore;
  const { handleSetSearchObject, updatePageData } = detailsInventoryByProductStore;
  const { open } = props;

  useEffect(() => {
    handleSetSearchObject({
      storeId: searchObject?.store?.id,
      productId: selectedInventoryReport?.productId,
    });
    updatePageData();
  }, [])

  return (
    <Dialog
      className="dialog-container"
      open={open}
      PaperComponent={PaperComponent}
      fullWidth
      maxWidth="xl"
    >
      <DialogTitle
        className="dialog-header bgc-primary-d1"
        style={{ cursor: "move" }}
        id="draggable-dialog-title"
      >
        <span className="mb-20 text-white">
          Báo cáo chi tiết - {`${selectedInventoryReport?.productName || ""} (${selectedInventoryReport?.productContent || ""}${selectedInventoryReport?.productUnit || ""})`}
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
      <div className="dialog-form">
        <DialogContent className="dialog-body">
          <DetailsInventoryByProductList />
        </DialogContent>
        <DialogActions className="dialog-footer p-0">

        </DialogActions>
      </div>
    </Dialog>
  );
});
