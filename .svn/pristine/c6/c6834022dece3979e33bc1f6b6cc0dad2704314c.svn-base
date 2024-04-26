import React from "react";
import { useStore } from "../../stores";
import GlobitsSearchInput from "../../common/GlobitsSearchInput";
import { observer } from "mobx-react";

export default observer(function EthnicsFilters() {
  const { administrativeStore } = useStore();
  const { updatePageData } = administrativeStore;
  return (
    <>
      <GlobitsSearchInput search={updatePageData} />
    </>
  );
});
