import { EgretLoadable } from "egret";
import Config from "app/appConfig";

const Routes = [
  {
    path: Config.ROOT_PATH + ":module/stock-out",
    exact: true,
    component: EgretLoadable({ loader: () => import("./StockOutIndex") }),
  },
  {
    path: Config.ROOT_PATH + ":module/stock-out/form",
    exact: true,
    component: EgretLoadable({ loader: () => import("./Form/Index") }),
  },
];

export default Routes;
