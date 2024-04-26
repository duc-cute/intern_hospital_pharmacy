import GlobitsConfirmationDialog from "app/common/GlobitsConfirmationDialog";
import { useStore } from "app/stores";
import { observer } from "mobx-react";
import React, { memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ShiftWorkChangeList from "./ShiftWorkChangeList";
import ShiftWorkChangeForm from "./ShiftWorkChangeForm";
import ShiftWorkChangeSearch from "./ShiftWorkChangeSearch";

const ShiftWorkChangeIndex = () => {
  const { t } = useTranslation();
  const {
    updatePageData,
    shouldOpenEditorDialog,
    shouldOpenConfirmationDialog,
    handleClose,
    handleConfirmDelete,
    shouldOpenConfirmationDeleteListDialog,
    handleConfirmDeleteList,
    resetShiftWorkChangeStore,
  } = useStore().shiftWorkChangeStore;

  useEffect(() => {
    resetShiftWorkChangeStore();
    updatePageData();
  }, [updatePageData, resetShiftWorkChangeStore]);

  return (
    <div className="cards-container">
      <h4 className="cards-header">{t("shiftWorkChange.title")}</h4>

      <div className="cards-body">
        <ShiftWorkChangeSearch />

        <ShiftWorkChangeList />
      </div>

      <ShiftWorkChangeForm open={shouldOpenEditorDialog} />

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
    </div>
  );
};

export default memo(observer(ShiftWorkChangeIndex));
