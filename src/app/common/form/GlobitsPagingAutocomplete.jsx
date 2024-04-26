import React, { useEffect, useState } from "react";
import { FastField, getIn } from "formik";
import { isEqual } from "lodash";
import clsx from "clsx";
import ErrorIcon from "../ErrorIcon/ErrorIcon";
import { RequiredLabel } from "../CommonFunctions";
import AutoWidthPopper from "../custom/AutoWidthPopper";
import { TextField } from "@material-ui/core";
import AutoComplete from "@material-ui/lab/Autocomplete";

const PAGE_SIZE = 20;

const defaultGetOptionSelected = (option, value) => (option?.id === value?.id)

const GlobitsPagingAutocompleteV3 = (props) => {
  return (
    <FastField
      {...props}
      name={props.name}
      shouldUpdate={shouldComponentUpdate}
    >
      {({ field, meta, form }) => {
        return (
          <MyPagingAutocompleteV3
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

function MyPagingAutocompleteV3(props) {
  const {
    name,
    api,
    displayData,
    // variant = "outlined",
    size = "small",
    searchObject,
    label,
    sortOptions,
    field,
    meta,
    setFieldValue,
    onChange,
    getOptionSelected,
    getOptionLabel,
    allowLoadOptions = true,
    sx,
    disableClearable,
    fullWidth = true,
    requiredLabel  = false,
    clearOptionOnClose = false,
    willShrink,
    multiple,
    disableCloseOnSelect,
    endAdornment,
    placeholder = "",
    InputProps,
    ...otherProps
  } = props;
  const [page, setPage] = useState(1);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [keyword, setKeyword] = useState("");
  const [totalPage, setTotalPage] = React.useState(1);
  const [open, setOpen] = React.useState(false);
  const [t, setT] = React.useState();
  const [typing, setTyping] = React.useState(false);

  useEffect(() => {
      if (!allowLoadOptions) {
          setOptions([])
      }
  }, [allowLoadOptions])

  useEffect(() => {
      if (loading && allowLoadOptions) {
          loadMoreResults();
      }
  }, [page, loading]);

  useEffect(() => {
      if (open && allowLoadOptions) {
          getData();
      }
  }, [keyword, open, searchObject]);

  const getData = () => {
      let newPage = 1;
      setPage(newPage);
      api && api({
          ...searchObject,
          pageIndex: newPage,
          pageSize: PAGE_SIZE,
          keyword: keyword || "",
      }).then(({ data }) => {
          if (data?.content?.length > 0) {
              setOptions(sortOptions ? sortOptions(data.content) : data.content);
              setTotalPage(data.totalPages);
          }
      });
  };

  const loadMoreResults = async () => {
      const nextPage = page + 1;

      setPage(nextPage);
      api && await api({
          ...searchObject,
          pageIndex: nextPage,
          pageSize: PAGE_SIZE,
          keyword: keyword || "",
      }).then(({ data }) => {
          if (data?.content?.length > 0) {
              setOptions(options => sortOptions ? 
                  sortOptions([...options, ...data.content]) : 
                  [...options, ...data.content]);
              setTotalPage(data.totalPages);
          }
      });
  };

  const handleScroll = (event) => {
      const listboxNode = event.currentTarget;

      const position = listboxNode.scrollTop + listboxNode.clientHeight;
      if ((listboxNode.scrollHeight - position <= 5) && page < totalPage) {
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
      setTyping(true);
      if (t) clearTimeout(t);
      // @ts-ignore
      setT(
          setTimeout(() => {
              setKeyword(value);
              setTyping(false);
          }, 300)
      );
  };

  const defaultHandleChange = (_, value) => {
      setFieldValue(name, value || null);
  };

  const defaultGetOptionLabel = (option) =>
  {
      if(option === null){
          return "---";
      }
      else return option?.[displayData || "name"] || "";
      
  }

  const value = otherProps?.value || field?.value || null

  const displayLabel = label ? <>{label}{requiredLabel && <RequiredLabel/>}</> : "";

  const isError = meta && meta.touched && meta.error;

  return (
    <>
      {!fullWidth && <label htmlFor={name}>{displayLabel}</label>}
      <AutoComplete
        {...field}
        {...otherProps}
        value={value ? value : (multiple ? [] : null) }                
        loading={loading}
        onOpen={onOpen}
        open={open}
        onClose={onClose}
        multiple={multiple}
        id={name}
        onChange={onChange || defaultHandleChange}
        size={size}
        getOptionSelected={getOptionSelected || defaultGetOptionSelected}
        getOptionLabel={getOptionLabel || defaultGetOptionLabel}
        options={options}
        autoHighlight
        openOnFocus
        disableClearable={disableClearable}
        PopperComponent={AutoWidthPopper}
        noOptionsText="Không có dữ liệu"
        fullWidth={fullWidth}
        disableCloseOnSelect={disableCloseOnSelect}
        onInputChange={(event) => handleChangeText(event?.target?.value)}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              placeholder={placeholder}
              label={fullWidth ? displayLabel : null}
              className={clsx(otherProps?.className, params?.className, "input-container")}
              // variant={variant}
              fullWidth={fullWidth}
              error={isError}
              helperText={(fullWidth && isError) && meta.error}
              InputProps={{
                ...params.InputProps,
                ...InputProps,
                endAdornment: (
                  <>
                    {params.InputProps.endAdornment}
                    {endAdornment}
                  </>
                ),
              }}
            />
          )
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.stopPropagation();
            event.preventDefault();
          }
          return true;
        }}
        ListboxProps={{
          onScroll: handleScroll,
        }}
      />
      {isError && !fullWidth && <ErrorIcon helperText={meta.error} />}
    </>
  );
}

const shouldComponentUpdate = (nextProps, currentProps) => {
  return (
    nextProps.name !== currentProps.name ||
    nextProps.value !== currentProps.value ||
    nextProps.onChange !== currentProps.onChange ||
    nextProps.label !== currentProps.label ||
    nextProps.required !== currentProps.required ||
    nextProps.disabled !== currentProps.disabled ||
    nextProps.readOnly !== currentProps.readOnly ||
    nextProps.api !== currentProps.api ||
    !isEqual(nextProps.searchObject, currentProps.searchObject) ||
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

export default React.memo(GlobitsPagingAutocompleteV3);
