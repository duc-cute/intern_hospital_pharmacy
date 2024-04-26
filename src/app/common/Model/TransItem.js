export class TransItem {
    id = null
    amount = null;
    batchCode = null;
    coefficient = null;
    createDate = null;
    createdBy = null;
    defaultSku = null;
    expiryDate = null;
    lossReason = null;
    lot = null;
    modifiedBy = null;
    modifyDate = null;
    org = null;
    price = null;
    product = null;
    productSkuName = null;
    quantity = null;
    skus = null;
    source = null;
    stockKeepingUnit = null;
    storeTransaction = null;
    voided = null;
    voucherQuantity = null;
    voucherAmount = null;

    static convertFormLot = (lot) => {
        const value = Object.assign(new TransItem(), lot);
        value.id = null;
        value.lot = lot;
        value.lossReason = null;
        value.voucherQuantity = lot.quantity;
        return value;
    }

    static convertFormStoreTransaction = (storeTransaction) => {
        const value = { ...new TransItem(), confirmSkewed: true, ...storeTransaction };
        value.lot = { id: storeTransaction.lotId };
        value.product = {
            id: storeTransaction.productId,
            name: storeTransaction.productName,
            skus: storeTransaction.skus
        }

        value.stockKeepingUnit = {
            ...storeTransaction.stockKeepingUnit,
            id: storeTransaction.stockKeepingUnit.skuId,
            name: storeTransaction.stockKeepingUnit.skuName,
        }

        value.source = {
            id: storeTransaction.sourceId,
        }

        return value;
    }
}