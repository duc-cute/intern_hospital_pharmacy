import React from "react";
import { useStore } from "../../stores";
import GlobitsSearchInput from "../../common/GlobitsSearchInput";
import { observer } from "mobx-react";

export default observer(function EthnicsFilters() {
  const { sourceStore } = useStore();
  const { updatePageData } = sourceStore;
  return (
    <>
      <GlobitsSearchInput search={updatePageData} />
    </>
  );
});
