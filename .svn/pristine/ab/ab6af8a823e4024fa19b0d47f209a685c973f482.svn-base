/* eslint-disable react-hooks/exhaustive-deps */
import { observer } from "mobx-react";
import React, { memo, useEffect } from "react";
import { useStore } from "app/stores";
import { useTranslation } from "react-i18next";
import LotList from "./LotList";
import LotForm from "./LotForm";
import LotSearch from "./LotSearch";
import ConfirmPopup from "app/common/Component/Popup/ConfirmPopup";

function LotIndex() {
    const { t } = useTranslation();

    const {
        openConfirmDeleteLot,
        handleClosePopup,
        handleConfirmDeleteLot,
        pagingLot,
        resetStore,
    } = useStore().lotStore;

    useEffect(() => {
        pagingLot();
        return () => resetStore();
    }, []);


    return (
        <section className="cards-container">
            <h4 className="cards-header">{t("lot.title")}</h4>

            <div className="cards-body">
                <LotSearch />
                <LotList />
            </div>

            <LotForm />
            <ConfirmPopup
                open={openConfirmDeleteLot}
                onClose={handleClosePopup}
                onConfirm={handleConfirmDeleteLot}
                title={t("confirm_dialog.delete.title")}
                text={t("confirm_dialog.delete.text")}
                isNotAPromise
            />
        </section>
    );
}

export default memo(observer(LotIndex));
