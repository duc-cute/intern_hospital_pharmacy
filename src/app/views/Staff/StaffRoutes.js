import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
const StaffIndex = EgretLoadable({
  loader: () => import("./StaffIndex"),
});
const ViewComponent = StaffIndex;

const StaffRoutes = [
  {
    path: ConstantList.ROOT_PATH + ":module/category/staff",
    exact: true,
    component: ViewComponent,
  },
];

export default StaffRoutes;
