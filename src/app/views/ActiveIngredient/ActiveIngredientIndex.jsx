/* eslint-disable react-hooks/exhaustive-deps */
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { useStore } from "../../stores";
import { useTranslation } from "react-i18next";
import ActiveIngredientList from "./ActiveIngredientList";
import ActiveIngredientFilters from "./ActiveIngredientFilters";
import GlobitsConfirmationDialog from "../../common/GlobitsConfirmationDialog";
import ActiveIngredientForm from "./ActiveIngredientForm";

export default observer(function ActiveIngredientIndex() {
  const { activeIngredientStore } = useStore();
  const { t } = useTranslation();

  const {
    updatePageData,
    shouldOpenConfirmationDialog,
    handleClose,
    handleConfirmDelete,
    resetActiveIngredientStore
  } = activeIngredientStore;

  useEffect(() => {
    resetActiveIngredientStore();
    updatePageData();
  }, [updatePageData]);

  return (
    <section className="cards-container">
      <h4 className="cards-header">{t("activeIngredient.title")}</h4>

      <div className="cards-body">
        <ActiveIngredientFilters />

        <ActiveIngredientList />
      </div>

      <ActiveIngredientForm />

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
