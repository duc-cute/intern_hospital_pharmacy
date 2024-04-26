/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, memo } from "react";
import { TextField } from "@material-ui/core";
import { FastField, getIn } from "formik";
import Required from "./RequiredLabel";
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

const GlobitsVNDCurrencyInput = (props) => (
    <FastField {...props} name={props.name} shouldUpdate={shouldComponentUpdate}>
        {({ field, meta, form }) => <Component {...props} field={field} meta={meta} setFieldValue={form.setFieldValue} />}
    </FastField>
);

const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(
    props,
    ref,
) {
    const { onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            valueIsNumericString
        />
    );
});

NumericFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const Component = ({
    name,
    label,
    type = "text",
    debounceTime = 400, //default 0ms
    notDelay,
    field,
    meta,
    disabled,
    placeholder,
    isTextArea,
    minRowArea,
    required,
    className = '',
    onChange,
    setFieldValue,
    readOnly,
    autoCapitalize = false, // tự động viết hoa
    unit = "VND"
}) => {
    const [value, setValue] = useState(field.value);
    const [t, setT] = useState(undefined);

    useEffect(() => {
        if (field.value !== value)
            setValue(field.value ?? "");
    }, [field.value]);

    const handleChange = (e) => {
        let value = e.target.value;
        if (autoCapitalize) {
            if (value.charAt(0) === value.charAt(0).toLowerCase()) {
                value = value.replace(value.charAt(0), value.charAt(0).toLocaleUpperCase());
            }
            value = value.replace(/\s\S/g, s => s.toLocaleUpperCase())
        }
        setValue(value);
        if (!notDelay) {
            if (t) {
                clearTimeout(t);
            }
            if (onChange) {
                setT(setTimeout(() => onChange(e), debounceTime));
            } else {
                setT(setTimeout(() => setFieldValue(name, e.target.value ?? null), debounceTime));
            }
        } else {
            if (onChange) {
                onChange(e);
            } else {
                setFieldValue(name, e.target.value ?? null);
            }
        }
    };

    return (
        <TextField
            multiline={isTextArea}
            id={name}
            name={name}
            value={value ?? ""}
            fullWidth
            label={!label ? null : <Required label={label} required={required} />}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            type={type}
            error={Boolean(meta && meta.touched && meta.error)}
            helperText={meta && meta.touched && meta.error ? meta.error : ""}
            InputProps={{
                readOnly: readOnly,
                inputComponent: NumericFormatCustom,
                endAdornment: unit
            }}
            InputLabelProps={{
                htmlFor: name,
                shrink: true,
            }}
            className={`input-container ${className} ${readOnly ? 'read-only' : ''} ${isTextArea ? 'isTextArea' : ''}`}
            minRows={minRowArea}
        />
    )
};

const shouldComponentUpdate = (nextProps, currentProps) => (
    nextProps?.readOnly !== currentProps?.readOnly ||
    nextProps?.value !== currentProps?.value ||
    nextProps?.onChange !== currentProps?.onChange ||
    nextProps?.disabled !== currentProps?.disabled ||
    nextProps?.name !== currentProps?.name ||
    Object.assign(nextProps).length !== Object.assign(currentProps).length ||
    getIn(nextProps.formik.values, currentProps.name) !== getIn(currentProps.formik.values, currentProps.name) ||
    getIn(nextProps.formik.errors, currentProps.name) !== getIn(currentProps.formik.errors, currentProps.name) ||
    getIn(nextProps.formik.touched, currentProps.name) !== getIn(currentProps.formik.touched, currentProps.name)
);

export default memo(GlobitsVNDCurrencyInput);

