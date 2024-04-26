/* eslint-disable react-hooks/exhaustive-deps */
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { useStore } from "app/stores";
import { useTranslation } from "react-i18next";
import StockOutList from "./StockOutList";
import GlobitsConfirmationDialog from "app/common/GlobitsConfirmationDialog";
import StockOutSearch from "./StockOutSearch";

function StockOutIndex() {
  const { stockOutStore } = useStore();
  const { t } = useTranslation();

  const {
    openConfirmDeleteStockOut,
    handleClosePopup,
    handleConfirmDeleteStockOut,
    getListStockOut,
    resetStockOutStore,
  } = stockOutStore;

  useEffect(() => {
    getListStockOut();
    return resetStockOutStore;
  }, []);


  return (
    <section className="cards-container">
      <h4 className="cards-header">{t("stockOut.title")}</h4>

      <div className="cards-body">
        <StockOutSearch />
        <StockOutList />
      </div>

      <GlobitsConfirmationDialog
        open={openConfirmDeleteStockOut}
        onConfirmDialogClose={handleClosePopup}
        onYesClick={handleConfirmDeleteStockOut}
        title={t("confirm_dialog.delete.title")}
        text={t("confirm_dialog.delete.text")}
        agree={t("confirm_dialog.delete.agree")}
        cancel={t("confirm_dialog.delete.cancel")}
      />
    </section>
  );
};

export default observer(StockOutIndex);