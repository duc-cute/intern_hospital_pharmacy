import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
const SourceIndex = EgretLoadable({
  loader: () => import("./SourceIndex"),
});
const ViewComponent = SourceIndex;

const Routes = [
  {
    path: ConstantList.ROOT_PATH + ":module/category/source",
    exact: true,
    component: ViewComponent,
  },
];

export default Routes;
