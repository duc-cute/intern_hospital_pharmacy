import { EgretLoadable } from "egret";
import ConstantList from "app/appConfig";

const ViewComponent = EgretLoadable({ loader: () => import("./CategoryTypeIndex") });

const Routes = [
  {
    path: ConstantList.ROOT_PATH + ":module/page/category-type",
    exact: true,
    component: ViewComponent,
  },
];

export default Routes;
