import {TextField} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React from "react";
import {FastField, getIn} from "formik";
import {RequiredLabel} from "../CommonFunctions";

const GlobitsSelectInput = (props) => {
    return (
        <FastField
            {...props}
            name={props.name}
            shouldUpdate={shouldComponentUpdate}
        >
            {({field, meta, form}) => {
                return (
                    <MySelectInput
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

const MySelectInput = ({
                           name,
                           variant = "outlined",
                           size = "small",
                           type = "text",
                           fullWidth = true,
                           options,
                           label,
                           keyValue = "value",
                           displayValue = "name",
                           noNullOption,
                           handleChange,
                           handleClick,
                           field,
                           meta,
                           setFieldValue,
                           requiredLabel = false,
                           placeholder = "",
                           ...otherProps
                       }) => {
    const getDefaultOptionLabel = (option) => {
        return (
            (isNumber(option?.[displayValue || "name"])
                ? option?.[displayValue || "name"] + ""
                : option?.[displayValue || "name"]) ??
            (isNumber(
                options?.find((item) => item?.[keyValue] == option)?.[
                displayValue || "name"
                    ]
            )
                ? options?.find((item) => item?.[keyValue] == option)?.[
            displayValue || "name"
                ] + ""
                : options?.find((item) => item?.[keyValue] == option)?.[
                displayValue || "name"
                    ]) ??
            null
        );
    };

    const defaultHandleChange = (_, value) => {
        if (handleChange) {
            let e = {
                target: {
                    value: value?.[keyValue] ?? null,
                },
            };
            handleChange(e);
        } else {
            setFieldValue(name, value?.[keyValue] ?? null);
        }
    };

    const handleDefaultGetOptionSelected = (option, value) => {
        return option?.[keyValue] == value;
    };

    const displayLabel = label ? <>{label}{requiredLabel && <RequiredLabel/>}</> : "";

    const configAutocomplete = {
        ...field,
        ...otherProps,
        // select: true,
        id: name,
        size: size ? size : "small",
        options: options?.length > 0 ? options : [],
        autoHighlight: true,
        openOnFocus: true,
        fullWidth: fullWidth,
        disableClearable: noNullOption,
        getOptionLabel: getDefaultOptionLabel,
        onChange: defaultHandleChange,
        onClick: handleClick,
        getOptionSelected: handleDefaultGetOptionSelected,
        noOptionsText: "Không có dữ liệu",
        onKeyDown: (event) => {
            if (event.key === "Enter") {
                event.stopPropagation();
                event.preventDefault();
            }
            return true;
        },
        renderInput: (params) => (
            <TextField
                placeholder={placeholder}
                {...params}
                // variant={variant || "standard"}
                label={displayLabel}
                InputLabelProps={{
                    htmlFor: name,
                    shrink: true,
                }}
                error={(meta && meta.touched && meta.error) ? true : false}
                helperText={meta && meta.touched && meta.error ? meta.error : ""}
            />
        ),
        className: "input-container"
    };

    return <Autocomplete {...configAutocomplete} />;
};

const shouldComponentUpdate = (nextProps, currentProps) => {
    return (
        nextProps.name !== currentProps.name ||
        nextProps.value !== currentProps.value ||
        nextProps.handleChange !== currentProps.handleChange ||
        nextProps.label !== currentProps.label ||
        nextProps.required !== currentProps.required ||
        nextProps.disabled !== currentProps.disabled ||
        nextProps.readOnly !== currentProps.readOnly ||
        nextProps.options !== currentProps.options ||
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

const isNumber = (value) => !Number.isNaN(Number.parseFloat(value));

export default React.memo(GlobitsSelectInput);