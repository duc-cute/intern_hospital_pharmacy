/* eslint-disable react-hooks/exhaustive-deps */
import {observer} from "mobx-react";
import React, {useEffect} from "react";
import {useStore} from "../../stores";
import {Button, Grid} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import {useTranslation} from "react-i18next";
import CountryList from "./CountryList";
import GlobitsConfirmationDialog from "../../common/GlobitsConfirmationDialog";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import GlobitsSearchInput from "app/common/GlobitsSearchInput";
import CountryForm from "./CountryForm";

export default observer(function CountryIndex() {
    const {countryStore} = useStore();
    const {t} = useTranslation();

    const {
        updatePageData,
        handleEditCountry,
        shouldOpenEditorDialog,
        shouldOpenConfirmationDialog,
        handleClose,
        handleConfirmDelete,
        selectedCountryList,
        handleDeleteList,
        shouldOpenConfirmationDeleteListDialog,
        handleConfirmDeleteList,
        resetCountryStore,
    } = countryStore;

    useEffect(() => {
        resetCountryStore();
        updatePageData();
    }, []);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <section className="cards-container">
            <h4 className="cards-header">{"Quốc gia"}</h4>

            <div className="cards-body">
                <Grid className="mb-16" container spacing={3}>
                    <Grid item md={6} xs={4}>
                        <Button
                            className="btn btn-primary d-inline-flex"
                            startIcon={<AddIcon/>}
                            onClick={() => handleEditCountry()}
                        >
                            {!isMobile && t("general.button.add")}
                        </Button>

                        {selectedCountryList.length > 0 && (
                            <Button
                                className="btn btn-warning d-inline-flex"
                                startIcon={<DeleteIcon/>}
                                onClick={() => handleDeleteList()}
                            >
                                {!isMobile && t("general.button.delete")}
                            </Button>
                        )}
                    </Grid>

                    <Grid item md={6} xs={8}>
                        <GlobitsSearchInput search={updatePageData}/>
                    </Grid>
                </Grid>

                <CountryList/>
            </div>

            {shouldOpenEditorDialog &&
                <CountryForm open={shouldOpenEditorDialog}/>
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
