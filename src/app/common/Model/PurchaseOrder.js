export class PurchaseOrder {
  code = "";
  dateOrder = null;
  type = null;		//Loại đơn hàng nhập
  supplier = null;
  totalAmount = null;
  totalAmountPayable = null;
  paymentStatus = null;	//Trạng thái thanh toán
  items = [];
  image = [];
  administrativeUnit = null;// đơn vị hành chính
  administrativeUnitProvince = null;
  administrativeUnitDistrict = null;
  saleOrder = null;	//trường hợp nhập lại kho cho đơn hàng bán nào bị hủy
}

export class PurchaseOrderItem {
  order = null;
  store = null;
  supplier = null;
  product = null;
  quantity = null;
  amount = null;
  unitPrice = null;
  discountRate = null;
  totalDiscount = null;
  totalAmountPayable = null;
  expiryDate = null;	//hạn sử dụng
  batchCode = "";	//Mã lô
  coefficient = null;
}