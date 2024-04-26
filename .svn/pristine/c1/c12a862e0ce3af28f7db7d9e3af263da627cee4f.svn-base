import { EgretLoadable } from "egret";
import ConstantList from "app/appConfig";
const InventoryUsageReportIndex = EgretLoadable({
  loader: () => import("./InventoryUsageReportIndex"),
});
const ViewComponent = InventoryUsageReportIndex;

const Routes = [
  {
    path: ConstantList.ROOT_PATH + ":module/report/inventory-usage-report",
    exact: true,
    component: ViewComponent,
  },
];

export default Routes;
