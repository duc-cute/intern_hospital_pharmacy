import React from "react";
import { useTranslation } from "react-i18next";
import { useStore } from "app/stores";
import SourceForm from "./SourceForm";
import { observer } from "mobx-react";
import GlobitsPopup from "app/common/GlobitsPopup";

export default observer(function SourceCreateEditPopup(props) {
  const { sourceStore } = useStore();
  const { t } = useTranslation();
  const { handleClose, selectedSource } = sourceStore;
  const { open } = props;

  return (
    <GlobitsPopup
      className="dialog-container"
      open={open}
      handleClose={handleClose}
      fullWidth
      maxWidth="sm"
      titleHeader={(selectedSource?.id ? t("general.button.edit")
        : t("general.button.add")) + " " + t("source.title")}
    >
      <SourceForm />
    </GlobitsPopup>
  );
});
