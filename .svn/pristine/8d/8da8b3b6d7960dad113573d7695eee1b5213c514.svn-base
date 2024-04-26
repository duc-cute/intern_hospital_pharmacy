export class SearchObject {
    keyword = "";
    id = null;
    pageIndex = 1;
    pageSize = 10;
    fromDate = null;
    toDate = null;
    date = null;
    basicInfo = false;
    sortName = null;//sort tên
    sortCode = null;//sort mã
    product = null;
    status = null;

    constructor(value) {
        Object.assign(this, value);
    }

    static checkSearchObject = (oldValue, newValue) => {
        const hasChangesPageSize = oldValue?.pageSize !== newValue?.pageSize;
        const hasChangesPageIndex = oldValue?.pageIndex !== newValue?.pageIndex;

        if ((!("pageSize" in newValue) || !hasChangesPageSize) && (!("pageIndex" in newValue) || !hasChangesPageIndex)) {
            oldValue = { ...oldValue, ...newValue, pageSize: oldValue.pageSize, pageIndex: 1 };
        } else if ("pageIndex" in newValue) {
            oldValue.pageIndex = newValue.pageIndex;
        } else if ("pageSize" in newValue) {
            oldValue.pageSize = newValue.pageSize;
            oldValue.pageIndex = 1;
        }

        return oldValue;
    }
}

export class InventorySearch extends SearchObject {
    quarter = null;
    year = null;
    productId = null;
    productIds = [];
    storeId = null;
    storeIds = [];
    lotId = null;
    lotIds = [];
    sourceId = null;
    sourceIds = [];
    checkSku = null;
    type = null; //1 = nhập kho,-1 = xuất kho 
    categoryId = null;
    categoryIds = [];
    groupByFields = [];
    productType = null;
    store = null;
    listProduct = [];

    constructor(value) {
        super(value);
        Object.assign(this, value);
    }
}

export class LotSearch extends SearchObject {
    sourceId = null;
    productId = null;
    checkSku = null;
    sourceIds = [];
    sources = [];
    expiryDateTo = null; // hạn sử dụng đến
    expiryDateFrom = null; // hạn sử dụng từ
    supplierId = null;

    constructor(value) {
        super(value);
        Object.assign(this, value);
    }
}

export class StoreSearch extends SearchObject {
    region = null;
    province = null;
    ward = null;
    district = null;
    administrativeUnitId = null;
    noParent = false;
    includeChild = false;
    excludeUserId = null;

    constructor(value) {
        super(value);
        Object.assign(this, value)
    }
}

export class StoreTransactionSearch {
     storeId = null;
	 type = null;
	 kind = null;
	 regionId = null;
	 provinceId = null;
	 wardId = null;
	 districtId = null;
	 notComplete = false; // hàng đang chuyển đến
	 stockOutRequired = false; // yêu cầu xuất kho
	 status = null;
}