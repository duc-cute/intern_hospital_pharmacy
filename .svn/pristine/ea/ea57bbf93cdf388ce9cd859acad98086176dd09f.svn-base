/* eslint-disable react-hooks/exhaustive-deps */
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { useStore } from "app/stores";
import SalesReportList from "./SalesReportList";
import SalesReportFilters from "./SalesReportFilters";

export default observer(function SalesReportIndex() {

  const {
    resetStore,
    loadSalesReport
  } = useStore().salesReportStore;

  useEffect(() => {
    loadSalesReport();
    return () => resetStore();
  }, []);


  return (
    <section className="cards-container">
      <h4 className="cards-header">Báo cáo bán hàng</h4>
      <div className="cards-body">
        <SalesReportFilters />
        <SalesReportList />
      </div>
    </section>
  );
});
