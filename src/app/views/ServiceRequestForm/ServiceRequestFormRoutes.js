import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
const ServiceRequestFormIndex = EgretLoadable({
  loader: () => import("./ServiceRequestFormIndex"),
});
const ViewComponent = ServiceRequestFormIndex;

const Routes = [
  {
    path: ConstantList.ROOT_PATH + "labtest/serviceRequestForm",
    exact: true,
    component: ViewComponent,
  },
];

export default Routes;
