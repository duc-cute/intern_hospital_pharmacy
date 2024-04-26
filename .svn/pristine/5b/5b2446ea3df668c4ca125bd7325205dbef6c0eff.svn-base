import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { useStore } from "../../stores";
import { Grid, Button } from "@material-ui/core";
import GlobitsBreadcrumb from "../../common/GlobitsBreadcrumb";
import AddIcon from "@material-ui/icons/Add";
import { useTranslation } from "react-i18next";
import AttributeList from "./AttributeList";
import AttributeFilters from "./AttributeFilters";
import AttributeCreateEditPopup from "./AttributeCreateEditPopup";
import GlobitsConfirmationDialog from "../../common/GlobitsConfirmationDialog";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export default observer(function AttributeIndex() {
  const { attributeStore } = useStore();
  const { t } = useTranslation();

  const {
    updatePageData,
    handleEditAttribute,
    shouldOpenEditorDialog,
    shouldOpenConfirmationDialog,
    handleClose,
    handleConfirmDelete,
    resetAttributeStore
  } = attributeStore;

  useEffect(() => {
    resetAttributeStore();
    updatePageData();
  }, [updatePageData]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className="content-index">
      <div className="index-breadcrumb">
        <GlobitsBreadcrumb routeSegments={[{ name: t("attribute.title") }]} />
      </div>
      <Grid className="index-card" container spacing={3}>
        {/* <Grid item md={6} xs={2}>
          <Button
            className="mb-16 mr-16 btn btn-primary d-inline-flex"
            startIcon={<AddIcon />}
            variant="contained"
            onClick={() => {
              handleEditAttribute();
            }}
          >
            {!isMobile && t("general.button.add")}
          </Button>
        </Grid> */}
        <Grid item xs={12}>
          <AttributeFilters />
        </Grid>

        <AttributeCreateEditPopup open={shouldOpenEditorDialog} />

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
          <AttributeList />
        </Grid>
      </Grid>
    </div>
  );
});
