import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
const ProductIndex = EgretLoadable({
  loader: () => import("./ProductIndex"),
});
const ViewComponent = ProductIndex;

const Routes = [
  {
    path: ConstantList.ROOT_PATH + ":module/product/medicine",
    exact: true,
    component: ViewComponent,
  },
];

export default Routes;
