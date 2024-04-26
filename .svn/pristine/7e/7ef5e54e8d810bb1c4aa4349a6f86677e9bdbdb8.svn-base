import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
const InventoryReportIndex = EgretLoadable({
  loader: () => import("./InventoryReportIndex"),
});
const ViewComponent = InventoryReportIndex;

const Routes = [
  {
    path: ConstantList.ROOT_PATH + "report/inventory-report",
    exact: true,
    component: ViewComponent,
  },
];

export default Routes;
