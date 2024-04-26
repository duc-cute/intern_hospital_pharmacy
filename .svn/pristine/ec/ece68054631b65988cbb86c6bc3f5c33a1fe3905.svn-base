import { EgretLoadable } from "egret";
import ConstantList from "app/appConfig";

const ViewComponent = EgretLoadable({ loader: () => import("./ProductUsageIndex") });

const Routes = [
  {
    path: ConstantList.ROOT_PATH + ":module/page/product-usage",
    exact: true,
    component: ViewComponent,
  },
];

export default Routes;
