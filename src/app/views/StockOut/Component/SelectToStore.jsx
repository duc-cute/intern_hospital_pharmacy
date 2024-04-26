/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { pagingStoresToStore } from "../../Store/StoreService";
import GlobitsAutocomplete from "app/common/form/GlobitsAutocomplete";

export default function SelectToStore({ editable, kind, fromStoreId }) {
  const { t } = useTranslation();
  const [stockInOptions, setStockInOptions] = useState([]);

  // const handleChangeFromStore = (values, valueFromStore) => {
  //   const searchDto = {
  //     pageSize: 1000,
  //     pageIndex: 1,
  //     fromStoreId: valueFromStore ? valueFromStore?.id : null,
  //     kind: values?.kind,
  //   };
  //   if (values?.kind !== -2 && valueFromStore) {
  //     pagingStoresToStore(searchDto).then((response) => {
  //       setStockInOptions(response?.data?.content);
  //     });
  //   }
  // };

  useEffect(() => {
    const searchDto = {
      pageSize: 1000,
      pageIndex: 1,
      fromStoreId,
      kind,
    };
    pagingStoresToStore(searchDto).then((response) => {
      setStockInOptions(response?.data?.content);
    });
  }, [kind, fromStoreId])


  return (
    <GlobitsAutocomplete
      variant="standard"
      label={t("Kho nhập")}
      name="toStore"
      options={stockInOptions}
      disabled={!editable}
    />
  );
};
