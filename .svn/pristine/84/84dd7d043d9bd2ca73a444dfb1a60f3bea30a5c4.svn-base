/* eslint-disable react-hooks/exhaustive-deps */
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { useStore } from "../../stores";
import { Grid, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useTranslation } from "react-i18next";
import StaffList from "./StaffList";
import GlobitsSearchInput from "app/common/GlobitsSearchInput";
import ConfirmPopup from "app/common/Component/Popup/ConfirmPopup";
import StaffForm from "./StaffForm";

export default observer(function StaffIndex() {
  const { staffStore } = useStore();
  const { t } = useTranslation();

  const {
    searchStaff,
    openConfirmDelete,
    pagingStaff,
    handleClosePopup,
    handleConfirmDelete,
    handleOpenForm,
    resetStore,
    handleChangeFormSearch
  } = staffStore;

  useEffect(() => {
    pagingStaff();
    return resetStore
  }, []);

  return (
    <section className="cards-container">
      <h4 className="cards-header">Nhân viên</h4>

      <Grid container spacing={2} className="cards-body">
        <Grid item xs={12} sm={4}>
          <Button
            className="btn btn-primary d-inline-flex"
            startIcon={<AddIcon />}
            variant="contained"
            onClick={() => handleOpenForm()}
          >
            {t("general.button.add")}
          </Button>
        </Grid>

        <Grid item xs={12} sm={8}>
          <GlobitsSearchInput search={(obj) => handleChangeFormSearch({ ...searchStaff, ...obj })} />
        </Grid>

        <Grid item xs={12}>
          <StaffList />
        </Grid>
      </Grid>

      <StaffForm />

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
