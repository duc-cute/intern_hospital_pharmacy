import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { useStore } from "../../stores";
import RoleList from "./RoleList";
import { useTranslation } from "react-i18next";
import { Grid } from "@material-ui/core";
import { Breadcrumb } from "egret";

export default observer(function RoleIndex() {
  const { roleStore } = useStore();
  const { t } = useTranslation();

  const { updatePageData } = roleStore;

  useEffect(() => {
    updatePageData();
  }, [updatePageData]);
  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb routeSegments={[{ name: t("color.title") }]} />
      </div>
      <Grid className="list-container" item xs={12}>
        <RoleList />
      </Grid>
    </div>
  );
});
