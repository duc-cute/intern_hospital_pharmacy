/* eslint-disable react-hooks/exhaustive-deps */
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { useStore } from "app/stores";
import { useTranslation } from "react-i18next";
import InventoryReportList from "./InventoryReportList";
import InventoryReportFilters from "./InventoryReportFilters";
import InventoryReportViewPopup from "app/views/DetailsInventoryByProduct/InventoryReportViewPopup";

export default observer(function InventoryReportIndex() {
  const { inventoryReportStore } = useStore();
  const { t } = useTranslation();

  const {
    shouldOpenEditorDialog,
    resetStore,
    loadInventoryReport
  } = inventoryReportStore;

  useEffect(() => {
    loadInventoryReport();

    return () => resetStore();
  }, []);


  return (
    <section className="cards-container">
      <h4 className="cards-header">{t("inventoryReport.title")}</h4>
      <div className="cards-body">
        <InventoryReportFilters />
        <InventoryReportList />
      </div>

      {shouldOpenEditorDialog &&
        <InventoryReportViewPopup open={shouldOpenEditorDialog} />
      }
    </section>
  );
});
