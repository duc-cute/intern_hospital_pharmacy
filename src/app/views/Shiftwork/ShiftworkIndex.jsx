import { Button, Grid, useMediaQuery, useTheme } from '@material-ui/core';
import GlobitsConfirmationDialog from 'app/common/GlobitsConfirmationDialog';
import { useStore } from 'app/stores'
import { observer } from 'mobx-react'
import React, { memo, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import ShiftworkList from './ShiftworkList';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import GlobitsSearchInput from 'app/common/GlobitsSearchInput';
import ShiftworkForm from './ShiftworkForm';

const ShiftworkIndex = () => {
  const { t } = useTranslation();
  const {
    updatePageData,
    handleEditShiftwork,
    shouldOpenEditorDialog,
    shouldOpenConfirmationDialog,
    handleClose,
    handleConfirmDelete,
    selectedShiftworkList,
    handleDeleteList,
    shouldOpenConfirmationDeleteListDialog,
    handleConfirmDeleteList,
    resetShiftworkStore,
  } = useStore().ShiftworkStore;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    resetShiftworkStore();
    updatePageData();
  }, [updatePageData, resetShiftworkStore]);

  return (
    <section className="cards-container">
      <h4 className="cards-header">{t("shiftWork.title")}</h4>

      <div className="cards-body">
        <Grid className="mb-16" container spacing={3}>
          <Grid item md={6} xs={4}>
            <Button
              className="mr-16 btn btn-primary d-inline-flex"
              startIcon={<AddIcon />}
              onClick={() => handleEditShiftwork()}
            >
              {!isMobile && t("general.button.add")}
            </Button>

            {selectedShiftworkList.length > 0 && (
              <Button
                className="mr-36 btn btn-warning d-inline-flex"
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

        <ShiftworkList />
      </div>

      <ShiftworkForm open={shouldOpenEditorDialog} />

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

export default memo(observer(ShiftworkIndex));