import { FastField, Field, getIn } from 'formik';
import React from 'react';
import { forwardRef } from 'react';
import { memo } from 'react';

const GlobitsRadioButton = ({ value = true, ...props }, ref) => (
  <FastField {...props} value={value} name={props.name} shouldUpdate={shouldComponentUpdate}>
    {({ field, form }) => (
      <Component value={value} {...props} field={field} setFieldValue={form.setFieldValue} ref={ref} />
    )}
  </FastField>
)

const Component = forwardRef((props, ref) => {
  const {
    label,
    name,
    type = 'checkbox',
    style,
    className = '',
    value,
    isNoneValue,
    field,
    disabled = false,
    setFieldValue,
    onChange,
    postOnChangeIntervene,
    checked,
    ...otherProps
  } = props;

  const handleChange = onChange ? onChange : ({ target }) => {
    let newValue = value;

    if ((isNoneValue || typeof value !== "boolean" || value !== true) && !target.checked) {
      newValue = null;
    } else if (type === 'checkbox' && typeof value === 'boolean' && !target.checked) {
      newValue = target.checked;
    }

    if (postOnChangeIntervene) {
      postOnChangeIntervene();
    }

    setFieldValue(name, newValue);
  };

  function onClick(e) {
    if (field?.checked) {
      e.target.checked = !field.checked
      onChange(e);
    }
  };

  return (
    <label className={`${className} input-checkbox`} style={style}>
      <Field
        innerRef={ref}
        {...otherProps}disabled={disabled}
        checked={checked || (type === 'radio' ? field?.checked : field.value === value)}
        type={type}
        value={value}
        onChange={!disabled ? handleChange : undefined}
        onClick={(type === 'radio' && isNoneValue && !disabled) ? onClick : undefined}
      />
      {label}
    </label>
  );
})

const shouldComponentUpdate = (nextProps, currentProps) => (
  nextProps?.options !== currentProps?.options ||
  nextProps?.value !== currentProps?.value ||
  nextProps?.onChange !== currentProps?.onChange ||
  nextProps?.disabled !== currentProps?.disabled ||
  Object.assign(nextProps).length !== Object.assign(currentProps).length ||
  getIn(nextProps.formik.values, currentProps.name) !== getIn(currentProps.formik.values, currentProps.name) ||
  getIn(nextProps.formik.errors, currentProps.name) !== getIn(currentProps.formik.errors, currentProps.name) ||
  getIn(nextProps.formik.touched, currentProps.name) !== getIn(currentProps.formik.touched, currentProps.name)
);

export default memo(forwardRef(GlobitsRadioButton));