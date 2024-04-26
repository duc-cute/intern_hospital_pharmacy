import React from "react";
import { useTranslation } from "react-i18next";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { Checkbox } from "@material-ui/core";
import { useFormikContext } from "formik";
import LocalConstants from "app/LocalConstants";
import GlobitsAutocomplete from "app/common/form/GlobitsAutocomplete";

const options = [{ name: "Chọn tất cả", id: "select-all" }, ...LocalConstants.STORE_LEVEL];

export default function SelectSourceLevels() {
  const { t } = useTranslation();
  const { values, setFieldValue } = useFormikContext();

  const allSelected = options?.length - 1 === values?.levels?.length;

  const handleChange = (_, selected) => {
    let newValue = values?.levels || [];

    if (selected?.id === "select-all") {
      if (allSelected) {
        newValue = []
      } else {
        newValue = options.filter((item) => item?.id === undefined).map((item) => ({level: item.value, source: null}))
      }
    } else {
      const selectedIndex = newValue.findIndex(e => e?.level === selected.value);
      let newSelected = [];
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(newValue, {level: selected.value, source: null});
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(newValue.slice(1));
      } else if (selectedIndex === newValue.length - 1) {
        newSelected = newSelected.concat(newValue.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(newValue.slice(0, selectedIndex), newValue.slice(selectedIndex + 1),);
      }
      newValue = newSelected
    }
    setFieldValue('levels', newValue)
  };

  const getOptionLabel = (option) => option?.name || "";

  const optionRenderer = (item) => {
    const selected = item.id === "select-all" ? allSelected : values?.levels?.some(e => e?.level === item?.value);
    return (
      <>
        <Checkbox
          color="primary"
          icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
          checkedIcon={<CheckBoxIcon fontSize="small" />}
          className="mr-8 p-0"
          checked={selected}
        />
        {getOptionLabel(item)}
      </>
    );
  };
  return (
    <GlobitsAutocomplete
      name="levels"
      options={options}
      // multiple
      label={t("store.level")}
      variant="standard"
      requiredLabel
      value={values?.levels || []}
      getOptionSelected={(option, value) => {
        return option?.value === value?.level
      }}
      disableCloseOnSelect
      disableClearable
      renderOption={optionRenderer}
      handleChange={handleChange}
      inputProps={{
        value: values.levels?.length > 0 ? `${values.levels?.length} Lựa chọn` : ''
      }}
    />
  );
};
