import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
const ViewComponent = EgretLoadable({ loader: () => import("./StoreIndex") });

const Routes = [
  {
    path: ConstantList.ROOT_PATH + ":module/store",
    exact: true,
    component: ViewComponent,
  },
];

export default Routes;
