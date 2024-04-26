/* eslint-disable react-hooks/exhaustive-deps */
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { useStore } from "../../stores";
import { Grid, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useTranslation } from "react-i18next";
import SupplierList from "./SupplierList";
import GlobitsConfirmationDialog from "../../common/GlobitsConfirmationDialog";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import GlobitsSearchInput from "app/common/GlobitsSearchInput";
import SupplierForm from "./SupplierForm";

export default observer(function SupplierIndex() {
  const { supplierStore } = useStore();
  const { t } = useTranslation();

  const {
    updatePageData,
    handleEditSupplier,
    shouldOpenConfirmationDialog,
    handleClose,
    handleConfirmDelete,
    resetSupplierStore
  } = supplierStore;

  useEffect(() => {
    resetSupplierStore()
    updatePageData();
  }, [updatePageData]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <section className="cards-container">
      <h4 className="cards-header">{t("supplier.title")}</h4>

      <div className="cards-body">
        <Grid className="mb-16" container spacing={3}>
          <Grid item md={6} xs={4}>
            <Button
              className="btn btn-primary d-inline-flex"
              startIcon={<AddIcon />}
              variant="contained"
              onClick={() => {
                handleEditSupplier();
              }}
            >
              {!isMobile && t("general.button.add")}
            </Button>
          </Grid>

          <Grid item md={6} xs={8}>
            <GlobitsSearchInput search={updatePageData} />
          </Grid>
        </Grid>

        <SupplierList />
      </div>

      <SupplierForm />

      <GlobitsConfirmationDialog
        open={shouldOpenConfirmationDialog}
        onConfirmDialogClose={handleClose}
        onYesClick={handleConfirmDelete}
        title={t("confirm_dialog.delete.title")}
        text={t("confirm_dialog.delete.text")}
        agree={t("confirm_dialog.delete.agree")}
        cancel={t("confirm_dialog.delete.cancel")}
      />
    </section>
  );
});
