/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, memo } from "react";
import { pagingStoresToStore } from "../../Store/StoreService";
import GlobitsAutocomplete from "app/common/form/GlobitsAutocomplete";

function SelectFromStore({ editable, kind, toStoreId }) {
  const [stockFromOptions, setStockFromOptions] = useState([])

  useEffect(() => {
    if (editable) {
      const searchDto = {
        pageSize: 1000,
        pageIndex: 1,
        fromStoreId: toStoreId,
        kind
      };
      pagingStoresToStore(searchDto).then((response) => {
        setStockFromOptions(response.data.content)
      });
    }
  }, [kind, toStoreId])

  return (
    <GlobitsAutocomplete label="Kho xuất" name="fromStore" options={stockFromOptions} disabled={!editable} />
  );
};

export default memo(SelectFromStore);
