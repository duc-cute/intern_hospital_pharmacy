import { Button, Grid, useMediaQuery, useTheme } from '@material-ui/core';
import { useStore } from 'app/stores';
import { observer } from 'mobx-react'
import React, { memo, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import SaleAssociateList from './SaleAssociateList';
import GlobitsConfirmationDialog from 'app/common/GlobitsConfirmationDialog';
import SaleAssociateForm from './SaleAssociateForm';
import GlobitsSearchInput from 'app/common/GlobitsSearchInput';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

const SaleAssociateIndex = () => {
  const { t } = useTranslation();
  const {
    handleEditSaleAss,
    shouldOpenEditorDialog,
    shouldOpenConfirmationDialog,
    shouldOpenConfirmationDeleteListDialog,
    updatePageData,
    handleClose,
    handleConfirmDelete,
    selectedSaleAssList,
    handleDeleteList,
    handleConfirmDeleteList,
    resetSaleAssStore,
  } = useStore().saleAssociateStore;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    resetSaleAssStore();
    updatePageData();
  }, [resetSaleAssStore, updatePageData])

  return (
    <section className="cards-container">
      <h4 className="cards-header">{t("saleAssociate.title")}</h4>
      <div className="cards-body">
        <Grid className="mb-16" container spacing={3}>
          <Grid item md={6} xs={4}>
            <Button
              className="mr-16 btn btn-primary d-inline-flex"
              startIcon={<AddIcon />}
              onClick={() => {
                handleEditSaleAss();
              }}
            >
              {!isMobile && t("general.button.add")}
            </Button>
            {selectedSaleAssList.length > 0 && (
              <Button
                className=" mr-36 btn btn-warning d-inline-flex"
                startIcon={<DeleteIcon />}
                onClick={() => {
                  handleDeleteList();
                }}
              >
                {!isMobile && t("general.button.delete")}
              </Button>
            )}
          </Grid>

          <Grid item md={6} xs={8}>
            <GlobitsSearchInput search={updatePageData} />
          </Grid>
        </Grid>

        <SaleAssociateList />
      </div>

      <SaleAssociateForm open={shouldOpenEditorDialog} />

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
      />
    </section>
  )
}

export default memo(observer(SaleAssociateIndex));