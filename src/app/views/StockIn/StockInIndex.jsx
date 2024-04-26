/* eslint-disable react-hooks/exhaustive-deps */
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { useStore } from "app/stores";
import { useTranslation } from "react-i18next";
import StockInList from "./StockInList";
import GlobitsConfirmationDialog from "app/common/GlobitsConfirmationDialog";
import StockInSearch from "./StockInSearch";

export default observer(function StockInIndex() {
  const { stockInStore } = useStore();
  const { t } = useTranslation();

  const {
    resetStoreStockIn,
    handleConfirmDeleteStockIn,
    openConfirmDeleteStockIn,
    handleClosePopup,
    getListStockIn,
  } = stockInStore;

  useEffect(() => {
    getListStockIn()
    return resetStoreStockIn;
  }, []);

  return (
    <section className="cards-container">
      <h4 className="cards-header">{t("stockIn.title")}</h4>
      
      <div className="cards-body">
        <StockInSearch />
        <StockInList />
      </div>

      <GlobitsConfirmationDialog
        open={openConfirmDeleteStockIn}
        onConfirmDialogClose={handleClosePopup}
        onYesClick={handleConfirmDeleteStockIn}
        title={t("confirm_dialog.delete.title")}
        text={t("confirm_dialog.delete.text")}
        agree={t("confirm_dialog.delete.agree")}
        cancel={t("confirm_dialog.delete.cancel")}
      />
    </section>
  );
});
