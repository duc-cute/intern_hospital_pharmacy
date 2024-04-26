/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import { FastField, getIn } from "formik";
import { isEqual } from "lodash";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useMemo } from "react";
import RequiredLabel from "./RequiredLabel";
import { forwardRef } from "react";
import ErrorIcon from "../ErrorIcon/ErrorIcon";

const PAGE_SIZE = 20;
let loading = false;

const PagingAutoComplete = (props, ref) => (
  <FastField {...props} name={props.name} shouldUpdate={shouldComponentUpdate}>
    {({ field, meta, form }) => (
      <Component  {...props} field={field} meta={meta} setFieldValue={form.setFieldValue} ref={ref} />
    )}
  </FastField>
);

const Component = forwardRef((props, ref) => {
  const {
    disabled,
    size = "small",
    fullWidth = true,
    readOnly,
    name,
    className = "",
    getOptionLabel,
    displayLabel = 'name',
    getOptionSelected,
    displaySelected = 'id',
    getOptionDisabled,
    noOptionsText = "Không có dữ liệu",
    includeNullOp,
    onChange,
    value,
    api,
    searchObject,
    clearOptionOnClose,
    allowLoadOptions = true,
    field,
    meta,
    setFieldValue,
    label,
    sortOptions,
    displayData,
    sx,
    required,
    requiredLabel,
    disableTyping = false,
    disableClearable = false,
    multiple,
    fillerOptions,
    placeholder = "",
    handleResponseApi,
    handleValuesResponse,
    ...otherProps
  } = props;

  const [page, setPage] = useState(1);
  const [options, setOptions] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [totalPage, setTotalPage] = React.useState(1);
  const [open, setOpen] = React.useState(false);
  const [t, setT] = React.useState();

  useEffect(() => {
    if (!allowLoadOptions) {
      setOptions([])
    }
  }, [allowLoadOptions]);

  useEffect(() => {
    if (open && allowLoadOptions) {
      getData();
    }
  }, [keyword, open, searchObject]);

  const loadData = async (obj, first) => {
    if (!api) {
      return;
    }

    try {
      loading = true;
      const { data } = await api({ ...searchObject, ...obj, pageSize: PAGE_SIZE, keyword: keyword || "", });
      if (data?.content?.length > 0) {
        let newOptions = [...(!first ? options : []), ...data.content];
        if (sortOptions) {
          newOptions = sortOptions(newOptions);
        }

        if (fillerOptions) {
          newOptions = newOptions.filter(fillerOptions);
        }

        if (handleValuesResponse) {
          handleValuesResponse(newOptions)
        }

        setOptions(newOptions);
        setTotalPage(data.totalPages);
      }
    } catch (error) {
      console.error(error)
    } finally {
      loading = false;
    }
  }

  const getData = () => {
    let newPage = 1;
    setPage(newPage);
    loadData({ pageIndex: newPage }, true)
  };

  const loadMoreResults = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadData({ pageIndex: nextPage })
  };

  const handleScroll = (event) => {
    if (loading) {
      return;
    }
    const listboxNode = event.currentTarget;

    const position = listboxNode.scrollTop + listboxNode.clientHeight;
    if (listboxNode.scrollHeight - position <= 2 && page < totalPage) {
      loadMoreResults();
    }
  };

  const onOpen = () => {
    setKeyword("");
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    if (clearOptionOnClose) {
      setOptions([]);
      setTotalPage(1);
    }
  };

  const handleChangeText = (value) => {
    if (t) {
      clearTimeout(t);
    }

    setT(setTimeout(() => setKeyword(value), 500));
  };

  const disLabel = label ? <RequiredLabel label={label} requiredLabel={requiredLabel || required} /> : "";
  const isError = meta && meta.touched && meta.error;

  const getOptionLabelDefault = useMemo(() => getOptionLabel ? getOptionLabel : (option) => {
    if (option === null) {
      return "---";
    }
    return getIn(option, displayLabel)
  }, [getOptionLabel]);

  const getOptionSelectedDefault = useMemo(() => (
    getOptionSelected ? getOptionSelected : (option, value) => {
      if (!value) {
        return false;
      }
      return getIn(option, displaySelected) === getIn(value, displaySelected);
    }
  ), [getOptionSelected]);

  const handleChange = onChange ? onChange : (_, value) => {
    setFieldValue(name, value ? value : null);
  }

  return (
    <>
      {(!fullWidth && disLabel) &&
        <label htmlFor={name}>
          {disLabel}
        </label>
      }
      <Autocomplete
        {...field}
        {...otherProps}
        id={name}
        name={name}
        disabled={disabled || readOnly}
        fullWidth={fullWidth}
        multiple={multiple}
        size={size}
        value={value || (field?.value ?? (multiple ? [] : null))}
        onChange={handleChange}
        options={useMemo(() => includeNullOp ? [null, ...options] : options, [includeNullOp, options])}
        getOptionLabel={getOptionLabelDefault}
        getOptionSelected={getOptionSelectedDefault}
        getOptionDisabled={getOptionDisabled}
        noOptionsText={noOptionsText}
        onOpen={onOpen}
        open={open}
        onClose={onClose}
        autoHighlight
        openOnFocus
        disableClearable={disableClearable}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.stopPropagation();
            event.preventDefault();
          }
          return true;
        }}
        onInputChange={(event) => handleChangeText(event?.target?.value)}
        renderInput={(params) => (
          <TextField
            {...params}
            ref={ref}
            placeholder={placeholder}
            label={(fullWidth && disLabel) ? disLabel : null}
            inputProps={{
              ...params.inputProps,
              autoComplete: "off", // disable autocomplete and autofill
              readOnly: readOnly || disableTyping,
            }}
            InputLabelProps={{
              htmlFor: name,
            }}
            InputProps={{
              ...params?.InputProps,
              ...otherProps?.InputProps,
            }}
            error={isError}
            helperText={(fullWidth && isError) ? meta.error : ""}
            className={`input-container ${className}`}
          />
        )}
        ListboxProps={{
          onScroll: handleScroll,
        }}
      />
      {(isError && !fullWidth) && <ErrorIcon helperText={meta.error} />}
    </>
  );
})

const shouldComponentUpdate = (nextProps, currentProps) => (
  nextProps.name !== currentProps.name ||
  nextProps.value !== currentProps.value ||
  nextProps.handleChange !== currentProps.handleChange ||
  nextProps.label !== currentProps.label ||
  nextProps.required !== currentProps.required ||
  nextProps.api !== currentProps.api ||
  nextProps.disabled !== currentProps.disabled ||
  nextProps.readOnly !== currentProps.readOnly ||
  nextProps.placeholder !== currentProps.placeholder ||
  !isEqual(nextProps.searchObject, currentProps.searchObject) ||
  nextProps.formik.isSubmitting !== currentProps.formik.isSubmitting ||
  Object.keys(nextProps).length !== Object.keys(currentProps).length ||
  getIn(nextProps.formik.values, currentProps.name) !== getIn(currentProps.formik.values, currentProps.name) ||
  getIn(nextProps.formik.errors, currentProps.name) !== getIn(currentProps.formik.errors, currentProps.name) ||
  getIn(nextProps.formik.touched, currentProps.name) !== getIn(currentProps.formik.touched, currentProps.name)
);

export default React.memo(forwardRef(PagingAutoComplete));