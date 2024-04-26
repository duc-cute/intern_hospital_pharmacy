import { PaymentMethod, ProductType, StatusStoreRequest, TypeStatusTime } from "./LocalConstant";

export const LIST_PRODUCT_TYPE = [
    { name: "Thuốc", value: ProductType.DRUG },
    { name: "Vật tư y tế", value: ProductType.MEDICAL_SUPPLY },
    { name: "Trang thiết bị", value: 3 },
    { name: "Sinh phẩm", value: 4 }
];

// loại nhập kho
export const LIST_TRANSACTION_KIND_IN = [
    { name: "Nhập từ nhà cung cấp", value: 1 },
    // { name: "Nhập điều chuyển nội bộ", value: 2},
    { name: "Nhập lại", value: 3 },
    { name: "Nhập từ kho tuyến trên", value: 6 },
    { name: "Nhập từ kho cùng tuyến", value: 5 },
    { name: "Nhập từ kho tuyến dưới", value: 4 }
]

export const LIST_TRANSACTION_KIND_OUT = [
    // { name: "Xuất điều chuyển kho", value: -1},
    { name: "Xuất sử dụng", value: -2 },
    { name: "Xuất tới kho tuyến trên", value: 6 },
    { name: "Xuất tới kho cùng tuyến", value: 5 },
    { name: "Xuất tới kho tuyến dưới", value: 4 },
    { name: "Xuất khác", value: 7 },
]

export const END_OF_DAY_REPORT_CONCERN_TYPE = [
    { value: 1, name: "Bán hàng" },
    { value: 2, name: "Thu chi" },
    { value: 3, name: "Hàng hóa" },
    { value: 4, name: "Tổng hợp" },
]

export const REPORT_DISPLAY_TYPE = [
    { value: 1, name: "Biểu đồ" },
    { value: 2, name: "Báo cáo" },
]

export const PaymentMethodList = [
    { value: PaymentMethod.CASH, name: "Tiền mặt" },
    { value: PaymentMethod.BANK, name: "Chuyển khoản" },
    { value: PaymentMethod.CARD, name: "Thẻ" },
]

export const SALES_REPORT_CONCERN_TYPE = [
    { value: 1, name: "Thời gian" },
    { value: 2, name: "Lợi nhuận" },
    { value: 3, name: "Giảm giá HĐ" },
    { value: 4, name: "Trả hàng" },
    { value: 5, name: "Nhân viên" },
]

export const REPORT_TYPE_TIME = [
    { value: 1, name: "Hôm nay" },
    { value: 2, name: "Hôm qua" },
    { value: 3, name: "Tuần này" },
    { value: 4, name: "Tuần trước" },
    { value: 5, name: "7 ngày qua" },
    { value: 6, name: "Tháng này" },
    { value: 7, name: "Tháng trước" },
    { value: 8, name: "30 ngày qua" },
    { value: 9, name: "Quý này" },
    { value: 10, name: "Quý trước" },
    { value: 11, name: "Năm nay" },
    { value: 12, name: "Năm trước" },
]

export const LIST_PAYMENT_STATUS = [
    { name: "Thanh toán ngay", value: 0 },
    { name: "Ghi nợ nhà cung cấp", value: 1 },
]

export const INCOME_VIEW_BY = [
    { value: TypeStatusTime.TODAY, name: "Hôm nay" },
    { value: TypeStatusTime.YESTERDAY, name: "Hôm qua" },
    { value: TypeStatusTime.LAST_7_DAYS, name: "7 ngày qua" },
    { value: TypeStatusTime.THIS_MONTH, name: "Tháng này" },
    { value: TypeStatusTime.LAST_MONTHS, name: "Tháng trước" },
];

export const LIST_STATUS_STORE_REQUEST = [
    { value: StatusStoreRequest.WAIT, name: "Chờ xác nhận" },
    { value: StatusStoreRequest.BROWSER, name: "Đã xác nhận" },
    { value: StatusStoreRequest.REFUSE, name: "Từ chối" },
]