import { EgretLoadable } from "egret";
import ConstantList from "app/appConfig";

const ViewComponent = EgretLoadable({ loader: () => import("./DeliveryPartnerIndex") });;
const DeliveryPartnerRoutes = [
  {
    path: ConstantList.ROOT_PATH + ":module/category/delivery-partner",
    exact: true,
    component: ViewComponent,
  },
];

export default DeliveryPartnerRoutes;