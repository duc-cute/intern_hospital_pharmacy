import React from "react";
import {
    RadioGroup,
    Radio,
    FormControl,
    FormControlLabel,
    FormLabel,
    FormHelperText,
} from "@material-ui/core";
import { useField } from "formik";

const GlobitsRadioGroup = ({ name, label, options, column, ...otherProps }) => {
    const [field, meta] = useField(name);

    const configRadioGroup = {
        ...field,
        ...otherProps,
        row: column? column :true,
        // value: field.value,
    };
    // if (meta && meta.touched && meta.error) {
    //   configRadioGroup.error = true;
    //   configRadioGroup.helperText = meta.error;
    // }
    return (
        <FormControl
            component="fieldset"
            error={meta && meta.touched && meta.error}
        >
            <FormLabel component="legend">{label}</FormLabel>
            <RadioGroup aria-label={name} {...configRadioGroup}>
              {options.map((option) => {
                return (
                  <FormControlLabel value={option.value} label={option.name} control={<Radio />} />
                )
              })}
            </RadioGroup>
            <FormHelperText>{meta?.error}</FormHelperText>
        </FormControl>
    );
};

export default GlobitsRadioGroup;
