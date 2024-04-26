import { ProductType, StatusStoreRequest } from "../Constant/LocalConstant";
import { LIST_PRODUCT_TYPE } from "../Constant/LocalConstantList";

export class StoreRequest {
    code = null;
    dateIssue = null;
    departmentCode = null;
    items = [];

    constructor(value) {
        Object.assign(this, value);

        if (this.items?.length > 0) {
            this.items = this.items.map(item => {
                const value = item;
                if (item?.productType === ProductType.MEDICAL_SUPPLY) {
                    value.productCode = value.productCode ? value.productCode : item?.medicalSupply?.code;
                    value.unitCode = value.unitCode ? value.unitCode : item?.medicalSupply?.unit?.code;
                } else if (item?.productType === ProductType.DRUG) {
                    value.productCode = value.productCode ? value.productCode : item?.drug?.code;
                    value.unitCode = value.unitCode ? value.unitCode : item?.drug?.unit?.code;
                }

                return value;
            })
        }
    }

    static getStatus(status) {
        if (!status || status === StatusStoreRequest.WAIT) {
            return "Chờ xác nhận"
        } else if (status === StatusStoreRequest.REFUSE) {
            return "Từ chối"
        } else if (status === StatusStoreRequest.BROWSER) {
            return "Đã xác nhận"
        }
    }

    static getProductType(type) {
        return LIST_PRODUCT_TYPE?.find(item => item.value === type)?.name
    }
}