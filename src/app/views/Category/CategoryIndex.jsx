/* eslint-disable react-hooks/exhaustive-deps */
import {observer} from "mobx-react";
import React, {useEffect} from "react";
import {useStore} from "../../stores";
import {useTranslation} from "react-i18next";
import CategoryList from "./CategoryList";
import GlobitsConfirmationDialog from "../../common/GlobitsConfirmationDialog";
import CategorySearch from "./CategorySearch";
import CategoryForm from "./CategoryForm";

export default observer(function CategoryIndex() {
    const {categoryStore} = useStore();
    const {t} = useTranslation();

    const {
        updatePageData,
        shouldOpenEditorDialog,
        shouldOpenConfirmationDialog,
        handleClose,
        handleConfirmDelete,
        shouldOpenConfirmationDeleteListDialog,
        handleConfirmDeleteList,
        resetCategoryStore,
    } = categoryStore;

    useEffect(() => {
        resetCategoryStore();
        updatePageData({parentOnly: true, productType: 2});
    }, []);

    return (
        <section className="cards-container">
            <h4 className="cards-header">{"Nhóm vật tư y tế"}</h4>

            <div className="cards-body">
                {/*<Grid className="mb-16" container spacing={3}>*/}
                {/*  <Grid item md={6} xs={4}>*/}
                {/*    <Button*/}
                {/*      className="btn btn-primary d-inline-flex"*/}
                {/*      startIcon={<AddIcon />}*/}
                {/*      onClick={() => handleEditCategory()}*/}
                {/*    >*/}
                {/*      {!isMobile && t("general.button.add")}*/}
                {/*    </Button>*/}

                {/*    {selectedCategoryList.length > 0 && (*/}
                {/*      <Button*/}
                {/*        className="btn btn-warning d-inline-flex"*/}
                {/*        startIcon={<DeleteIcon />}*/}
                {/*        onClick={() => handleDeleteList()}*/}
                {/*      >*/}
                {/*        {!isMobile && t("general.button.delete")}*/}
                {/*      </Button>*/}
                {/*    )}*/}
                {/*  </Grid>*/}

                {/*  <Grid item md={6} xs={8}>*/}
                {/*     <GlobitsSearchInput search={updatePageData} />*/}
                {/*  </Grid>*/}
                {/*</Grid>*/}
                <CategorySearch/>
                <CategoryList/>
            </div>

            {shouldOpenEditorDialog &&
                <CategoryForm open={shouldOpenEditorDialog}/>
            }

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
