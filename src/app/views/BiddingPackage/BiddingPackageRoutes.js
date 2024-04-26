import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
const BiddingPackageIndex = EgretLoadable({
  loader: () => import("./BiddingPackageIndex"),
});
const ViewComponent = BiddingPackageIndex;

const Routes = [
  {
    path: ConstantList.ROOT_PATH + ":module/category/bidding-package",
    exact: true,
    component: ViewComponent,
  },
];

export default Routes;
