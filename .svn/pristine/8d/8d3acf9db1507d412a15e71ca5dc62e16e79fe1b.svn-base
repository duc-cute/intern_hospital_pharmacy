/* eslint-disable react-hooks/exhaustive-deps */
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { useStore } from "app/stores";
import EndOfDayReportList from "./EndOfDayReportList";
import EndOfDayReportFilters from "./EndOfDayReportFilters";

export default observer(function EndOfDayReportIndex() {

  const {
    resetStore,
    loadEndOfDayReport
  } = useStore().endOfDayReportStore;

  useEffect(() => {
    loadEndOfDayReport();
    return () => resetStore();
  }, []);


  return (
    <section className="cards-container">
      <h4 className="cards-header">Báo cáo cuối ngày</h4>
      <div className="cards-body">
        <EndOfDayReportFilters />
        <EndOfDayReportList />
      </div>
    </section>
  );
});
