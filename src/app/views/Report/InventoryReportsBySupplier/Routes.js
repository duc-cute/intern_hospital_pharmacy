import { EgretLoadable } from "egret";
import ConstantList from "app/appConfig";

const InventoryReportsBySupplierRoutes = [
  {
    path: ConstantList.ROOT_PATH + ":module/report/inventory-reports-by-supplier",
    exact: true,
    component: EgretLoadable({ loader: () => import("./Index") }),
  },
];

export default InventoryReportsBySupplierRoutes;
