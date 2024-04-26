import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { useStore } from "../../stores";
import { Grid } from "@material-ui/core";
import GlobitsBreadcrumb from "../../common/GlobitsBreadcrumb";
import { useTranslation } from "react-i18next";
import InventoryReportList from "./InventoryReportList";
import InventoryReportFilters from "./InventoryReportFilters";
// import InventoryReportCreateEditPopup from "./InventoryReportCreateEditPopup";
// import GlobitsConfirmationDialog from "../../common/GlobitsConfirmationDialog";
import InventoryReportViewPopup from "../DetailsInventoryByProduct/InventoryReportViewPopup";
// import { PivotViewComponent, FieldList, CalculatedField, Inject } from '@syncfusion/ej2-react-pivotview';
import './InventoryReport.scss';

// let pivotData = [
//   { 'Sold': 31, 'Amount': 52824, 'Country': 'France', 'Products': 'Mountain Bikes', 'Year': 'FY 2015', 'Quarter': 'Q1' },
//   { 'Sold': 51, 'Amount': 86904, 'Country': 'France', 'Products': 'Mountain Bikes', 'Year': 'FY 2015', 'Quarter': 'Q2' },
//   { 'Sold': 90, 'Amount': 153360, 'Country': 'France', 'Products': 'Mountain Bikes', 'Year': 'FY 2015', 'Quarter': 'Q3' },
//   { 'Sold': 25, 'Amount': 42600, 'Country': 'France', 'Products': 'Mountain Bikes', 'Year': 'FY 2015', 'Quarter': 'Q4' },
//   { 'Sold': 27, 'Amount': 46008, 'Country': 'France', 'Products': 'Mountain Bikes', 'Year': 'FY 2016', 'Quarter': 'Q1' }
// ];

export default observer(function InventoryReportIndex() {
  const { inventoryReportStore } = useStore();
  const { t } = useTranslation();

  const {
    shouldOpenEditorDialog,
    resetSearchObject,
    loadListCategory,
    updatePageData
  } = inventoryReportStore;

  // const dataSourceSettings = {
  //   dataSource: pivotData,
  //   expandAll: false,
  //   formatSettings: [{ name: 'Amount', format: 'C0' }],
  //   rows: [{ name: 'Country' }, { name: 'Products' }],
  //   columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
  //   values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }]
  // }

  useEffect(() => {
    updatePageData();
  }, [updatePageData]);

  useEffect(() => {
    loadListCategory();

    return () => {
      resetSearchObject();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="content-index">
      <div className="index-breadcrumb">
        <GlobitsBreadcrumb routeSegments={[{ name: t("inventoryReport.title") }]} />
      </div>
      <Grid className="index-card" container spacing={3}>
        {/* <Grid item lg={6} md={6} sm={4} xs={4}>
          <Button
            className="mb-16 mr-16 btn btn-primary d-inline-flex"
            startIcon={<AddIcon />}
            variant="contained"
            onClick={() => {
              handleEditInventoryReport();
            }}
          >
            {!isMobile && t("general.button.add")}
          </Button>
          {selectedInventoryReportList.length > 0 && (
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
        </Grid> */}
        {/* <Grid xs={12}>
          <InventoryReportFilters />
        </Grid> */}

        {shouldOpenEditorDialog &&
          <InventoryReportViewPopup open={shouldOpenEditorDialog} />
        }
        {/*
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
        /> */}

        <Grid className="list-container" item xs={12}>
          <InventoryReportFilters />
          <InventoryReportList />
        </Grid>
        {/* <PivotViewComponent
          height={'100%'}
          width={'100%'}
          dataSourceSettings={dataSourceSettings}
          showFieldList={true}
          allowCalculatedField={true}
          ref={d => setPivotObj(d)}
          allowExcelExport={true}
        >
          <Inject services={[FieldList, CalculatedField]}></Inject>
        </PivotViewComponent> */}
      </Grid>
    </div>
  );
});
