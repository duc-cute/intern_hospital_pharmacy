import {EgretLoadable} from "egret";
import ConstantList from "../../appConfig";

const MedicaSuppliesIndex = EgretLoadable({
    loader: () => import("./MedicaSuppliesIndex"),
});
const ViewComponent = MedicaSuppliesIndex;

const Routes = [
    {
        path: ConstantList.ROOT_PATH + ":module/product/medical-supplies",
        exact: true,
        component: ViewComponent,
    },
];

export default Routes;
