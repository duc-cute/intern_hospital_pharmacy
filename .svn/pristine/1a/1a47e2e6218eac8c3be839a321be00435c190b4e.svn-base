import { Checkbox, FormControlLabel, Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import SelectAdministrativeUnit from "./SelectAdministrativeUnit";
import { useFormikContext } from "formik";

export default function SyncAdministrativeUnit(props) {
  // const { readOnly } = props;
  // const [checkboxText, setCheckboxText] = useState("Giống địa chỉ thường trú");
  const [checked, setChecked] = useState(false);
  const { values, setFieldValue } = useFormikContext();

  const handleSync = (event, checked) => {
    if (checked) {
      setFieldValue("currentRegion", values.permanentRegion);
      setFieldValue("currentProvince", values.permanentProvince);
      setFieldValue("currentDistrict", values.permanentDistrict);
      setFieldValue("currentWard", values.permanentWard);
      setFieldValue("currentDetailResidence", values.permanentDetailResidence);
    }
    setChecked(checked);
  };

  useEffect(() => {
    if (checked) {
      setFieldValue("currentRegion", values.permanentRegion);
    }
  }, [values.permanentRegion])

  useEffect(() => {
    if (checked) {
      setFieldValue("currentProvince", values.permanentProvince);
    }
  }, [values.permanentProvince])

  useEffect(() => {
    if (checked) {
      setFieldValue("currentDistrict", values.permanentDistrict);
    }
  }, [values.permanentDistrict])
  useEffect(() => {
    if (checked) {
      setFieldValue("currentWard", values.permanentWard);
    }
  }, [values.permanentWard])

  useEffect(() => {
    if (checked) {
      setFieldValue("currentDetailResidence", values.permanentDetailResidence);
    }
  }, [values.permanentDetailResidence])

  return (
    <>
      <Grid className="form-title" item xs={12}>
        <h4>Địa chỉ thường trú</h4>
      </Grid>
      <Grid className="form-content" item xs={12}>
        <Grid container spacing={2}>
          <SelectAdministrativeUnit
            region={
              values?.permanentRegion ?
                values.permanentRegion :
                ""
            }
            province={
              values?.permanentProvince ?
                values.permanentProvince :
                ""
            }
            district={
              values?.permanentDistrict ?
                values.permanentDistrict :
                ""
            }
            ward={
              values?.permanentWard ?
                values.permanentWard :
                ""
            }
            prefix="permanent"
            detailResidence={
              values?.permanentDetailResidence
                ? values.permanentDetailResidence
                : ""
            }
          />
        </Grid>
      </Grid>


      <Grid className="form-title" item xs={12}>
        <h4>Địa chỉ hiện tại</h4>
      </Grid>
      <Grid className="form-content" item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControlLabel
              onChange={handleSync}
              checked={checked}
              control={<Checkbox />}
              label="Giống địa chỉ thường trú"
            />
          </Grid>
          <SelectAdministrativeUnit
            disabled={checked}
            region={
              values?.currentRegion
                ? values.currentRegion
                : ""
            }
            province={
              values?.currentProvince
                ? values.currentProvince
                : ""
            }
            district={
              values?.currentDistrict
                ? values.currentDistrict
                : ""
            }
            ward={
              values?.currentWard
                ? values.currentWard
                : ""
            }
            detailResidence={
              values?.currentDetailResidence
                ? values.currentDetailResidence
                : ""
            }
            prefix="current"
          />
        </Grid>
      </Grid>

    </>
  );
}
