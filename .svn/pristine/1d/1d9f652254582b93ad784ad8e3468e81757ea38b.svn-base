/* eslint-disable react-hooks/exhaustive-deps */
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { useStore } from "app/stores";
import { Grid, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useTranslation } from "react-i18next";
import GlobitsConfirmationDialog from "app/common/GlobitsConfirmationDialog";
import GlobitsSearchInput from "app/common/GlobitsSearchInput";
import StoreOrganizationForm from './StoreOrganizationForm';
import { ORG_PRODUCT_TYPE } from "app/common/Constant/LocalConstant";
import { IconButton, Icon } from "@material-ui/core";
import GlobitsTable from "app/common/GlobitsTable";

export default observer(function StoreOrganizationIndex(props) {
  const { storeOrganizationStore } = useStore();
  const { t } = useTranslation();

  const {
    searchObject,
    pageStoreOrganization,
    openConfirmDeleteStoreOrganization,
    handleOpenFormStoreOrganization,
    handleClosePopup,
    handleConfirmDelete,
    handleChangeForm,
    handleOpenConfirmDelete,
    pagingStoreOrganization,
    resetStoreOrganizationStore,
  } = storeOrganizationStore;

  let columns = [
    { title: t("storeOrganization.code"), field: "code", align: "left", width: "150" },
    { title: t("storeOrganization.name"), field: "name", width: "150" },
    { title: t("storeOrganization.orgProductType"), field: "orgProductType", render: row => ORG_PRODUCT_TYPE.find(f => f.value === row?.orgProductType)?.name },
    {
      title: t("general.action"),
      render: (rowData) => (
        <>
          <IconButton size="small" onClick={() => handleOpenFormStoreOrganization(rowData.id)}>
            <Icon fontSize="small" color="primary">
              edit
            </Icon>
          </IconButton>

          <IconButton size="small" onClick={() => handleOpenConfirmDelete(rowData)}>
            <Icon fontSize="small" color="error">
              delete
            </Icon>
          </IconButton>
        </>
      ),
    },
  ];

  useEffect(() => {
    pagingStoreOrganization();
    return resetStoreOrganizationStore;
  }, []);

  return (
    <section className="cards-container">
      <h4 className="cards-header">{t("navigation.manage.store-organization")}</h4>

      <div className="cards-body">
        <Grid container spacing={3} className="mb-6">
          <Grid item md={6} sm={12}>
            <Button
              className="mb-16 mr-16 btn btn-primary d-inline-flex"
              startIcon={<AddIcon />}
              onClick={() => handleOpenFormStoreOrganization()}
            >
              {t("general.button.add")}
            </Button>
          </Grid>

          <Grid item md={6} xs={12}>
            <GlobitsSearchInput search={handleChangeForm} />
          </Grid>
        </Grid>

        <GlobitsTable
          doubleSidePagination={false}
          columns={columns}
          data={pageStoreOrganization?.content}
          totalPages={pageStoreOrganization?.totalPages}
          totalElements={pageStoreOrganization?.totalElements}
          pageSize={searchObject?.pageSize}
          page={searchObject?.pageIndex}
          handleChangePage={(_, pageIndex) => handleChangeForm({ pageIndex })}
          setRowsPerPage={(event) => handleChangeForm({ pageSize: event?.target.value })}
        />

        <StoreOrganizationForm />

        <GlobitsConfirmationDialog
          open={openConfirmDeleteStoreOrganization}
          onConfirmDialogClose={handleClosePopup}
          onYesClick={handleConfirmDelete}
          title={t("confirm_dialog.delete.title")}
          text={t("confirm_dialog.delete.text")}
          agree={t("confirm_dialog.delete.agree")}
          cancel={t("confirm_dialog.delete.cancel")}
        />
      </div>
    </section>
  );
});
