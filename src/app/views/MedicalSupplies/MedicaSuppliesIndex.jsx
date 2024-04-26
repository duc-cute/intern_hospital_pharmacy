/* eslint-disable react-hooks/exhaustive-deps */
import {observer} from "mobx-react";
import React, {useEffect} from "react";
import {useStore} from "../../stores";
import {useTranslation} from "react-i18next";
import MedicaSuppliesList from "./MedicaSuppliesList";
import GlobitsConfirmationDialog from "../../common/GlobitsConfirmationDialog";
import MedicaSuppliesForm from "./MedicaSuppliesForm";
import MedicaSuppliesSearch from "./MedicaSuppliesSearch";

export default observer(function MedicaSuppliesIndex() {
    const {productStore} = useStore();
    const {t} = useTranslation();

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
        updatePageData({productType: 2});
    }, [updatePageData]);

    useEffect(() => {
        return () => {
            handleResetSearchObject();
        }
    })

    return (
        <section className="cards-container">
            <h4 className="cards-header">{"Danh sách vật tư y tế"}</h4>

            <div className="cards-body">
                <MedicaSuppliesSearch/>
                <MedicaSuppliesList/>
            </div>


            <MedicaSuppliesForm/>
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
