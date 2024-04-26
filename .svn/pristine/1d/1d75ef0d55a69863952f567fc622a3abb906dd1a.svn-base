import { EgretLoadable } from "egret";
import ConstantList from "app/appConfig";

const ViewComponent = EgretLoadable({ loader: () => import("./CountryIndex") });

const Routes = [
  {
    path: ConstantList.ROOT_PATH + ":module/country",
    exact: true,
    component: ViewComponent,
  },
];

export default Routes;
