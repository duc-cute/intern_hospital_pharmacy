import { EgretLoadable } from "egret";
import ConstantList from "app/appConfig";

const ViewComponent = EgretLoadable({ loader: () => import("./SaleAssociateIndex") });;
const SaleAssociateRoutes = [
  {
    path: ConstantList.ROOT_PATH + ":module/sale-associate",
    exact: true,
    component: ViewComponent,
  },
];

export default SaleAssociateRoutes;
