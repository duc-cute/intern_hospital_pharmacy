import { EgretLoadable } from "egret";
import ConstantList from "app/appConfig";

const Routes = [
  {
    path: ConstantList.ROOT_PATH + ":module/report/end-of-day-report",
    exact: true,
    component: EgretLoadable({ loader: () => import("./EndOfDayReportIndex") }),
  },
];

export default Routes;
