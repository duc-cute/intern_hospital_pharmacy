import Config from "app/appConfig";
import {PathModule} from "app/common/Constant/LocalConstant";


export const NAVIGATION = [
    {
        name: "Tổng quan",
        icon: "dashboard",
        path: Config.ROOT_PATH + PathModule.MANAGE + "/dashboard",
        auth: ["ROLE_ADMIN", "ROLE_SUPER_ADMIN", "ROLE_STORE_MANAGER"],
    },
    {
        name: "Quản lý nhập kho",
        icon: "assignment",
        path: '/#',
        auth: ["ROLE_ADMIN", "ROLE_SUPER_ADMIN", "ROLE_STORE_MANAGER"],
        children: [
            {
                name: "Danh sách phiếu nhập kho",
                path: Config.ROOT_PATH + PathModule.MANAGE + "/stock-in",
                isVisible: true,
            },
            {
                name: "Nhập kho",
                path: Config.ROOT_PATH + PathModule.MANAGE + "/stock-in/form",
                isVisible: true,
            },
            {
                name: "Gói thầu",
                isVisible: true,
                path: Config.ROOT_PATH + PathModule.MANAGE + "/category/bidding-package",
            },
            {
                name: "Lô hàng",
                path: Config.ROOT_PATH + PathModule.MANAGE + "/lot",
                isVisible: true,
            },
        ]
    },
    {
        name: "Quản lý xuất kho",
        icon: "assignment",
        path: '/#',
        auth: ["ROLE_ADMIN", "ROLE_SUPER_ADMIN", "ROLE_STORE_MANAGER"],
        children: [
            {
                name: "Danh sách phiếu xuất kho",
                path: Config.ROOT_PATH + PathModule.MANAGE + "/stock-out",
                isVisible: true,
            },
            {
                name: "Xuất kho",
                path: Config.ROOT_PATH + PathModule.MANAGE + "/stock-out/form",
                isVisible: true,
            },
            {
                name: "Yêu cầu xuất kho",
                path: Config.ROOT_PATH + PathModule.MANAGE + "/store-request-store",
                isVisible: true,
            },
        ]
    },
    {
        name: "Quản lý sản phẩm",
        // isVisible: true,
        // path: Config.ROOT_PATH + PathModule.MANAGE + "/product",
        path: '/#',
        icon: "local_shipping",
        children: [
            {
                name: "Vật tư y tế",
                isVisible: true,
                path: Config.ROOT_PATH + PathModule.MANAGE + "/product/medical-supplies",
            },
            {
                name: "Thuốc",
                isVisible: true,
                path: Config.ROOT_PATH + PathModule.MANAGE + "/product/medicine",
            },
        ]
    },
    {
        name: "Báo cáo",
        icon: "assessment",
        path: '/#',
        auth: ["ROLE_ADMIN", "ROLE_SUPER_ADMIN", "ROLE_STORE_MANAGER"],
        children: [
            {
                name: "Báo cáo tồn kho",
                isVisible: true,
                path: Config.ROOT_PATH + PathModule.MANAGE + "/report/inventory-report",
            },
            {
                name: "Báo cáo nhập xuất tồn",
                isVisible: true,
                path: Config.ROOT_PATH + PathModule.MANAGE + "/report/origin-report",
            },
            {
                name: "Báo cáo nhập kho theo nhà cung cấp",
                isVisible: true,
                path: Config.ROOT_PATH + PathModule.MANAGE + "/report/inventory-reports-by-supplier",
            },
        ]
    },
    {
        name: "navigation.directory",
        icon: "list",
        isVisible: true,
        path: "/#",
        auth: ["ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
        children: [
            {
                name: "navigation.store",
                isVisible: true,
                path: Config.ROOT_PATH + PathModule.MANAGE + "/store",
            },
            // {
            //     name: "Danh sách thuốc - Vật tư y tế",
            //     isVisible: true,
            //     path: Config.ROOT_PATH + PathModule.MANAGE + "/product",
            // },
            {
                name: "Nhóm Vật tư y tế",
                isVisible: true,
                path: Config.ROOT_PATH + PathModule.MANAGE + "/page/category",
            },
            {
                name: "Nhóm thuốc",
                isVisible: true,
                path: Config.ROOT_PATH + PathModule.MANAGE + "/page/category-drugs",
            },
            {
                name: "Nhóm phân loại",
                isVisible: true,
                path: Config.ROOT_PATH + PathModule.MANAGE + "/page/category-type",
            },
            {
                name: "Đường dùng",
                isVisible: true,
                path: Config.ROOT_PATH + PathModule.MANAGE + "/page/product-usage",
            },
            {
                name: "Hoạt chất",
                path: Config.ROOT_PATH + PathModule.MANAGE + "/active-ingredient",
                isVisible: true,
            },
            {
                name: "Dạng bào chế",
                path: Config.ROOT_PATH + PathModule.MANAGE + "/packaging-form",
                isVisible: true,
            },
            {
                name: "navigation.stockKeepingUnit",
                isVisible: true,
                path: Config.ROOT_PATH + PathModule.MANAGE + "/category/stockKeepingUnit",
            },
            {
                name: "Danh sách nhà cung cấp",
                isVisible: true,
                path: Config.ROOT_PATH + PathModule.MANAGE + "/supplier",
            },
            {
                name: "Nguồn",
                isVisible: true,
                path: Config.ROOT_PATH + PathModule.MANAGE + "/category/source",
            },
            {
                name: "Danh sách giao ca",
                isVisible: true,
                path: Config.ROOT_PATH + PathModule.MANAGE + "/category/shift-work-change",
            },
            {
                name: "Danh sách nhân viên",
                isVisible: true,
                path: Config.ROOT_PATH + PathModule.MANAGE + "/category/staff",
            },
            {
                name: "Ca làm việc",
                isVisible: true,
                path: Config.ROOT_PATH + PathModule.MANAGE + "/shiftwork",
            },
            {
                name: "navigation.administrative-unit",
                isVisible: true,
                path: Config.ROOT_PATH + PathModule.MANAGE + "/category/administrative-unit",
            },
            {
                name: "Quốc gia",
                isVisible: true,
                path: Config.ROOT_PATH + PathModule.MANAGE + "/country",
            },
        ],
    },
    {
        name: "Quản trị hệ thống",
        isVisible: true,
        icon: "settings",
        auth: ["ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
        children: [
            {
                name: "Thông tin cá nhân",
                isVisible: true,
                path: Config.ROOT_PATH + PathModule.MANAGE + "/user-profile",
            },
            {
                name: "Tài khoản người dùng",
                isVisible: true,
                path: Config.ROOT_PATH + PathModule.MANAGE + "/user-manage",
            },
            {
                name: "Danh sách cơ sở sử dụng dịch vụ",
                icon: "group",
                path: Config.ROOT_PATH + PathModule.MANAGE + "/store-organization",
                isVisible: true,
            },
        ],
    }
];

export const navigations = []