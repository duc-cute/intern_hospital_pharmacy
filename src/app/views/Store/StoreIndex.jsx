/* eslint-disable react-hooks/exhaustive-deps */
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { useStore } from "../../stores";
import { Grid, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useTranslation } from "react-i18next";
import StoreList from "./StoreList";
import GlobitsSearchInput from "app/common/GlobitsSearchInput";
import StoreForm from "./StoreForm";
import ConfirmPopup from "app/common/Component/Popup/ConfirmPopup";

export default observer(function StoreIndex() {
  const { t } = useTranslation();

  const {
    searchStore,
    openConfirmDelete,
    handleOpenForm,
    handleClosePopup,
    handleConfirmDelete,
    resetStore,
    pagingStore,
    handleChangeFormSearch,
  } = useStore().storeStore;

  useEffect(() => {
    pagingStore();
    return () => resetStore();
  }, []);

  return (
    <section className="cards-container">
      <h4 className="cards-header">{t("store.title")}</h4>

      <Grid container spacing={2} className="cards-body">
        <Grid item xs={12} sm={4}>
          <Button className="btn-orange" startIcon={<AddIcon />} onClick={() => handleOpenForm()}>
            {t("general.button.add")}
          </Button>
        </Grid>

        <Grid item xs={12} sm={8}>
          <GlobitsSearchInput search={(obj) => handleChangeFormSearch({ ...searchStore, ...obj })} />
        </Grid>

        <Grid item xs={12}>
          <StoreList />
        </Grid>
      </Grid>

      <StoreForm />

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
});
