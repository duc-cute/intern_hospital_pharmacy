import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
const PackagingFormIndex = EgretLoadable({
  loader: () => import("./PackagingFormIndex"),
});
const ViewComponent = PackagingFormIndex;

const Routes = [
  {
    path: ConstantList.ROOT_PATH + ":module/packaging-form",
    exact: true,
    component: ViewComponent,
  },
];

export default Routes;
