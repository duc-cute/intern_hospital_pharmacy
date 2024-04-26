import React from "react";
import DashboardCard from "./components/DashboardCard";
import DashboardChartByIncome from "./components/DashboardChartByIncome";
import DashboardChartTopTen from "./components/DashboardChartTopTen";
import { getTodaySalesResult } from "./DashboardService";

function DashboardIndex() {
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    getTodaySalesResult().then(({data}) => {
      setData(data)
    })
  }, [])

  return (
    <>
      <section className="cards-container mt-8">
        <h5 className="cards-header">KẾT QUẢ BÁN HÀNG HÔM NAY</h5>
        <div className="cards-body flex gap-16">
          <DashboardCard 
            icon="monetization_on_rounded"
            title="Doanh thu"
            countTitle={`${data?.totalBill || 0} Hóa đơn`}
            displayQuantity={Number(data?.totalRevenue || 0).toLocaleString()}
            color="#0070F4"
          />
          <DashboardCard 
            icon="reply_outlined"
            title="Trả hàng"
            countTitle={`${data?.totalReturns || 0} phiếu`}
            displayQuantity={Number(data?.totalAmountReturns || 0).toLocaleString()}
            color="orange"
          />
          <DashboardCard 
            icon="trending_up"
            title="So với cùng kỳ tháng trước"
            countTitle=" "
            displayQuantity={`${data?.percent || 0}%`}
            color="green"
          />
        </div>
      </section>
      <DashboardChartByIncome />
      <DashboardChartTopTen />
    </>
  );
};
export default React.memo(DashboardIndex)