import React, { memo, useEffect, useMemo, useState } from "react";
import { MenuItem, Select } from "@material-ui/core";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import { INCOME_VIEW_BY } from "app/common/Constant/LocalConstantList";
import { TypeStatusTime } from "app/common/Constant/LocalConstant";
import { getChart2Dashboard } from "../DashboardService";
import { DashboardData } from "app/common/Model/DashboardData";

Highcharts.setOptions({
  lang: {
    numericSymbols: ["k", "tr", "B", "T", "P", "E"]
  }
});

const TypeTime = {
  ACCORDING_TO_NET_REVENUE: '1',
  ACCORDING_TO_QUANTITY: '2',
}

export const TOP_TEN_VIEW_BY = [
  { value: TypeTime.ACCORDING_TO_NET_REVENUE, name: "Theo doanh thu thuần" },
  { value: TypeTime.ACCORDING_TO_QUANTITY, name: "Theo số lượng" },
];

const getCategories = (dataChart) => (dataChart || []).map(item => item?.productName);

const ChartTopTen = ({ dataChart, viewBy }) => {

  const data = useMemo(() => ({
    listData: dataChart?.map(item => (viewBy === TypeTime.ACCORDING_TO_NET_REVENUE ? item?.netRevenue : item?.quantity) || 0),
    categories: getCategories(dataChart),
  }), [dataChart, viewBy])

  const options = {
    chart: {
      type: "bar",
      style: {
        fontFamily: 'Roboto'
      }
    },
    title: {
      text: null,
      align: "left",
    },
    xAxis: {
      categories: data.categories,
      title: {
        text: null,
      },
      labels: {
        style: {
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          width: "200px",
        }
      }
    },
    yAxis: {
      min: 0,
      gridLineWidth: 1,
      lineWidth: 5,
      title: {
        text: null,
      },
    },
    tooltip: {
      formatter: function (tooltip) {
        return this.y.toLocaleString() + " - " + this.x
      },
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        color: "#0070F4",
        data: data.listData,
      },
    ],
  };
  return (
    <div className="cards-body">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

function DashboardChartTopTen() {
  const [dataChart, setDataChart] = useState([]);
  const [search, setSearch] = useState({ type: TypeTime.ACCORDING_TO_NET_REVENUE, typeStatusTime: TypeStatusTime.THIS_MONTH });

  useEffect(() => {
    getDataChart(search)
  }, [search])

  const getDataChart = async (obj) => {
    try {
      const res = await getChart2Dashboard({ type: Number(obj.type), typeStatusTime: Number(obj.typeStatusTime) });
      setDataChart(res.data)
    } catch (error) {
      console.log(error)
      setDataChart(new DashboardData())
    }
  }

  return (
    <section className="cards-container mt-16">
      <h5 className="cards-header flex flex-middle">
        TOP 10 HÀNG HÓA BÁN CHẠY{" "}

        {INCOME_VIEW_BY.find((f) => f.value === search.type)?.name}
        <div className="ml-16" style={{ flex: 1 }}>
          <Select
            value={search.type}
            onChange={(e) => setSearch({ ...search, type: e.target.value })}
            style={{ color: "#0070F4", fontWeight: 700 }}
          >
            {TOP_TEN_VIEW_BY.map((item) => {
              return (
                <MenuItem key={item.value} value={item.value}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        </div>
        <div>

          <Select
            value={search.typeStatusTime}
            onChange={(e) => setSearch({ ...search, typeStatusTime: e.target.value })}
            style={{ color: "#0070F4", fontWeight: 700 }}
          >
            {INCOME_VIEW_BY.map((item) => {
              return (
                <MenuItem key={item.value} value={item.value}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        </div>
      </h5>

      <ChartTopTen viewBy={search.type} type={search.typeStatusTime} dataChart={dataChart} />
    </section>
  );
}
export default memo(DashboardChartTopTen);

// import React from "react";
// import { memo } from "react";
// import { MenuItem, Select } from "@material-ui/core";
// import HighchartsReact from "highcharts-react-official";
// import Highcharts from "highcharts/highstock";
// import { INCOME_VIEW_BY } from "app/common/Constant/LocalConstantList";
// Highcharts.setOptions({
//   lang: {
//     numericSymbols: ["k", "tr", "B", "T", "P", "E"]
//   }
// });

// export const TOP_TEN_VIEW_BY = [
//   { value: "1", name: "Theo doanh thu thuần" },
//   { value: "2", name: "Theo số lượng" },
// ];

// const CATEGORIES = [
//   "Zebacef 125mg/5ml (Hộp 1 lọ 100ml)", 
//   "Bilclamos 312,5mg (Hộp 1 chai 100ml)", 
//   "Ferricure 100mg/5ml (Hộp 1 lọ 60ml)", 
//   "Brusonex (Hộp 1 lọ 140 liều xịt)"
// ]

// const getCategories = (viewBy) => {
//   if (viewBy === INCOME_VIEW_BY[0].value) { //hôm nay
//     return [CATEGORIES[0]]
//   } else if (viewBy === INCOME_VIEW_BY[1].value) { //hôm qua
//     return [CATEGORIES[0]]
//   } else if (viewBy === INCOME_VIEW_BY[2].value) { //7 ngày qua
//     return [CATEGORIES[0], CATEGORIES[1]]
//   } else if (viewBy === INCOME_VIEW_BY[3].value) { //tháng này
//     return CATEGORIES
//   } else if (viewBy === INCOME_VIEW_BY[4].value) { // tháng trước
//     return CATEGORIES
//   }
//   return []
// }

// const DATA = [25610000, 12760000, 10070000, 7460000];

// const getDataSeries = (viewBy, type) => {
//   if (type === TOP_TEN_VIEW_BY[0].value) {
//     if (viewBy === INCOME_VIEW_BY[0].value) { //hôm nay
//       return [1210000]
//     } else if (viewBy === INCOME_VIEW_BY[1].value) { //hôm qua
//       return [902000]
//     } else if (viewBy === INCOME_VIEW_BY[2].value) { //7 ngày qua
//       return [7023000, 3102000]
//     } else if (viewBy === INCOME_VIEW_BY[3].value) { //tháng này
//       return DATA;
//     } else if (viewBy === INCOME_VIEW_BY[4].value) { // tháng trước
//       return [13124000, 9871000, 6019000, 2460000]
//     }
//   } else if (type === TOP_TEN_VIEW_BY[1].value) {
//     if (viewBy === INCOME_VIEW_BY[0].value) { //hôm nay
//       return [9]
//     } else if (viewBy === INCOME_VIEW_BY[1].value) { //hôm qua
//       return [7]
//     } else if (viewBy === INCOME_VIEW_BY[2].value) { //7 ngày qua
//       return [43, 21]
//     } else if (viewBy === INCOME_VIEW_BY[3].value) { //tháng này
//       return [130, 79, 70, 50]
//     } else if (viewBy === INCOME_VIEW_BY[4].value) { // tháng trước
//       return [65, 60, 48, 22]
//     }
//   }
//   return []
// }
// const ChartTopTen = ({ viewBy, type }) => {
//   const chartRef = React.useRef(null);

//   const options = {
//     chart: {
//       type: "bar",
//       style: {
//         fontFamily: 'Roboto'
//       }
//     },
//     title: {
//       text:null,
//       align: "left",
//     },
//     xAxis: {
//       categories: getCategories(viewBy),
//       title: {
//         text: null,
//       },
//       labels: {
//         style: {
//           whiteSpace: 'nowrap',
//           textOverflow: 'ellipsis',
//           width: "200px",
//         }
//       }
//     },
//     yAxis: {
//       min: 0,
//       gridLineWidth: 1,
//       lineWidth: 5,
//       title: {
//         text: null,
//       },
//     },
//     tooltip: {
//       formatter: function (tooltip) {
//         return this.y.toLocaleString() + " - " + this.x
//       },
//       shared: true,
//     },
//     plotOptions: {
//       series: {
//         color: "#0070F4"
//       }
//     },
//     legend: {
//       enabled: false,
//     },
//     credits: {
//       enabled: false,
//     },
//     series: [
//       {
//         name: " ",
//         data: getDataSeries(viewBy, type),
//       },
//     ],
//   };
//   return (
//     <HighchartsReact highcharts={Highcharts} options={options} ref={chartRef} />
//   );
// };

// function DashboardChartTopTenjsx() {
//   const [type, setType] = React.useState("1"); // mặc định theo doanh thu thuần
//   const handleChangeType = (e) => {
//     setType(e.target.value);
//   };
//   const [viewBy, setViewBy] = React.useState("4"); // mặc định tháng này
//   const handleChange = (e) => {
//     setViewBy(e.target.value);
//   };

//   return (
//     <section className="cards-container mt-16">
//       <h5 className="cards-header flex flex-middle">
//         TOP 10 HÀNG HÓA BÁN CHẠY{" "}
//         {INCOME_VIEW_BY.find((f) => f.value === viewBy)?.name}
//         <div className="ml-16" style={{ flex: 1 }}>
//           <Select 
//             value={type} 
//             onChange={handleChangeType}
//             style={{color: "#0070F4", fontWeight: 700}}
//           >
//             {TOP_TEN_VIEW_BY.map((item) => {
//               return (
//                 <MenuItem key={item.value} value={item.value}>
//                   {item.name}
//                 </MenuItem>
//               );
//             })}
//           </Select>
//         </div>
//         <div>
//           <Select 
//             value={viewBy} 
//             onChange={handleChange}
//             style={{color: "#0070F4", fontWeight: 700}}
//           >
//             {INCOME_VIEW_BY.map((item) => {
//               return (
//                 <MenuItem key={item.value} value={item.value}>
//                   {item.name}
//                 </MenuItem>
//               );
//             })}
//           </Select>
//         </div>
//       </h5>
//       <div className="cards-body">
//         <ChartTopTen viewBy={viewBy} type={type} />
//       </div>
//     </section>
//   );
// }
// export default memo(DashboardChartTopTenjsx);
