import React, {forwardRef, useEffect, useState} from "react";
import {TextField} from "@material-ui/core";
import {FastField, getIn} from "formik";
import {RequiredLabel} from "../CommonFunctions";

const GlobitsTextField = (props, ref) => {
    return (
        <FastField
            {...props}
            name={props.name}
            shouldUpdate={shouldComponentUpdate}
        >
            {({field, meta}) => {
                return <MyTextField {...props} field={field} meta={meta} ref={ref}/>;
            }}
        </FastField>
    );
};

const MyTextField = forwardRef((props, ref) => {

    const {
        name,
        size = "small",
        type = "text",
        debounceTime = 400, //default 400ms
        notDelay,
        field,
        meta,
        willShrink,
        autoCapitalize = false, //tự động viết hoa
        label,
        requiredLabel = false,
        isTextArea,
        inputProps,
        InputProps,
        className = "",
        ...otherProps
    } = props;
    const [value, setValue] = useState(field.value);
    const [t, setT] = useState(undefined);
    const onChange = (e) => {
        e.persist();
        let value = e.target.value;
        if (autoCapitalize) {
            if (value.charAt(0) === value.charAt(0).toLowerCase()) {
                value = value.replace(value.charAt(0), value.charAt(0).toLocaleUpperCase());
            }
            value = value.replace(/\s\S/g, s => s.toLocaleUpperCase())
            e.target.value = value
        }
        setValue(value);
        if (!notDelay) {
            if (t) clearTimeout(t);
            // @ts-ignore
            setT(
                setTimeout(() => {
                    if (otherProps.onChange) {
                        otherProps.onChange(e);
                    } else {
                        field.onChange(e);
                    }
                }, debounceTime)
            );
        } else {
            if (otherProps.onChange) {
                otherProps.onChange(e);
            } else {
                field.onChange(e);
            }
        }
    };

    useEffect(() => {
        setValue(field.value);
    }, [field.value]);

    useEffect(() => {
        setValue(otherProps.value);
    }, [otherProps.value]);

    const displayLabel = label ? <>{label}{requiredLabel && <RequiredLabel/>}</> : "";

    const configTextfield = {
        ...field,
        ...otherProps,
        value: value,
        label: displayLabel,
        id: name,
        multiline: isTextArea,
        onChange: onChange,
        fullWidth: isBoolean(otherProps?.fullWidth)
            ? otherProps?.fullWidth
            : true,
        size: size ? size : "small",
        inputProps: {
            ref: ref,
            ...inputProps,
        },
        InputProps: {
            ...InputProps,
            endAdornment: InputProps?.endAdornment
        },
        type: type ? type : "",
        InputLabelProps: {
            htmlFor: name,
            shrink: true,
        },
        className: `input-container ${className} ${isTextArea ? 'isTextArea' : ''}`
    };

    if (willShrink) configTextfield.InputLabelProps = {
        htmlFor: name
    };

    if (meta && meta.touched && meta.error) {
        configTextfield.error = true;
        configTextfield.helperText = meta.error;
    }

    return <TextField {...configTextfield} />;
});

const shouldComponentUpdate = (nextProps, currentProps) => {
    return (
        nextProps.name !== currentProps.name ||
        nextProps.value !== currentProps.value ||
        nextProps.onChange !== currentProps.onChange ||
        nextProps.label !== currentProps.label ||
        nextProps.required !== currentProps.required ||
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
const isBoolean = (val) => "boolean" === typeof val;

export default React.memo(forwardRef(GlobitsTextField));