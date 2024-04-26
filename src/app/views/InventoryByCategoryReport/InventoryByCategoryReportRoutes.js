import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
const InventoryReportIndex = EgretLoadable({
  loader: () => import("./InventoryByCategoryReportIndex"),
});
const ViewComponent = InventoryReportIndex;

const Routes = [
  {
    path: ConstantList.ROOT_PATH + ":module/report/inventory-by-category",
    exact: true,
    component: ViewComponent,
  },
  {
    path: ConstantList.ROOT_PATH + ":module/report/new-inventory-by-category",
    exact: true,
    component: ViewComponent,
    auth: ["ROLE_ADMIN"],
  },
];

export default Routes;
