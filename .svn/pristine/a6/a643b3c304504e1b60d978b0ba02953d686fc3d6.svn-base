/* eslint-disable react-hooks/exhaustive-deps */
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { useStore } from "app/stores";
import InventoryReportList from "./OriginReportList";
import OriginReportFilters from "./OriginReportFilters";

export default observer(function OriginReportIndex() {

  const {
    resetStore,
    loadOriginReport
  } = useStore().originReportStore;

  useEffect(() => {
    loadOriginReport();
    return () => resetStore();
  }, []);


  return (
    <section className="cards-container">
      <h4 className="cards-header">Báo cáo nhập xuất tồn</h4>
      <div className="cards-body">
        <OriginReportFilters />
        <InventoryReportList />
      </div>
    </section>
  );
});
