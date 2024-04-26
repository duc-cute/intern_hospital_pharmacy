export const PathModule = {
    MANAGE: 'manage',
    SALES: "sales",
}

export const StatusStoreRequest = {
    WAIT: 1,
    BROWSER: 2,
    REFUSE: 3,
}

export const ProductType = {
    DRUG: 1,
    MEDICAL_SUPPLY: 2
}

export const TransactionStatus = {
    WAIT_CONFIRM: 0,
    CONFIRMED: 1
}

export const PaymentMethod = {
    CASH: 'Cash',
    BANK: 'Bank',
    CARD: 'Card',
}

export const Gender = {
    MALE: "M",
    FEMALE: "F"
}

export const LevelAdministrative = {
    PROVINCE: 3,
    DISTRICTS: 4,
    WARD: 5
}

export const CustomerType = {
    COMPANY: 1,
    INDIVIDUAL: 2,
}

export const TypeProduct = {
    GLASSES: 6
}

export const TypeStatusTime = {
    TODAY: "1",
    YESTERDAY: "2",
    LAST_7_DAYS: "3",
    THIS_MONTH: "4",
    LAST_MONTHS: "5",
}

export const TypeTime = {
    BY_DATE: 1,
    BY_HOURS: 2,
    BY_WEEKS: 3,
}

export const StockInKind = {
    FROM_SUPPLIER: 1, // nhap tu nha cunh cap
    RETYPE: 3, // nhap lại
    FROM_UPPER_LINE_WAREHOUSE: 6, // Tu kho tuyen tren
    FROM_SAME_LINE_WAREHOUSE: 5, // Tu kho cung tuyen
    FROM_UNDERGROUND_WAREHOUSE: 4 // Tu kho tuyen duoi
}

export const ORG_PRODUCT_TYPE = [
    { value: "Medicine", name: "Thuốc" },
    { value: "MedicalSupplies", name: "Vật tư y tế" },
    { value: "Equipment", name: "Trang thiết bị, máy móc vật tư" },
    { value: "Biologics", name: "Sinh phẩm" },
    { value: "Restaurant", name: "Nhà hàng" },
    { value: "Fashion", name: "Thời trang" },
  ]
  