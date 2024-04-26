// import NotFound from "./NotFound";
import { EgretLoadable } from "egret";
import { withTranslation } from 'react-i18next';
import ForgotPassword from "./ForgotPassword";
import Config from "app/appConfig";

const SignIn = EgretLoadable({
    loader: () =>
        import("./SignIn")
});
const ViewComponentSignIn = withTranslation()(SignIn);

const SignUp = EgretLoadable({
    loader: () =>
        import("./SignUp_RegisterAccount")
});
const ViewComponentSignUp = withTranslation()(SignUp);

const NotFound = EgretLoadable({
    loader: () =>
        import("./NotFound")
});
const ViewComponentNotFound = withTranslation()(NotFound);

const settings = {
    activeLayout: "layout1",
    layout1Settings: {
        topbar: {
            show: false
        },
        leftSidebar: {
            show: false,
            mode: "close"
        }
    },
    layout2Settings: {
        mode: "full",
        topbar: {
            show: false
        },
        navbar: { show: false }
    },
    secondarySidebar: { show: false },
    footer: { show: false }
};

const sessionRoutes = [{
    path: Config.ROOT_PATH + "session/signup-register-account",
    component: ViewComponentSignUp,
    settings
},
{
    path: Config.ROOT_PATH + "session/signin",
    component: ViewComponentSignIn,
    settings
},
{
    path: Config.ROOT_PATH + "session/forgot-password",
    component: ForgotPassword,
    settings
},
{
    path: Config.ROOT_PATH + "session/404",
    component: ViewComponentNotFound,
    settings
},
{
    path: Config.ROOT_PATH + "session/not-authorized",
    component: EgretLoadable({ loader: () => import("./NotAuthorized") }),
    settings
}
];

export default sessionRoutes;