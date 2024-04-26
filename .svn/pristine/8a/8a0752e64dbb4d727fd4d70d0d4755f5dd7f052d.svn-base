import {createContext, useContext} from "react";
import StockKeepingUnitStore from "./views/StockKeepingUnit/StockKeepingUnitStore";
import AdministrativeStore from "./views/AdministrativeUnit/AdministrativeUnitStore";
import StockInStore from "./views/StockIn/StockInStore";
import StockOutStore from "./views/StockOut/StockOutStore";
import StoreStore from "./views/Store/StoreStore";
import ProductStore from "./views/Product/ProductStore";
// import InventoryReportStore from "./views/InventoryReport/InventoryReportStore";
import SupplierStore from "./views/Supplier/SupplierStore";
import CategoryStore from "./views/Category/CategoryStore";
import InventoryByCategoryReportStore from "./views/InventoryByCategoryReport/InventoryByCategoryReportStore";
import DetailsInventoryByProductStore from "./views/DetailsInventoryByProduct/DetailsInventoryByProductStore";
import SourceStore from "./views/Source/SourceStore";
import UserStore from "./views/User/UserStore";
import InventoryUsageReportStore from "./views/Report/InventoryUsageReport/InventoryUsageReportStore";
import ActiveIngredientStore from "./views/ActiveIngredient/ActiveIngredientStore";
import BiddingPackageStore from "./views/BiddingPackage/BiddingPackageStore";
import InventoryReportStore from "./views/Report/InventoryReport/InventoryReportStore";
import StoreRequestStore from "./views/StoreRequest/StoreRequestStore";
import OriginReportStore from "./views/Report/OriginReport/OriginReportStore";
import ShiftworkStore from './views/Shiftwork/ShiftworkStore';
import CustomerStore from "./views/Customer/CustomerStore";
import StaffStore from "./views/Staff/StaffStore";
import BankAccountStore from "./views/BankAccount/BankAccountStore";
import SalesReportStore from "./views/Report/SalesReport/SalesReportStore";
import BankStore from "./views/Bank/BankStore";
import ShiftWorkChangeStore from "./views/ShiftWorkChange/ShiftWorkChangeStore";
import SaleAssociateStore from "./views/SaleAssociate/SaleAssociateStore";
import DeliveryPlaceStore from "./views/DeliveryPlace/DeliveryPlaceStore";
import DeliveryPartnerStore from "./views/DeliveryPartner/DeliveryPartnerStore";
import LotStore from "./views/Lot/LotStore";
import _StoreRequestStore from "./views/StoreRequestStore/StoreRequestStore";
import CategoryTypeStore from "./views/CategoryType/CategoryTypeStore";
import ProductUsageStore from "./views/ProductUsage/ProductUsageStore";
import StoreOrganizationStore from "./views/StoreOrganization/StoreOrganizationStore";
import PackagingFormStore from "./views/PackagingForm/PackagingFormStore";
import CountryStore from "./views/Country/CountryStore";

export const store = {
    stockKeepingUnitStore: new StockKeepingUnitStore(),
    administrativeStore: new AdministrativeStore(),
    storeStore: new StoreStore(),
    stockInStore: new StockInStore(),
    stockOutStore: new StockOutStore(),
    productStore: new ProductStore(),
    inventoryReportStore: new InventoryReportStore(),
    supplierStore: new SupplierStore(),
    categoryStore: new CategoryStore(),
    inventoryByCategoryReportStore: new InventoryByCategoryReportStore(),
    detailsInventoryByProductStore: new DetailsInventoryByProductStore(),
    sourceStore: new SourceStore(),
    lotStore: new LotStore(),
    userStore: new UserStore(),
    inventoryUsageReportStore: new InventoryUsageReportStore(),
    activeIngredientStore: new ActiveIngredientStore(),
    biddingPackageStore: new BiddingPackageStore(),
    storeRequestStore: new StoreRequestStore(),
    originReportStore: new OriginReportStore(),
    ShiftworkStore: new ShiftworkStore(),
    customerStore: new CustomerStore(),
    staffStore: new StaffStore(),
    bankAccountStore: new BankAccountStore(),
    salesReportStore: new SalesReportStore(),
    bankStore: new BankStore(),
    shiftWorkChangeStore: new ShiftWorkChangeStore(),
    saleAssociateStore: new SaleAssociateStore(),
    DeliveryPlaceStore: new DeliveryPlaceStore(),
    DeliveryPartnerStore: new DeliveryPartnerStore(),
    _StoreRequestStore: new _StoreRequestStore(),
    categoryTypeStore: new CategoryTypeStore(),
    productUsageStore: new ProductUsageStore(),
    storeOrganizationStore: new StoreOrganizationStore(),
    packagingFormStore: new PackagingFormStore(),
    countryStore: new CountryStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
