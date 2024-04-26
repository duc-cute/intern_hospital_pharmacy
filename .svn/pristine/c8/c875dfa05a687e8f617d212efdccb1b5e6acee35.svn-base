import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useFormikContext, useField } from "formik";
import React from "react";
import { RequiredLabel } from "../CommonFunctions";

const GlobitsAutocomplete = ({
  name,
  options,
  displayData,
  variant,
  size,
  isObject,
  properties,
  label,
  updateParent,
  getOptionLabel,
  getOptionSelected,
  handleChange,
  inputProps,
  requiredLabel,
  ...otherProps
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const getDefaultOptionLabel = (option) => {
    return option[displayData ? displayData : "name"];
  };

  const defaultHandleChange = (_, value) => {
    if (isObject) {
      setFieldValue(name, value.value ? value.value : null);
    } else {
      setFieldValue(name, value ? value : null);
    }

    if (updateParent) {
      updateParent(value);
    }
  };

  const handleDefaultGetOptionSelected = (option, value) => {
    return option?.id === value?.id;
  };

  const displayLabel = label ? <>{label}{requiredLabel && <RequiredLabel />}</> : null;

  const configAutocomplete = {
    ...field,
    ...otherProps,
    id: name,
    size: size ? size : "small",
    options: options?.length > 0 ? options : [],
    autoHighlight: true,
    openOnFocus: true,
    getOptionLabel: getOptionLabel ? getOptionLabel : getDefaultOptionLabel,
    onChange: handleChange ? handleChange : defaultHandleChange,
    getOptionSelected: getOptionSelected
      ? getOptionSelected
      : handleDefaultGetOptionSelected,
    onKeyDown:(event) => {
      if (event.key === "Enter") {
        event.stopPropagation();
        event.preventDefault();
      }
      return true;
    },
    renderInput: (params) => (
      <TextField
        {...params}
        label={displayLabel}
        InputLabelProps={{
          htmlFor: name,
          shrink: true,
        }}
        inputProps={{
          ...params?.inputProps,
          ...inputProps,
        }}
        className={`input-container ${otherProps?.className}`}
      />
    ),
  };

  if (meta && meta.touched && meta.error) {
    configAutocomplete.renderInput = (params) => (
      <TextField
        {...params}
        label={displayLabel}
        error={true}
        helperText={meta.error}
        InputLabelProps={{
          htmlFor: name,
          shrink: true,
        }}
        inputProps={{
          ...params?.inputProps,
          ...inputProps,
        }}
        className='input-container'
      />
    );
  }

  return <Autocomplete {...configAutocomplete} />;
};
export default React.memo(GlobitsAutocomplete);
