import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
const SupplierIndex = EgretLoadable({
  loader: () => import("./SupplierIndex"),
});
const ViewComponent = SupplierIndex;

const Routes = [
  {
    path: ConstantList.ROOT_PATH + ":module/supplier",
    exact: true,
    component: ViewComponent,
  },
];

export default Routes;
