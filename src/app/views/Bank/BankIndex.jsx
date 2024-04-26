import { Button, Grid, useMediaQuery, useTheme } from '@material-ui/core';
import GlobitsConfirmationDialog from 'app/common/GlobitsConfirmationDialog';
import { useStore } from 'app/stores'
import { observer } from 'mobx-react'
import React, { memo, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import BankList from './BankList';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import GlobitsSearchInput from 'app/common/GlobitsSearchInput';
import BankForm from './BankForm';

const BankIndex = () => {
  const { t } = useTranslation();
  const {
    updatePageData,
    handleEditBank,
    shouldOpenEditorDialog,
    shouldOpenConfirmationDialog,
    handleClose,
    handleConfirmDelete,
    selectedBankList,
    handleDeleteList,
    shouldOpenConfirmationDeleteListDialog,
    handleConfirmDeleteList,
    resetBankStore,
  } = useStore().bankStore;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    resetBankStore();
    updatePageData();
  }, [updatePageData, resetBankStore]);

  return (
    <div className="cards-container">
      <h4 className="cards-header">Danh sách ngân hàng</h4>

      <div className="cards-body">
        <Grid className="mb-16" container spacing={3}>
          <Grid item md={6} xs={4}>
            <Button
              className="btn btn-primary d-inline-flex"
              startIcon={<AddIcon />}
              onClick={() => handleEditBank()}
            >
              {!isMobile && t("general.button.add")}
            </Button>
            {selectedBankList.length > 0 && (
              <Button
                className="btn btn-warning d-inline-flex"
                startIcon={<DeleteIcon />}
                onClick={() => handleDeleteList()}
              >
                {!isMobile && t("general.button.delete")}
              </Button>
            )}
          </Grid>

          <Grid item md={6} xs={8}>
            <GlobitsSearchInput search={updatePageData} />
          </Grid>
        </Grid>

        <BankList />
      </div>


      <BankForm open={shouldOpenEditorDialog} />

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
    </div>
  )
}

export default memo(observer(BankIndex));