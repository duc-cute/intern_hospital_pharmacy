import React, { useEffect, useState } from "react";
import { FastField, getIn } from "formik";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import viLocale from "date-fns/locale/vi";
import ErrorIcon from "../ErrorIcon/ErrorIcon";
import { RequiredLabel } from "../CommonFunctions";

const GlobitsTimePicker = (props) => {
  return (
    <FastField
      {...props}
      name={props.name}
      shouldUpdate={shouldComponentUpdate}
    >
      {({ field, meta, form }) => {
        return (
          <MyTimePicker
            {...props}
            field={field}
            meta={meta}
            setFieldValue={form.setFieldValue}
          />
        );
      }}
    </FastField>
  );
};

const MyTimePicker = ({
  name,
  size = "small",
  fullWidth = true,
  label,
  format,
  inputVariant,
  defaultValue,
  notDelay,
  field,
  meta,
  setFieldValue,
  sx,
  requiredLabel = false,
  debounceTime = 0,
  ...otherProps
}) => {
  const onChange = (value) => {
    // e.persist();
    setValue(value);
    if (!notDelay) {
      if (t) clearTimeout(t);
      // @ts-ignore
      setT(setTimeout(() => {
        if (otherProps.onChange) {
          otherProps.onChange(value);
        } else {
          setFieldValue(name, value);
        }
      }, debounceTime));
    } else {
      if (otherProps.onChange) {
        otherProps.onChange(value);
      } else {
        setFieldValue(name, value);
      }
    }
  }

  const [value, setValue] = useState(field.value);
  const [t, setT] = useState(undefined);

  useEffect(() => {
    setValue(field.value ?? "")
  }, [field.value])

  const okLabelDefault = "CHỌN"
  const cancelLabelDefault = "HUỶ"

  const isError = meta?.touched && meta?.error

  const displayLabel = label ? <>{label}{requiredLabel && <RequiredLabel />}</> : "";
  const configTimePicker = {
    ...field,
    ...otherProps,
    label: displayLabel,
    size: size || "small",
    format: format || "HH:mm",
    fullWidth: fullWidth ?? false,
    value: value || null,
    id: name,
    onChange: onChange,
    InputLabelProps: {
      htmlFor: name,
      shrink: true,
    },
    invalidDateMessage: "Thời gian không hợp lệ",
    okLabel: otherProps?.okLabel || okLabelDefault,
    cancelLabel: otherProps?.cancelLabel || cancelLabelDefault,
    error: isError,
    helperText: fullWidth && isError ? meta.error : '',
    className: 'input-container',
    style: {
      ...sx,
    }
  };

  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={viLocale}>
        {
          <KeyboardTimePicker {...configTimePicker} />
        }
      </MuiPickersUtilsProvider>
      {(isError && !fullWidth) && <ErrorIcon helperText={meta.error} />}
    </>
  )
};

const shouldComponentUpdate = (nextProps, currentProps) => {
  return (
    nextProps.name !== currentProps.name ||
    nextProps.value !== currentProps.value ||
    nextProps.onChange !== currentProps.onChange ||
    nextProps.disablePast !== currentProps.disablePast ||
    nextProps.disableFuture !== currentProps.disableFuture ||
    nextProps.label !== currentProps.label ||
    nextProps.required !== currentProps.required ||
    nextProps.minDate !== currentProps.minDate ||
    nextProps.maxDate !== currentProps.maxDate ||
    nextProps.disabled !== currentProps.disabled ||
    nextProps.readOnly !== currentProps.readOnly ||
    nextProps.formik.isSubmitting !== currentProps.formik.isSubmitting ||
    Object.keys(nextProps).length !== Object.keys(currentProps).length ||
    getIn(nextProps.formik.values, currentProps.name) !==
    getIn(currentProps.formik.values, currentProps.name) ||
    getIn(nextProps.formik.errors, currentProps.name) !==
    getIn(currentProps.formik.errors, currentProps.name) ||
    getIn(nextProps.formik.touched, currentProps.name) !==
    getIn(currentProps.formik.touched, currentProps.name)
  );
};

export default React.memo(GlobitsTimePicker);
