import { EgretLoadable } from "egret";
import ConstantList from "app/appConfig";

const ViewComponent = EgretLoadable({ loader: () => import("./ShiftworkIndex") });;
const ShiftworkRoutes = [
  {
    path: ConstantList.ROOT_PATH + ":module/shiftwork",
    exact: true,
    component: ViewComponent,
  },
];

export default ShiftworkRoutes;
