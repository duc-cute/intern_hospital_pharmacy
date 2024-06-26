import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { withTranslation } from 'react-i18next';

const UserProfile = EgretLoadable({
    loader: () =>
        import ("./UserProfile")
});
const ViewComponent = withTranslation()(UserProfile);

const ChangePassword = EgretLoadable({
    loader: () =>
        import ("./ChangePasswordPopup")
});
const ViewComponentChangePassword = withTranslation()(ChangePassword);

const pageLayoutRoutes = [{
        path: ConstantList.ROOT_PATH + ":module/user-profile",
        component: ViewComponent
    },
    {
        path: ConstantList.ROOT_PATH + ":module/user-change-password",
        component: ViewComponentChangePassword
    },
];

export default pageLayoutRoutes;