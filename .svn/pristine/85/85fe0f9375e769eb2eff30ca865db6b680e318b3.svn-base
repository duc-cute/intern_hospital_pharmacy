/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { memo } from "react";
import ArrowForwardOutlinedIcon from "@material-ui/icons/ArrowForwardOutlined";
import { MenuItem, Select, Tab, Tabs } from "@material-ui/core";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import { INCOME_VIEW_BY } from "app/common/Constant/LocalConstantList";
import { getChart1Dashboard } from "../DashboardService";
import { DashboardData } from "app/common/Model/DashboardData";
import { TypeStatusTime, TypeTime } from "app/common/Constant/LocalConstant";
import { formatMoney } from "app/common/Constant/LocalFunction";

Highcharts.setOptions({
  lang: {
    numericSymbols: ["k", "tr", "B", "T", "P", "E"]
  }
});

const a11yProps = (index) => ({
  id: `full-width-tab-${index}`,
  value: index,
  className: "p-0",
  style: {
    minWidth: 100,
  },
})

const getCategories = (viewBy, dataChart) => {
  if (viewBy === TypeTime.BY_DATE) {
    return dataChart?.map(item => (`${item.day}/${item?.month}`))
  }

  if (viewBy === TypeTime.BY_HOURS) {
    return dataChart?.map(item => `${item.timeHour || "00"}h (${item.day}/${item?.month})`)
  }

  if (viewBy === TypeTime.BY_WEEKS) {
    return dataChart?.map(item => `${item.timeWeek} (${item.day}/${item?.month})`)
  }

  return [];
}

const ChartByIncome = ({ index }) => {
  const { search, dataChart } = useContext(CONTEXT);

  const data = useMemo(() => ({
    revenue: dataChart?.map(item => item.revenue || 0),
    refund: dataChart?.map(item => item?.refund || 0),
    categories: getCategories(search.typeTime, dataChart),
  }),[dataChart])

  return (
    <div role="tabpanel" hidden={search.typeTime !== index} id={`full-width-tabpanel-${index}`}>
      {search.typeTime === index && (
        <HighchartsReact
          highcharts={Highcharts}
          options={{
            chart: {
              type: "column",
            },
            title: {
              text: null,
            },
            xAxis: {
              categories: data.categories
            },
            yAxis: {
              title: {
                text: null,
              },
            },
            credits: {
              enabled: false,
            },
            legend: { enabled: false },
            tooltip: {
              formatter: function (tooltip) {
                return this.y.toLocaleString()
              },
            },
            series: [
              {
                color: "#0070F4",
                data: data.revenue,
              },
              {
                data:  data.refund,
                color: "#FF033E"
              },
            ],
          }}
        />
      )}
    </div>
  )
};

const TabChart = () => {
  const { search, setSearch } = useContext(CONTEXT)

  return (
    <div className="cards-body">
      <Tabs
        className="mb-8"
        indicatorColor="primary"
        value={search.typeTime}
        onChange={(_, newValue) => setSearch({ ...search, typeTime: newValue })}
      >
        <Tab label="Theo ngày" {...a11yProps(TypeTime.BY_DATE)} />
        <Tab label="Theo giờ" {...a11yProps(TypeTime.BY_HOURS)} />
        <Tab label="Theo thứ" {...a11yProps(TypeTime.BY_WEEKS)} />
      </Tabs>

      <ChartByIncome index={TypeTime.BY_DATE} />
      <ChartByIncome index={TypeTime.BY_HOURS} />
      <ChartByIncome index={TypeTime.BY_WEEKS} />
    </div>
  );
};

const CONTEXT = createContext({
  dataChart: null,
  search: null,
  setSearch: null
});

function DashboardChartByIncome() {
  const [dataChart, setDataChart] = useState([]);
  const [search, setSearch] = useState({ typeTime: TypeTime.BY_DATE, typeStatusTime: TypeStatusTime.THIS_MONTH });

  useEffect(() => {
    getDataChart(search)
  }, [search])

  const getDataChart = async (obj) => {
    try {
      const res = await getChart1Dashboard({ ...obj, typeStatusTime: Number(obj.typeStatusTime) });
      setDataChart(res.data)
    } catch (error) {
      console.log(error)
      setDataChart(new DashboardData())
    }
  }

  const totalIncomes = useMemo(() => dataChart.reduce((result,item) =>  {
    result += (item?.revenue || 0)
    result -= (item?.refund || 0)

    return result
  },0), [dataChart])

  return (
    <section className="cards-container mt-16">
      <h5 className="cards-header flex flex-middle">
        DOANH THU THUẦN {INCOME_VIEW_BY.find((f) => f.value === search.typeStatusTime)?.name}
        <ArrowForwardOutlinedIcon className="ml-12 mr-4" />

        <span style={{ color: "#0070F4", flex: 1 }}>
          {formatMoney(totalIncomes,"")}
        </span>

        <div className="ml-32">
          <Select
            value={search.typeStatusTime}
            onChange={(e) => setSearch({ ...search, typeStatusTime: e.target.value })}
            style={{ color: "#0070F4", fontWeight: 700 }}
          >
            {INCOME_VIEW_BY.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </div>
      </h5>

      <CONTEXT.Provider value={{ dataChart: dataChart, search: search, setSearch }}>
        <TabChart />
      </CONTEXT.Provider>
    </section>
  );
}
export default memo(DashboardChartByIncome);

// import React from "react";
// import { memo } from "react";
// import ArrowForwardOutlinedIcon from "@material-ui/icons/ArrowForwardOutlined";
// import { MenuItem, Select, Tab, Tabs, useTheme } from "@material-ui/core";
// import HighchartsReact from "highcharts-react-official";
// import Highcharts from "highcharts/highstock";
// import moment from "moment";
// Highcharts.setOptions({
//   lang: {
//     numericSymbols: ["k", "tr", "B", "T", "P", "E"]
//   }
// });

// export const INCOME_VIEW_BY = [
//   { value: "1", name: "Hôm nay" },
//   { value: "2", name: "Hôm qua" },
//   { value: "3", name: "7 ngày qua" },
//   { value: "4", name: "Tháng này" },
//   { value: "5", name: "Tháng trước" },
// ];

// function a11yProps(index) {
//   return {
//     id: `full-width-tab-${index}`,
//     "aria-controls": `full-width-tabpanel-${index}`,
//     className: "p-0",
//     style: {
//       minWidth: 100,
//     },
//   };
// }

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`full-width-tabpanel-${index}`}
//       aria-labelledby={`full-width-tab-${index}`}
//       {...other}
//     >
//       {value === index && children}
//     </div>
//   );
// }

// const TabChart = ({ viewBy }) => {
//   const [value, setValue] = React.useState(0);
//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };
//   const theme = useTheme();

//   return (
//     <>
//       <Tabs
//         value={value}
//         indicatorColor="primary"
//         onChange={handleChange}
//       >
//         <Tab label="Theo ngày" {...a11yProps(0)} />
//         <Tab label="Theo giờ" {...a11yProps(1)} />
//         <Tab label="Theo thứ" {...a11yProps(2)} />
//       </Tabs>
//       <TabPanel value={value} index={0} dir={theme.direction}>
//         <ChartByIncome viewBy={viewBy} tabValue={value} />
//       </TabPanel>
//       <TabPanel value={value} index={1} dir={theme.direction}>
//         <ChartByIncome viewBy={viewBy} tabValue={value} />
//       </TabPanel>
//       <TabPanel value={value} index={2} dir={theme.direction}>
//         <ChartByIncome viewBy={viewBy} tabValue={value} />
//       </TabPanel>
//     </>
//   );
// };

// const getDatesOfMonthTo = (date) => {
//   const y = date.getFullYear(), m = date.getMonth();
//   let firstDay = new Date(y, m, 1);
//   let arr = []
//   while (moment(firstDay).isSameOrBefore(moment(date))) {
//     arr.push(firstDay.getDate())
//     firstDay = new Date(y, m, firstDay.getDate() + 1)
//   }
//   return arr;
// }

// const getDatesOfCurrentMonth = () => {
//   return getDatesOfMonthTo(new Date());
// }

// export const SERIES_DATA_LAST_MONTH = [8076000,14967000,15867000,8683000,15868000,5384000,11380000,10481000,6579000,14072000,
// 11375000,1497000, 9278000,1197000,15566000,13769000,2694000,10779000,13773000,9276000,4487000,9279000,13177000,15568000,
// 9282000,12827000,11678000,16167000,10173000,5387000,14071000];

// const daysOfWeek = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

// const getCategories = (viewBy, tabValue) => {
//   if (viewBy === INCOME_VIEW_BY[0].value) { //hôm nay
//     if (tabValue === 0) { // theo ngày
//       return [new Date().getDate()];
//     } else if (tabValue === 1) { // theo giờ
//       return ["15:00"]
//     } else if (tabValue === 2) { // theo thứ
//       if (daysOfWeek[new Date().getDay() - 1]) {
//         return [daysOfWeek[new Date().getDay() - 1]]
//       } else {
//         return ["CN"]
//       }
//     }
//   } else if (viewBy === INCOME_VIEW_BY[1].value) { //hôm qua
//     const date = new Date(), y = date.getFullYear(), m = date.getMonth();
//     const yesterday = new Date(y, m, date.getDate() - 1);
//     if (tabValue === 0) { // theo ngày
//       return [yesterday.getDate()];
//     } else if (tabValue === 1) { // theo giờ
//       return ["15:00"]
//     } else if (tabValue === 2) { // theo thứ
//       if (daysOfWeek[new Date().getDay() - 2]) {
//         return [daysOfWeek[new Date().getDay() - 2]]
//       } else {
//         return ["CN"]
//       }
//     }
//   } else if (viewBy === INCOME_VIEW_BY[2].value) { //7 ngày qua
//     if (tabValue === 0) { // theo ngày
//       let i = 6;
//       const arr = [];
//       const date = new Date(), y = date.getFullYear(), m = date.getMonth();
//       while (i > 0) {
//         arr.push(new Date(y, m, date.getDate() - i).getDate())
//         i--;
//       }
//       return arr;
//     } else if (tabValue === 1) { // theo giờ
//       return ["09:00", "11:00", "15:00", "17:00"]
//     } else if (tabValue === 2) { // theo thứ
//       return daysOfWeek
//     }
//   } else if (viewBy === INCOME_VIEW_BY[3].value) { //tháng này
//     if (tabValue === 0) { // theo ngày
//       return getDatesOfCurrentMonth();
//     } else if (tabValue === 1) { // theo giờ
//       return ["09:00", "11:00", "15:00", "17:00"]
//     } else if (tabValue === 2) { // theo thứ
//       return daysOfWeek
//     }
//   } else if (viewBy === INCOME_VIEW_BY[4].value) { // tháng trước
//     if (tabValue === 0) { // theo ngày
//       const date = new Date(), y = date.getFullYear(), m = date.getMonth();
//       return getDatesOfMonthTo(new Date(y, m, 0));
//     } else if (tabValue === 1) { // theo giờ
//       return ["09:00", "11:00", "15:00", "17:00"]
//     } else if (tabValue === 2) { // theo thứ
//       return daysOfWeek
//     }
//   }
//   return []
// }

// const getSeries = (viewBy, tabValue) => {
//   if (viewBy === INCOME_VIEW_BY[0].value) { //hôm nay
//     if (tabValue === 0) { // theo ngày
//       return SERIES_DATA_LAST_MONTH.slice(new Date().getDate(), new Date().getDate() + 1)
//     } else if (tabValue === 1) { // theo giờ
//       return SERIES_DATA_LAST_MONTH.slice(new Date().getDate(), new Date().getDate() + 1)
//     } else if (tabValue === 2) { // theo thứ
//       return SERIES_DATA_LAST_MONTH.slice(new Date().getDate(), new Date().getDate() + 1)
//     }
//   } else if (viewBy === INCOME_VIEW_BY[1].value) { //hôm qua
//     if (tabValue === 0) { // theo ngày
//       return SERIES_DATA_LAST_MONTH.slice(new Date().getDate() - 1, new Date().getDate())
//     } else if (tabValue === 1) { // theo giờ
//       return SERIES_DATA_LAST_MONTH.slice(new Date().getDate() - 1, new Date().getDate())
//     } else if (tabValue === 2) { // theo thứ
//       return SERIES_DATA_LAST_MONTH.slice(new Date().getDate() - 1, new Date().getDate())
//     }
//   } else if (viewBy === INCOME_VIEW_BY[2].value) { //7 ngày qua
//     if (tabValue === 0) { // theo ngày
//       return SERIES_DATA_LAST_MONTH.slice(new Date().getDate() - 7, new Date().getDate());
//     } else if (tabValue === 1) { // theo giờ
//       return [2720000, 10800000, 30250000, 3505000]
//     } else if (tabValue === 2) { // theo thứ
//       return [6120000, 5020000, 1250000, 1700000, 4580000, 5500000, 6020000]
//     }
//   } else if (viewBy === INCOME_VIEW_BY[3].value) { //tháng này
//     if (tabValue === 0) { // theo ngày
//       return SERIES_DATA_LAST_MONTH.slice(0, new Date().getDate());
//     } else if (tabValue === 1) { // theo giờ
//       return [9300000, 38900000, 92250000, 50193000]
//     } else if (tabValue === 2) { // theo thứ
//       return [25210000, 20010000, 12310000, 11010000, 30520000, 35200000, 40572000]
//     }
//   } else if (viewBy === INCOME_VIEW_BY[4].value) { // tháng trước
//     if (tabValue === 0) { // theo ngày
//       return SERIES_DATA_LAST_MONTH;
//     } else if (tabValue === 1) { // theo giờ
//       return [15300000, 52300000, 182250000, 72852000]
//     } else if (tabValue === 2) { // theo thứ
//       return [31210000, 35010000, 29800000, 32760000, 49150000, 55200000, 89572000]
//     }
//   }
//   return []
// }

// const ChartByIncome = ({viewBy, tabValue}) => {
//   const chartRef = React.useRef(null);
  
//   const options = {
//     chart: {
//       type: "column",
//       style: {
//         fontFamily: 'Roboto'
//       }
//     },
//     title: {
//       text: null,
//     },
//     xAxis: {
//       categories: getCategories(viewBy, tabValue)
//     },
//     yAxis: {
//       title: {
//         text: null,
//       },
//     },
//     credits: {
//       enabled: false,
//     },
//     plotOptions: {
//       column: {
//         // borderRadius: "25%",
//       },
//       series: {
//         color: "#0070F4"
//       }
//     },
//     legend: { enabled: false },
//     tooltip: {
//       formatter: function (tooltip) {
//         return this.y.toLocaleString()
//       },
//       shared: true,
//     },
//     series: [
//       {
//         data: getSeries(viewBy, tabValue),
//       },
//     ],
//   };
//   return (
//     <HighchartsReact
//       highcharts={Highcharts}
//       options={options}
//       ref={chartRef}
//     />
//   )
// };

// const getTotalIncomes = viewBy => {
//   if (viewBy === INCOME_VIEW_BY[0].value) { //hôm nay
//     return Number(SERIES_DATA_LAST_MONTH.slice(new Date().getDate(), new Date().getDate() + 1).reduce((acc, s) => acc+s,0)).toLocaleString()
//   } else if (viewBy === INCOME_VIEW_BY[1].value) { //hôm qua
//     return Number(SERIES_DATA_LAST_MONTH.slice(new Date().getDate() - 1, new Date().getDate()).reduce((acc, s) => acc+s,0)).toLocaleString()
//   } else if (viewBy === INCOME_VIEW_BY[2].value) { //7 ngày qua
//     return Number(SERIES_DATA_LAST_MONTH.slice(new Date().getDate() - 7, new Date().getDate()).reduce((acc, s) => acc+s,0)).toLocaleString()
//   } else if (viewBy === INCOME_VIEW_BY[3].value) { //tháng này
//     return Number(SERIES_DATA_LAST_MONTH.slice(0, new Date().getDate()).reduce((acc, s) => acc+s,0)).toLocaleString()
//   } else if (viewBy === INCOME_VIEW_BY[4].value) { // tháng trước
//     return Number(SERIES_DATA_LAST_MONTH.reduce((acc, s) => acc+s,0)).toLocaleString();
//   }
//   return 0
// }

// function DashboardChartByIncome() {
//   const [viewBy, setViewBy] = React.useState("4"); // mặc định tháng này
//   const handleChange = (e) => {
//     setViewBy(e.target.value);
//   };

//   return (
//     <section className="cards-container mt-16">
//       <h5 className="cards-header flex flex-middle">
//         DOANH THU THUẦN {INCOME_VIEW_BY.find((f) => f.value === viewBy)?.name}
//         <ArrowForwardOutlinedIcon className="ml-12 mr-4" />
//         <span style={{ color: "#0070F4", flex: 1 }}>
//           {getTotalIncomes(viewBy)}
//         </span>
//         <div className="ml-32">
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
//         <TabChart viewBy={viewBy} />
//       </div>
//     </section>
//   );
// }
// export default memo(DashboardChartByIncome);
