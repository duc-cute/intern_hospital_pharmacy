import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";

const ViewComponent = EgretLoadable({ loader: () => import("./ActiveIngredientIndex") });

const Routes = [
  {
    path: ConstantList.ROOT_PATH + ":module/active-ingredient",
    exact: true,
    component: ViewComponent,
  },
];

export default Routes;
