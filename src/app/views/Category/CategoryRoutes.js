import { EgretLoadable } from "egret";
import ConstantList from "app/appConfig";

const ViewComponent = EgretLoadable({ loader: () => import("./CategoryIndex") });

const Routes = [
  {
    path: ConstantList.ROOT_PATH + ":module/page/category",
    exact: true,
    component: ViewComponent,
  },
];

export default Routes;
