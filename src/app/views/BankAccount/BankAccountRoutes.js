import { EgretLoadable } from "egret";
import ConstantList from "app/appConfig";

const ViewComponent = EgretLoadable({ loader: () => import("./BankAccountIndex") });;
const BankAccountRoutes = [
  {
    path: ConstantList.ROOT_PATH + ":module/category/bank-account",
    exact: true,
    component: ViewComponent,
  },
];

export default BankAccountRoutes;
