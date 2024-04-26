import { EgretLoadable } from "egret";
import ConstantList from "app/appConfig";

const Routes = [
  {
    path: ConstantList.ROOT_PATH + ":module/report/origin-report",
    exact: true,
    component: EgretLoadable({ loader: () => import("./OriginReportIndex") }),
  },
];

export default Routes;
