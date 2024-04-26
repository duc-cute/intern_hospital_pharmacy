/* eslint-disable react-hooks/exhaustive-deps */
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { useStore } from "../../stores";
import { useTranslation } from "react-i18next";
import ProductList from "./ProductList";
import GlobitsConfirmationDialog from "../../common/GlobitsConfirmationDialog";
import ProductForm from "./ProductForm";
import ProductSearch from "./ProductSearch";

export default observer(function ProductIndex() {
  const { productStore } = useStore();
  const { t } = useTranslation();

  const {
    updatePageData,
    shouldOpenConfirmationDialog,
    handleClose,
    handleConfirmDelete,
    shouldOpenConfirmationDeleteListDialog,
    handleConfirmDeleteList,
    resetProductStore,
    handleResetSearchObject
  } = productStore;

  useEffect(() => {
    resetProductStore()
      updatePageData({productType: 1});
  }, [updatePageData]);

  useEffect(() => {
    return () => {
      handleResetSearchObject();
    }
  })

  return (
    <section className="cards-container">
      <h4 className="cards-header">{"Danh sách thuốc"}</h4>

      <div className="cards-body">
        <ProductSearch />
        <ProductList />
      </div>


      <ProductForm />
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
  );
});
