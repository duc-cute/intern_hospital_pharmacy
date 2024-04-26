import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { useStore } from "../../stores";
import { Grid, Button } from "@material-ui/core";
import GlobitsBreadcrumb from "../../common/GlobitsBreadcrumb";
import AddIcon from "@material-ui/icons/Add";
import { useTranslation } from "react-i18next";
import BiddingPackageList from "./BiddingPackageList";
import BiddingPackageFilters from "./BiddingPackageFilters";
import BiddingPackageCreateEditPopup from "./BiddingPackageCreateEditPopup";
import GlobitsConfirmationDialog from "../../common/GlobitsConfirmationDialog";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export default observer(function BiddingPackageIndex() {
  const { biddingPackageStore } = useStore();
  const { t } = useTranslation();

  const {
    updatePageData,
    handleEditBiddingPackage,
    shouldOpenEditorDialog,
    shouldOpenConfirmationDialog,
    handleClose,
    handleConfirmDelete,
    resetBiddingPackageStore
  } = biddingPackageStore;

  useEffect(() => {
    resetBiddingPackageStore();
    updatePageData();
  }, [updatePageData]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className="cards-container">
      <h4 className="cards-header">{t("biddingPackage.title")}</h4>
      <div className="cards-body">
        <Grid container spacing={3}>
          {/* <Grid item md={6} xs={2}>
            <Button
              className="mb-16 mr-16 btn btn-primary d-inline-flex"
              startIcon={<AddIcon />}
              variant="contained"
              onClick={() => {
                handleEditBiddingPackage();
              }}
            >
              {!isMobile && t("general.button.add")}
            </Button>
          </Grid> */}
          <Grid item xs={12}>
            <BiddingPackageFilters />
          </Grid>

          <BiddingPackageCreateEditPopup open={shouldOpenEditorDialog} />

          <GlobitsConfirmationDialog
            open={shouldOpenConfirmationDialog}
            onConfirmDialogClose={handleClose}
            onYesClick={handleConfirmDelete}
            title={t("confirm_dialog.delete.title")}
            text={t("confirm_dialog.delete.text")}
            agree={t("confirm_dialog.delete.agree")}
            cancel={t("confirm_dialog.delete.cancel")}
          />
          <Grid className="list-container" item xs={12}>
            <BiddingPackageList />
          </Grid>
        </Grid>
      </div>
    </div>
  );
});
