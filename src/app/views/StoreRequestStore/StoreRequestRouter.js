import { EgretLoadable } from "egret";
import Config from "app/appConfig";

const StoreRequestRoutes = [
    {
        path: Config.ROOT_PATH + ":module/store-request-store",
        exact: true,
        component: EgretLoadable({ loader: () => import("./StoreRequestIndex") }),
    },
];

export default StoreRequestRoutes;
