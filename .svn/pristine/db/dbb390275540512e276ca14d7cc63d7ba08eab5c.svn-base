import { EgretLoadable } from "egret";
import ConstantList from "app/appConfig";

const Routes = [
  {
    path: ConstantList.ROOT_PATH + ":module/report/inventory-report",
    exact: true,
    component: EgretLoadable({ loader: () => import("./InventoryReportIndex") }),
  },
];

export default Routes;
