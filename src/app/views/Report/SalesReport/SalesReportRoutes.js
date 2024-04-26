import { EgretLoadable } from "egret";
import ConstantList from "app/appConfig";

const Routes = [
  {
    path: ConstantList.ROOT_PATH + ":module/report/sales-report",
    exact: true,
    component: EgretLoadable({ loader: () => import("./SalesReportIndex") }),
  },
];

export default Routes;
