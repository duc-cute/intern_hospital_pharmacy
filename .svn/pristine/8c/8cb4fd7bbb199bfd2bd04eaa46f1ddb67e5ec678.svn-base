import { EgretLoadable } from "egret";
import ConstantList from "app/appConfig";

const ViewComponent = EgretLoadable({ loader: () => import("./DeliveryPlaceIndex") });;
const DeliveryPlaceRoutes = [
  {
    path: ConstantList.ROOT_PATH + ":module/category/delivery-place",
    exact: true,
    component: ViewComponent,
  },
];

export default DeliveryPlaceRoutes;
