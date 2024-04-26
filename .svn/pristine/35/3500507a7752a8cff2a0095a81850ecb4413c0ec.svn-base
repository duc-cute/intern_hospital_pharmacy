import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
const AttributeIndex = EgretLoadable({
  loader: () => import("./AttributeIndex"),
});
const ViewComponent = AttributeIndex;

const Routes = [
  {
    path: ConstantList.ROOT_PATH + ":module/category/attribute",
    exact: true,
    component: ViewComponent,
  },
];

export default Routes;
