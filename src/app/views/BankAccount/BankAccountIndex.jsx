import { Button, Grid, useMediaQuery, useTheme } from '@material-ui/core';
import GlobitsConfirmationDialog from 'app/common/GlobitsConfirmationDialog';
import { useStore } from 'app/stores'
import { observer } from 'mobx-react'
import React, { memo, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import BankAccountList from './BankAccountList';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import GlobitsSearchInput from 'app/common/GlobitsSearchInput';
import BankAccountForm from './BankAccountForm';

const BankAccountIndex = () => {
  const { t } = useTranslation();
  const {
    updatePageData,
    handleEditBankAccount,
    shouldOpenEditorDialog,
    shouldOpenConfirmationDialog,
    handleClose,
    handleConfirmDelete,
    selectedBankAccountList,
    handleDeleteList,
    shouldOpenConfirmationDeleteListDialog,
    handleConfirmDeleteList,
    resetBankAccountStore,
  } = useStore().bankAccountStore;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    resetBankAccountStore();
    updatePageData();
  }, [updatePageData, resetBankAccountStore]);

  return (
    <div className="cards-container">
      <h4 className="cards-header">Danh sách tài khoản ngân hàng</h4>

      <div className="cards-body">
        <Grid className="mb-16" container spacing={3}>
          <Grid item md={6} xs={4}>
            <Button
              className="btn btn-primary d-inline-flex"
              startIcon={<AddIcon />}
              onClick={() => handleEditBankAccount()}
            >
              {!isMobile && t("general.button.add")}
            </Button>
            {selectedBankAccountList.length > 0 && (
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
        <BankAccountList />
      </div>

      <BankAccountForm open={shouldOpenEditorDialog} />

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

export default memo(observer(BankAccountIndex));