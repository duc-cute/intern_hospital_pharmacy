import { EgretLoadable } from "egret";
import ConstantList from "app/appConfig";

const lotRoutes = [
    {
        path: ConstantList.ROOT_PATH + ":module/lot",
        exact: true,
        component: EgretLoadable({ loader: () => import("./LotIndex") }),
    },
];

export default lotRoutes;
