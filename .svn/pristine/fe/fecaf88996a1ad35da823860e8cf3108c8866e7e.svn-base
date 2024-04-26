import { EgretLoadable } from "egret";
import ConstantList from "app/appConfig";

const ViewComponent = EgretLoadable({ loader: () => import("./CategoryDrugIndex") });

const Routes = [
  {
    path: ConstantList.ROOT_PATH + ":module/page/category-drugs",
    exact: true,
    component: ViewComponent,
  },
];

export default Routes;
