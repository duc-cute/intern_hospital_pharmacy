import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useField, useFormikContext } from "formik";
import React, { Fragment, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { RequiredLabel } from "../CommonFunctions";

const GlobitsAsyncAutocomplete = ({
  name,
  api,
  displayData,
  variant,
  size,
  searchObject,
  label,
  requiredLabel = false,
  hiddenOptions,
  keyOption,
  ...otherProps
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  useEffect(() => {
    // debugger
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      let response;
      if (searchObject != null) {
        response = await api(searchObject);
      } else {
        response = await api();
      }

      if (active && response.data) {
        let newOptions;
        if (response.data) {
          newOptions = response.data;
        } else if (response.data.content) {
          newOptions = response.data.content;
        }
        if (keyOption && hiddenOptions?.length > 0 && newOptions?.length > 0) {
          newOptions = newOptions.reduce((acc, m) => {
            const some = hiddenOptions?.some(s => {
              if (s === m?.[keyOption]) {
                return true;
              }
              return false;
            })
            if (some) {
              return acc;
            }
            return [...acc, m];
          }, [])
        }
        setOptions(newOptions)
      }
    })();

    return () => {
      active = false;
    };
  }, [api, loading, searchObject]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const handleChange = (_, value) => {
    setFieldValue(name, value ? value : null);
  };

  const displayLabel = label ? <>{label}{requiredLabel && <RequiredLabel />}</> : "";


  const configSyncAutocomplete = {
    ...field,
    ...otherProps,
    id: name,
    open: open,
    size: size ? size : "small",
    onOpen: () => {
      setOpen(true);
    },
    onClose: () => {
      setOpen(false);
    },
    onChange: handleChange,
    getOptionSelected: (option, value) => option.id === value.id,
    getOptionLabel: (option) =>
      option[displayData ? displayData : "name"]
        ? option[displayData ? displayData : "name"]
        : "",
    options: options,
    loading: loading,
    renderInput: (params) => (
      <TextField
        {...params}
        label={displayLabel}
        variant={variant ? variant : "outlined"}
        InputLabelProps={{
          htmlFor: name,
          shrink: true,
        }}
        InputProps={{
          ...params.InputProps,
          endAdornment: (
            <Fragment>
              {loading ? <CircularProgress color="inherit" size={20} /> : null}
              {params.InputProps.endAdornment}
            </Fragment>
          ),
        }}
        error={meta && meta.touched && meta.error}
        helperText={meta && meta.touched && meta.error ? meta.error : ""}
        className='input-container'
      />
    ),
  };

  if (meta && meta.touched && meta.error) {
    configSyncAutocomplete.error = true;
    configSyncAutocomplete.helperText = meta.error;
  }

  return <Autocomplete {...configSyncAutocomplete} />;
};

export default GlobitsAsyncAutocomplete;
