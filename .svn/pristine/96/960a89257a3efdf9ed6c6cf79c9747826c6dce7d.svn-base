import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { useStore } from "app/stores";
import { Grid, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useTranslation } from "react-i18next";
import GlobitsConfirmationDialog from "app/common/GlobitsConfirmationDialog";
import UserList from "./UserList";
import GlobitsSearchInput from "app/common/GlobitsSearchInput";
import UserForm from './UserForm';
import GlobitsBreadcrumb from "app/common/GlobitsBreadcrumb";

export default observer(function UserIndex(props) {
  const { userStore } = useStore();
  const { t } = useTranslation();

  const { storeOrganizationId } = props

  const {
    updatePageData,
    handleOpenFormUser,
    handleClosePopup,
    handleConfirmDeleteUser,
    openConfirmDeleteUser,
    resetUserStore,
  } = userStore;

  useEffect(() => {
    if (storeOrganizationId) {
      updatePageData({ storeOrganizationId: storeOrganizationId });
    } else {
      updatePageData();
    }

    return () => {
      resetUserStore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatePageData]);

  return (
    <div className={storeOrganizationId ? "" : "m-sm-30"}>
      {!storeOrganizationId &&
        <div className="mb-sm-30">
          <GlobitsBreadcrumb routeSegments={[{ name: t("navigation.user") }]} />
        </div>}
      <Grid container spacing={3}>
        <Grid item md={6} sm={12} className="flex align-center">
          <Button
            className="btn btn-primary d-inline-flex"
            startIcon={<AddIcon />}
            onClick={() => handleOpenFormUser()}
          >
            {t("general.button.add")}
          </Button>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <GlobitsSearchInput search={updatePageData} />
        </Grid>
        <UserForm />

        <GlobitsConfirmationDialog
          open={openConfirmDeleteUser}
          onConfirmDialogClose={handleClosePopup}
          onYesClick={handleConfirmDeleteUser}
          title={t("confirm_dialog.delete.title")}
          text={t("confirm_dialog.delete.text")}
          agree={t("confirm_dialog.delete.agree")}
          cancel={t("confirm_dialog.delete.cancel")}
        />
        <Grid className="list-container" item xs={12}>
          <UserList />
        </Grid>
      </Grid>
    </div>
  );
});
