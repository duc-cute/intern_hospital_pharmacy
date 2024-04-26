import React from "react";
import { useStore } from "../../stores";
import GlobitsSearchInput from "../../common/GlobitsSearchInput";
import { observer } from "mobx-react";

export default observer(function ReligionFilters() {
  const { religionStore } = useStore();
  const { updatePageData } = religionStore;
  return (
    <>
      <GlobitsSearchInput search={updatePageData} />
    </>
  );
});
