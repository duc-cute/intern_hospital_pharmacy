import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { useStore } from "app/stores";
import { Grid } from "@material-ui/core";
import GlobitsBreadcrumb from "app/common/GlobitsBreadcrumb";
import { useTranslation } from "react-i18next";
import InventoryByCategoryReportList from "./InventoryByCategoryReportList";
import InventoryReportFilters from "./InventoryByCategoryReportFilters";
import InventoryByCategoryReportListNew from "./InventoryByCategoryReportListNew";
import { useHistory } from "react-router-dom";

export default observer(function InventoryByCategoryReportIndex() {
  const { inventoryByCategoryReportStore } = useStore();
  const { t } = useTranslation();

  const history = useHistory();

  const isNewList = history?.location?.pathname?.includes("/new");

  const { loadListInventoryReport, resetSearchObject, loadListCategory } =
    inventoryByCategoryReportStore;

  useEffect(() => {
    loadListInventoryReport();
    loadListCategory();
    return () => {
      resetSearchObject();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNewList]);

  return (
    <div className="content-index">
      <div className="index-breadcrumb">
        <GlobitsBreadcrumb
          routeSegments={[{ name: t("navigation.inventoryByCategoryReport") }]}
        />
      </div>
      <Grid className="index-card" container spacing={3}>
        <Grid className="list-container" item xs={12}>
          <InventoryReportFilters />
          {isNewList ? (
            <InventoryByCategoryReportListNew />
          ) : (
            <InventoryByCategoryReportList />
          )}
        </Grid>
      </Grid>
    </div>
  );
});
