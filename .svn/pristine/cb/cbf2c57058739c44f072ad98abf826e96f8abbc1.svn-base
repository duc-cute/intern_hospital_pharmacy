import React, { useEffect, useState } from "react";
import { FastField, getIn } from "formik";
import { TextField, useMediaQuery } from "@material-ui/core";

const GlobitsNumberInput = (props) => {
  return (
    <FastField
      {...props}
      name={props.name}
      shouldUpdate={shouldComponentUpdate}
    >
      {({ field, meta }) => {
        return <MyNumberInput {...props} field={field} meta={meta} />;
      }}
    </FastField>
  );
};

const MyNumberInput = ({
  name,
  variant = 'outlined',
  size = 'small',
  type,
  label,
  regexInput = /^\d+$/, //default
  field,
  meta,
  notDelay,
  debounceTime = 200,
  decimal = false,
  inputProps,
  maxValue,
  fullWidth = true,
  requiredLabel = false,
  notDefault = false,
  disabled,
  className = "",
  align = "left",
  ...otherProps
}) => {
  const isMobile = useMediaQuery('(max-width:720px)');

  const [value, setValue] = useState(field.value);
  const [t, setT] = useState(undefined);
  const onChange = (e) => {
    e.persist();
    if (decimal) {
      let matches = e.target.value?.match(/\./g);
      if (matches?.length > 1) {
        return;
      }
    }
    if (maxValue) {
      if (e.target.value > maxValue) {
        return;
      }
    }
    setValue(e.target.value);
    if (t) clearTimeout(t);
    // @ts-ignore
    if (notDelay) {
      if (otherProps.onChange) {
        otherProps.onChange(e);
      } else {
        field.onChange(e);
      }
    } else {
      setT(
        setTimeout(() => {
          if (otherProps.onChange) {
            otherProps.onChange(e);
          } else {
            field.onChange(e);
          }
        }, debounceTime)
      );
    }
  };

  useEffect(() => {
    setValue(field.value ?? (notDefault ? "" : 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field.value]);

  // useEffect(() => {
  //   setValue(otherProps.value);
  // }, [otherProps.value]);

  const handleKeyDown = (evt) => {
    var theEvent = evt || window.event;
    //Arrow key
    if (theEvent.key === "ArrowUp" || theEvent.key === "ArrowRight" ||
      theEvent.key === "ArrowDown" || theEvent.key === "ArrowLeft") {
      theEvent.returnValue = true;
      return;
    }
    //backspace, tab, enter
    if (theEvent.key === "Backspace" || theEvent.key === "Tab" || theEvent.key === "Enter") {
      theEvent.returnValue = true;
      return;
    }
    // Ctrl+C or Cmd+C pressed?
    if ((theEvent.ctrlKey || theEvent.metaKey) && (theEvent.key === "c" || theEvent.key === "C")) {
      theEvent.returnValue = true;
      return;
    }

    // Ctrl+V or Cmd+V pressed?
    if ((theEvent.ctrlKey || theEvent.metaKey) && (theEvent.key === "v" || theEvent.key === "V")) {
      theEvent.returnValue = true;
      return;
    }

    // Ctrl+X or Cmd+X pressed?
    if ((theEvent.ctrlKey || theEvent.metaKey) && (theEvent.key === "x" || theEvent.key === "X")) {
      theEvent.returnValue = true;
      return;
    }

    // Ctrl+Z or Cmd+Z pressed?
    if ((theEvent.ctrlKey || theEvent.metaKey) && (theEvent.key === "z" || theEvent.key === "Z")) {
      theEvent.returnValue = true;
      return;
    }

    // Delete
    if (theEvent.key === 'Delete') {
      theEvent.returnValue = true;
      return;
    }

    //cho phép thập phân
    if (decimal && theEvent.key === ".") {
      theEvent.returnValue = true;
      return;
    }

    if (!regexInput.test(theEvent.key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
  };

  const displayLabel = label ? <>{label}{requiredLabel && <span className="text-red"> *</span>}</> : "";

  const configTextfield = {
    ...field,
    ...otherProps,
    value: value || (!(notDefault) ? 0 : ""),
    id: name,
    disabled: disabled,
    label: fullWidth ? displayLabel : null,
    onKeyDown: handleKeyDown,
    onChange: onChange,
    fullWidth: fullWidth,
    size: size,
    type: (isMobile ? "tel" : (type || "")),
    InputLabelProps: {
      htmlFor: name,
      shrink: true,
    },
    inputProps: {
      ...inputProps,
      inputMode: "numeric",
      style:
      {
        textAlign: notDefault ? align : "right",
        color: !(notDefault) && "#A94442",
        backgroundColor: (!notDefault && disabled) && "#f8f8f8",
      },
      className: !(notDefault) && "inputNumber"
    },
    className: `input-container ${className}`

    // defaultValue: !(notDefault) ? 0 : ""
  };

  const isError = meta && meta.touched && meta.error;
  if ((fullWidth && isError)) {
    configTextfield.error = true
    configTextfield.helperText = meta.error
  }
  return (
    <>
      {(!fullWidth && displayLabel) &&
        <label htmlFor={name}>
          {displayLabel}
        </label>
      }
      <TextField {...configTextfield} />
    </>
  )
};

const shouldComponentUpdate = (nextProps, currentProps) => {
  return (
    nextProps.name !== currentProps.name ||
    nextProps.value !== currentProps.value ||
    nextProps.onChange !== currentProps.onChange ||
    nextProps.label !== currentProps.label ||
    nextProps.required !== currentProps.required ||
    nextProps.disabled !== currentProps.disabled ||
    nextProps.readOnly !== currentProps.readOnly ||
    nextProps.className !== currentProps.className ||
    nextProps.onBlur !== currentProps.onBlur ||
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

export default React.memo(GlobitsNumberInput);
