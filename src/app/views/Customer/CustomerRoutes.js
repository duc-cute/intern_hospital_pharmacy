import { EgretLoadable } from "egret";
import ConstantList from "app/appConfig";

const ViewComponent = EgretLoadable({ loader: () => import("./CustomerIndex") });;
const CustomerRoutes = [
  {
    path: ConstantList.ROOT_PATH + ":module/category/customer",
    exact: true,
    component: ViewComponent,
  },
];

export default CustomerRoutes;