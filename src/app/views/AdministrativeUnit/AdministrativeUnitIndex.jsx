import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { useStore } from "../../stores";
import { Grid, Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { useTranslation } from "react-i18next";
import EthnicsList from "./AdministrativeUnitList";
import EthnicsFilters from "./AdministrativeUnitFilters";
import EthnicsCreateEditPopup from "./AdministrativeUnitPopup";
import GlobitsConfirmationDialog from "../../common/GlobitsConfirmationDialog";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import BackupIcon from "@material-ui/icons/Backup";
import ImportExcelDialog from "./ImportExcelDialog";

export default observer(function EthnicsIndex() {
  const { administrativeStore } = useStore();
  const { t } = useTranslation();

  const {
    updatePageData,
    handleEditAdministrative,
    shouldOpenEditorDialog,
    shouldOpenConfirmationDialog,
    handleClose,
    handleConfirmDelete,
    selectedAdministrativeUnitList,
    handleDeleteList,
    shouldOpenConfirmationDeleteListDialog,
    handleConfirmDeleteList,
    resetAdministrativeStore
  } = administrativeStore;

  useEffect(() => {
    resetAdministrativeStore()
    updatePageData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [shouldOpenImportDialog, setShouldOpenImportDialog] =
    React.useState(false);

  return (
    <section className="cards-container">
      <h4 className="cards-header">{t("administrative_unit.title")}</h4>

      <div className="cards-body">
        <Grid className="mb-16" container spacing={3}>
          <Grid item lg={6} md={6} sm={4} xs={4}>
            <Button
              className="mr-12 btn btn-secondary d-inline-flex"
              startIcon={<BackupIcon />}
              onClick={() => {
                setShouldOpenImportDialog(true);
              }}
            >
              {!isMobile && "Import"}
            </Button>
            <Button
              className="btn btn-primary d-inline-flex"
              startIcon={<AddIcon />}
              onClick={() => {
                handleEditAdministrative();
              }}
            >
              {!isMobile && t("general.button.add")}
            </Button>
            {selectedAdministrativeUnitList.length > 0 && (
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
            <EthnicsFilters />
          </Grid>
        </Grid>

        <EthnicsList />
      </div>

      <EthnicsCreateEditPopup open={shouldOpenEditorDialog} />
          <ImportExcelDialog
            open={shouldOpenImportDialog}
            t={t}
            handleClose={() => {
              setShouldOpenImportDialog(false);
              updatePageData();
            }}
          />

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
    </section>
  );
});
