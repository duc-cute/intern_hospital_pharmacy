import React, { useEffect } from 'react';
import { useTranslation } from "react-i18next";
import GlobitsBreadcrumb from 'app/common/GlobitsBreadcrumb';
import { observer } from 'mobx-react';
import {
    Grid,
} from "@material-ui/core";
import InventoryUsageReportSearch from "./InventoryUsageReportSearch";
import InventoryUsageReportForm from "./InventoryUsageReportForm";
import { useStore } from 'app/stores';

export default observer(function InventoryUsageReportIndex() {
    const { inventoryUsageReportStore } = useStore();
    const { t } = useTranslation();
  
    const {
      shouldOpenEditorDialog,
      resetSearchObject,
      loadListCategory,
      updatePageData,
    } = inventoryUsageReportStore;

    useEffect(() => {
        updatePageData();
        // loadListCategory();
        return () => {
          resetSearchObject();
        };
      }, []);

    return (
        <div className="content-index">
            <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <GlobitsBreadcrumb routeSegments={[{ name: "Báo cáo tình hình sử dụng và tồn kho"}]} />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <InventoryUsageReportSearch />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <div>
                        <InventoryUsageReportForm />
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}) 
