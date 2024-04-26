import GlobitsConfirmationDialog from "app/common/GlobitsConfirmationDialog";
import { useStore } from "app/stores"
import { observer } from "mobx-react"
import React, { memo, useEffect } from "react"
import CustomerList from "./CustomerList";
import { Button, Grid, useMediaQuery, useTheme } from "@material-ui/core";
import CreateOrEditCustomer from "./CreateOrEditCustomer";
import { useTranslation } from "react-i18next";
import AddIcon from '@material-ui/icons/Add';
import GlobitsSearchInput from "app/common/GlobitsSearchInput";

const CustomerIndex = () => {
  const { t } = useTranslation();
  const { updatePageData, handleOpenForm, openFormConfirm, handleClosePopup, handleConfirmDelete, resetCustomerStore, openForm } = useStore().customerStore;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    resetCustomerStore();
    updatePageData();
  }, [resetCustomerStore, updatePageData])

  return (
    <section className="cards-container">
      <h4 className="cards-header">{t("customer.title")}</h4>
      <div className="cards-body">
        <Grid className="mb-16" container spacing={3}>
          <Grid item md={6} xs={4}>
            <Button
              className="mr-16 btn btn-primary d-inline-flex"
              startIcon={<AddIcon />}
              onClick={() => handleOpenForm()}
            >
              {!isMobile && t("general.button.add")}
            </Button>
          </Grid>

          <Grid item md={6} xs={8}>
            <GlobitsSearchInput search={updatePageData} />
          </Grid>
        </Grid>

        <CustomerList />
      </div>

      <CreateOrEditCustomer open={openForm} handleClose={handleClosePopup} />

      <GlobitsConfirmationDialog
        open={openFormConfirm}
        onConfirmDialogClose={handleClosePopup}
        onYesClick={handleConfirmDelete}
        title={t("confirm_dialog.delete.title")}
        text={t("confirm_dialog.delete.text")}
        agree={t("confirm_dialog.delete.agree")}
        cancel={t("confirm_dialog.delete.cancel")}
      />
    </section>
  )
}

export default memo(observer(CustomerIndex))