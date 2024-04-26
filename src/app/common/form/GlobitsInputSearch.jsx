import React, { memo } from 'react'
import IconSearch from '../Icon/IconSearch'
import { FastField, Field, getIn } from 'formik';

const GlobitsInputSearch = (props) => (
    <FastField  {...props} name={props.name} shouldUpdate={shouldComponentUpdate}>
        {({ field }) => <Component {...props} field={field} />}
    </FastField>
);

function Component({ name, label = 'Từ khóa', className = "", hideSubmitIcon, field }) {
    return (
        <div className={`input-container ${className}`}>
            <label>{label}</label>
            <div className='input-search-container'>
                <Field name={name} id={name} value={field?.value || ""} />
                {!hideSubmitIcon && (
                    <button type='submit'>
                        <IconSearch />
                    </button>
                )}
            </div>
        </div>
    )
}

const shouldComponentUpdate = (nextProps, currentProps) => {
    return (
        nextProps?.value !== currentProps?.value ||
        nextProps?.name !== currentProps?.name ||
        Object.assign(nextProps).length !== Object.assign(currentProps).length ||
        getIn(nextProps.formik.values, currentProps.name) !== getIn(currentProps.formik.values, currentProps.name) ||
        getIn(nextProps.formik.errors, currentProps.name) !== getIn(currentProps.formik.errors, currentProps.name) ||
        getIn(nextProps.formik.touched, currentProps.name) !== getIn(currentProps.formik.touched, currentProps.name)
    );
};


export default memo(GlobitsInputSearch);