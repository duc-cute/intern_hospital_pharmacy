import React from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@material-ui/core";
import { useField } from "formik";

const GlobitsCheckBox = ({ name, label, ...otherProps }) => {
  const [field, meta] = useField(name);

  const configCheckBox = {
    ...field,
    ...otherProps,
    value: field.value || "",
    checked: field.value || null,
  };

  if (meta && meta.touched && meta.error) {
    configCheckBox.error = true;
    configCheckBox.helperText = meta.error;
  }

  return (
    <FormGroup>
      <FormControlLabel
        control={<Checkbox {...configCheckBox} />}
        label={label}
      />
    </FormGroup>
  );
};

export default GlobitsCheckBox;
