import { EgretLoadable } from "egret";
import ConstantList from "app/appConfig";

const ViewComponent = EgretLoadable({ loader: () => import("./ShiftWorkChangeIndex") });;
const ShiftWorkChangeRoutes = [
  {
    path: ConstantList.ROOT_PATH + ":module/category/shift-work-change",
    exact: true,
    component: ViewComponent,
  },
];

export default ShiftWorkChangeRoutes;
