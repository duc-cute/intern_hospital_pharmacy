import { EgretLoadable } from "egret";
import ConstantList from "app/appConfig";

const ViewComponent = EgretLoadable({ loader: () => import("./StockKeepingUnitIndex") });;
const Routes = [
  {
    path: ConstantList.ROOT_PATH + ":module/category/stockKeepingUnit",
    exact: true,
    component: ViewComponent,
  },
];

export default Routes;
