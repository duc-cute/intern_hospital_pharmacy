import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";

const UserIndex = EgretLoadable({
  loader: () => import("./UserIndex"),
});

const ViewComponentUser = UserIndex;


const UserRoutes = [
  {
    path: ConstantList.ROOT_PATH + ":module/user-manage",
    exact: true,
    component: ViewComponentUser,
  },
];

export default UserRoutes;
