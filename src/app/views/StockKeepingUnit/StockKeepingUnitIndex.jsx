/* eslint-disable react-hooks/exhaustive-deps */
import { observer } from "mobx-react";
import React, { memo, useEffect } from "react";
import { useStore } from "../../stores";
import { Button, Grid } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useTranslation } from "react-i18next";
import StockKeepingUnitList from "./StockKeepingUnitList";
import ConfirmPopup from "app/common/Component/Popup/ConfirmPopup";
import SearchInput from "app/common/GlobitsSearchInput";
import StockKeepingUnitForm from "./StockKeepingUnitForm";

function StockKeepingUnitIndex() {
  const { t } = useTranslation();

  const {
    searchStockKeepingUnit,
    openConfirmDelete,
    pagingStockKeepingUnits,
    handleOpenForm,
    handleChangeFormSearch,
    handleClosePopup,
    handleConfirmDelete,
    resetStore,
  } = useStore().stockKeepingUnitStore;

  useEffect(() => {
    pagingStockKeepingUnits();
    return () => resetStore();
  }, []);

  return (
    <section className="cards-container">
      <h4 className="cards-header">{t("stockKeepingUnit.title")}</h4>

      <Grid container spacing={2} className="cards-body">
        <Grid item xs={12} sm={4}>
          <Button className="btn-orange" startIcon={<AddIcon />} onClick={() => handleOpenForm()}>
            {t("general.button.add")}
          </Button>
        </Grid>

        <Grid item xs={12} sm={8}>
          <SearchInput search={(obj) => handleChangeFormSearch({ ...searchStockKeepingUnit, ...obj })} />
        </Grid>

        <Grid item xs={12}>
          <StockKeepingUnitList />
        </Grid>
      </Grid>

      <StockKeepingUnitForm />

      <ConfirmPopup
        isNotAPromise
        open={openConfirmDelete}
        onClose={handleClosePopup}
        onConfirm={handleConfirmDelete}
        title={t("confirm_dialog.delete.title")}
        text={t("confirm_dialog.delete.text")}
      />
    </section>
  );
};

export default memo(observer(StockKeepingUnitIndex))