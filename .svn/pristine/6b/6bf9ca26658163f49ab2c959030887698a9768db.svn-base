import { EgretLoadable } from "egret";
import ConstantList from "app/appConfig";
const ViewComponent = EgretLoadable({ loader: () => import("./DashboardIndex") });

const Routes = [
  {
    path: ConstantList.ROOT_PATH + ":module/dashboard",
    exact: true,
    component: ViewComponent,
  },
];

export default Routes;
