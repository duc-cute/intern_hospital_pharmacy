import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { useStore } from "../../stores";
import { Grid, Button } from "@material-ui/core";
import GlobitsBreadcrumb from "../../common/GlobitsBreadcrumb";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { useTranslation } from "react-i18next";
import ServiceRequestFormList from "./ServiceRequestFormList";
import ServiceRequestFormFilters from "./ServiceRequestFormFilters";
import ServiceRequestFormCreateEditPopup from "./ServiceRequestFormCreateEditPopup";
import GlobitsConfirmationDialog from "../../common/GlobitsConfirmationDialog";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export default observer(function EthnicsIndex() {
  const { ServiceRequestFormStore } = useStore();
  const { t } = useTranslation();

  const {
    updatePageData,
    handleEditServiceRequestForm,
    shouldOpenEditorDialog,
    shouldOpenConfirmationDialog,
    handleClose,
    handleConfirmDelete,
    selectedServiceRequestFormList,
    handleDeleteList,
    shouldOpenConfirmationDeleteListDialog,
    handleConfirmDeleteList,
  } = ServiceRequestFormStore;

  useEffect(() => {
    updatePageData();
  }, [updatePageData]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className="content-index">
      <div className="index-breadcrumb">
        <GlobitsBreadcrumb routeSegments={[{ name: t("serviceRequestForm.title") }]} />
      </div>
      <Grid className="index-card" container spacing={3}>
        <Grid item lg={6} md={6} sm={4} xs={4}>
          <Button
            className="mb-16 mr-16 btn btn-primary d-inline-flex"
            startIcon={<AddIcon />}
            variant="contained"
            onClick={() => {
              handleEditServiceRequestForm();
            }}
          >
            {!isMobile && t("general.button.add")}
          </Button>
          {selectedServiceRequestFormList.length > 0 && (
            <Button
              className="mb-16 mr-36 btn btn-warning d-inline-flex"
              variant="contained"
              startIcon={<DeleteIcon />}
              onClick={() => {
                handleDeleteList();
              }}
            >
              {!isMobile && t("general.button.delete")}
            </Button>
          )}
        </Grid>
        <Grid item lg={6} md={6} sm={8} xs={8}>
          <ServiceRequestFormFilters />
        </Grid>

        <ServiceRequestFormCreateEditPopup open={shouldOpenEditorDialog} />

        <GlobitsConfirmationDialog
          open={shouldOpenConfirmationDialog}
          onConfirmDialogClose={handleClose}
          onYesClick={handleConfirmDelete}
          title={t("confirm_dialog.delete.title")}
          text={t("confirm_dialog.delete.text")}
          agree={t("confirm_dialog.delete.agree")}
          cancel={t("confirm_dialog.delete.cancel")}
        />

        <GlobitsConfirmationDialog
          open={shouldOpenConfirmationDeleteListDialog}
          onConfirmDialogClose={handleClose}
          onYesClick={handleConfirmDeleteList}
          title={t("confirm_dialog.delete_list.title")}
          text={t("confirm_dialog.delete_list.text")}
          agree={t("confirm_dialog.delete_list.agree")}
          cancel={t("confirm_dialog.delete_list.cancel")}
        />

        <Grid className="list-container" item xs={12}>
          <ServiceRequestFormList />
        </Grid>
      </Grid>
    </div>
  );
});
