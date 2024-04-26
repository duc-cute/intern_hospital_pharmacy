import { EgretLoadable } from "egret";
import Config from "app/appConfig";

const Routes = [
  {
    path: Config.ROOT_PATH + ":module/stock-in",
    exact: true,
    component: EgretLoadable({ loader: () => import("./StockInIndex") }),
  },
  {
    path: Config.ROOT_PATH + ":module/stock-in/form",
    exact: true,
    component: EgretLoadable({ loader: () => import("./Form/Index") }),
  },
];

export default Routes;
