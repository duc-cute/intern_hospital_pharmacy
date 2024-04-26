import React from "react";
import {Redirect} from "react-router-dom";
import sessionRoutes from "./views/sessions/SessionRoutes";
import dashboardRoutes from "./views/dashboard/DashboardRoutes";
import roleRoutes from "./views/Role/RoleRoutes";
import Config from "./appConfig";
import stockKeepingUnitRoutes from "./views/StockKeepingUnit/StockKeepingUnitRoutes";
import administrativeUnitRouter from "./views/AdministrativeUnit/AdministrativeUnitRoutes";
import stockInRoutes from "./views/StockIn/StockInRoutes";
import stockOutRoutes from "./views/StockOut/StockOutRoutes";
import storeRoutes from "./views/Store/StoreRoutes";
import productRoutes from "./views/Product/ProductRoutes";
import medicaSuppliesRoutes from "./views/MedicalSupplies/MedicaSuppliesRoutes";
import inventoryReportRoutes from "./views/Report/InventoryReport/InventoryReportRoutes";
import supplierRoutes from "./views/Supplier/SupplierRoutes";
import categoryRoutes from "./views/Category/CategoryRoutes";
import categoryDrugRoutes from "./views/CategoryDrug/CategoryDrugRoutes";
import inventoryByCategoryReportRoutes from "./views/InventoryByCategoryReport/InventoryByCategoryReportRoutes";
import sourceRoutes from "./views/Source/SourceRoutes";
import user from './views/User/UserRoutes';
import userProfile from './views/page-layouts/PageLayoutRoutees';
import inventoryUsageReportRoutes from "./views/Report/InventoryUsageReport/InventoryUsageReportRoutes";
import activeIngredientRoutes from "./views/ActiveIngredient/ActiveIngredientRoutes";
import ActiveIngredientRoutes from "./views/ActiveIngredient/ActiveIngredientRoutes";
import biddingPackageRoutes from "./views/BiddingPackage/BiddingPackageRoutes";
import StoreRequestRoutes from "./views/StoreRequest/StoreRequestRouter";
import OriginReportRoutes from "app/views/Report/OriginReport/OriginReportRoutes";
import ShiftworkRoutes from "./views/Shiftwork/ShiftworkRoutes";
import BankAccountRoutes from "./views/BankAccount/BankAccountRoutes";
import BankRoutes from "./views/Bank/BankRoutes";
import StaffRoutes from "./views/Staff/StaffRoutes";
import ShiftWorkChangeRoutes from "./views/ShiftWorkChange/ShiftWorkChangeRoutes";
import CustomerRoutes from "./views/Customer/CustomerRoutes";
import SaleAssociateRoutes from "./views/SaleAssociate/SaleAssociateRoutes";
import DeliveryPlaceRoutes from "./views/DeliveryPlace/DeliveryPlaceRoutes";
import DeliveryPartnerRoutes from "./views/DeliveryPartner/DeliveryPartnerRoutes";
import lotRoutes from "./views/Lot/LotRoutes";
import InventoryReportsBySupplierRoutes from "./views/Report/InventoryReportsBySupplier/Routes";
import StoreRequestStoreRoutes from "./views/StoreRequestStore/StoreRequestRouter";
import CategoryTypeRoutes from "./views/CategoryType/CategoryTypeRoutes";
import ProductUsageRoutes from "./views/ProductUsage/ProductUsageRoutes";
import StoreOrganizationRoutes from "./views/StoreOrganization/StoreOrganizationRoutes";
import PackagingFormRoutes from "./views/PackagingForm/PackagingFormRoutes";
import CountryRoutes from "./views/Country/CountryRoutes";

const redirectRoute = [
    {
        path: Config.ROOT_PATH,
        exact: true,
        component: () => <Redirect to={Config.HOME_PAGE}/>, // Luôn trỏ về HomePage được khai báo trong appConfig
    },
];

const errorRoute = [
    {
        component: () => <Redirect to={Config.ROOT_PATH + "session/404"}/>,
    },
];
// super admin
const superAdminRoutes = {
    auth: ["ROLE_SUPER_ADMIN"],
    children: [
        ...CategoryTypeRoutes,
        ...ProductUsageRoutes,
        ...StoreOrganizationRoutes,
    ]
}

// phân quyền admin, super admin
const adminRoutes = {
    auth: ["ROLE_ADMIN", "ROLE_SUPER_ADMIN"],
    children: [
        ...ActiveIngredientRoutes,
        ...user,
        ...userProfile,
        ...dashboardRoutes,
        ...roleRoutes,
        ...stockKeepingUnitRoutes,
        ...storeRoutes,
        ...lotRoutes,
        ...stockInRoutes,
        ...stockOutRoutes,
        ...productRoutes,
        ...medicaSuppliesRoutes,
        ...supplierRoutes,
        ...administrativeUnitRouter,
        ...inventoryReportRoutes,
        ...categoryRoutes,
        ...categoryDrugRoutes,
        ...inventoryByCategoryReportRoutes,
        ...inventoryUsageReportRoutes,
        ...activeIngredientRoutes,
        ...biddingPackageRoutes,
        ...sourceRoutes,
        ...ShiftworkRoutes,
        ...StoreRequestRoutes,
        ...OriginReportRoutes,
        ...BankAccountRoutes,
        ...BankRoutes,
        ...StaffRoutes,
        ...ShiftWorkChangeRoutes,
        ...CustomerRoutes,
        ...SaleAssociateRoutes,
        ...DeliveryPartnerRoutes,
        ...DeliveryPlaceRoutes,
        ...InventoryReportsBySupplierRoutes,
        ...StoreRequestStoreRoutes,
        ...PackagingFormRoutes,
        ...CountryRoutes
    ]
}

// phân quyền store manager
const storeManageRoutes = {
    auth: ["ROLE_STORE_MANAGER"],
    children: [
        ...stockInRoutes,
        ...stockOutRoutes,
        ...inventoryReportRoutes,
        ...StoreRequestRoutes,
        ...OriginReportRoutes,
        ...StoreRequestStoreRoutes,
    ]
}

const routes = [
    ...sessionRoutes,
    superAdminRoutes,
    adminRoutes,
    storeManageRoutes,
    ...redirectRoute,
    ...errorRoute,
];

export default routes;
