import { EgretLoadable } from "egret";
import ConstantList from "app/appConfig";

const StoreOrganizationIndex = EgretLoadable({
  loader: () => import("./StoreOrganizationIndex"),
});

const ViewComponentStoreOrganization = StoreOrganizationIndex;

const StoreOrganizationRoutes = [
  {
    path: ConstantList.ROOT_PATH + ":module/store-organization",
    exact: true,
    component: ViewComponentStoreOrganization,
    auth: ["ROLE_SUPER_ADMIN"],
  },
];

export default StoreOrganizationRoutes;
