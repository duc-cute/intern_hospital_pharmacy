import { EgretLoadable } from "egret";
import ConstantList from "app/appConfig";

const ViewComponent = EgretLoadable({ loader: () => import("./BankIndex") });;
const BankRoutes = [
  {
    path: ConstantList.ROOT_PATH + ":module/category/bank",
    exact: true,
    component: ViewComponent,
  },
];

export default BankRoutes;
