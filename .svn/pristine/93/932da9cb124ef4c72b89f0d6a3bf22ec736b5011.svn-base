import React, {memo} from "react";
import {Button, Grid} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import BlockIcon from "@material-ui/icons/Block";
import {useTranslation} from "react-i18next";
import {useStore} from "app/stores";
import {observer} from "mobx-react";
import PagingAutocomplete from "app/common/form/GlobitsPagingAutocomplete";
import DateTimePicker from "app/common/form/GlobitsDateTimePicker";
import {Check} from "@material-ui/icons";
import TextField from "app/common/form/GlobitsTextField";
import {pagingProducts} from "../Product/ProductService";
import Autocomplete from "app/common/form/GlobitsAutocomplete";
import {pagingSources} from "../Source/SourceService";
import {pagingBiddingPackages} from "../BiddingPackage/BiddingPackageService";
import {pagingSuppliers} from "../Supplier/SupplierService";
import PopupForm from "app/common/Component/Popup/PopupForm";
import {TransactionStatus} from "app/common/Constant/LocalConstant";

function LotForm() {
    const {t} = useTranslation();

    const {openForm, selectedLot, handleClosePopup, handleSaveLot} = useStore()?.lotStore;

    return (
        <PopupForm
            open={openForm}
            handleClose={handleClosePopup}
            title="Lô hàng"
            size="lg"
            formik={{
                enableReinitialize: true,
                initialValues: selectedLot,
                onSubmit: handleSaveLot
            }}
            action={({values, isSubmitting}) => (
                <div className="flex flex-middle gap-10">
                    <Button startIcon={<BlockIcon/>} className="btn-gray" onClick={() => handleClosePopup()}
                            disabled={isSubmitting}>
                        {t("general.button.back")}
                    </Button>

                    {values?.status === TransactionStatus.WAIT_CONFIRM ? (
                        <Button startIcon={<Check/>} className="btn-orange" type="submit" disabled={isSubmitting}>
                            Xác nhận
                        </Button>
                    ) : (
                        <Button startIcon={<SaveIcon/>} className="btn-orange" type="submit" disabled={isSubmitting}>
                            {t("general.button.save")}
                        </Button>
                    )}
                </div>
            )}
        >
            {({values, setValues}) => (
                <Grid container spacing={2}>
                    <Grid item md={4} xs={12}>
                        <PagingAutocomplete
                            label="Tên thuốc - vật tư y tế"
                            name="product"
                            api={pagingProducts}
                            getOptionLabel={option => option?.name + (option?.content ? `(${option.content})` : "")}
                            onChange={(_, product) => {
                                setValues({
                                    ...values,
                                    product,
                                    ingredients: product?.productActiveIngredientList?.length > 0 ? product?.productActiveIngredientList[0]?.ingredients : null,
                                    content: product?.productActiveIngredientList?.length > 0 ? product?.productActiveIngredientList[0]?.content : null,
                                })
                            }}
                        />
                    </Grid>

                    <Grid item md={4} xs={12}>
                        <TextField label="Số lô" name="batchCode"/>
                    </Grid>

                    <Grid item md={4} xs={12}>
                        <PagingAutocomplete label="Nguồn" name="source" api={pagingSources}/>
                    </Grid>

                    <Grid item md={4} xs={12}>
                        <DateTimePicker label="Hạn sử dụng" name="expiryDate"/>
                    </Grid>

                    <Grid item md={4} xs={12}>
                        <Autocomplete
                            label="Đơn vị tính"
                            name="stockKeepingUnit"
                            options={values.product?.skus || []}
                            getOptionLabel={(option) => option?.name ? option?.name : (option?.sku?.name || "")}
                            handleChange={(_, value) => {
                                setValues(prev => ({
                                    ...prev,
                                    stockKeepingUnit: value?.sku ? value?.sku : null,
                                    coefficient: value?.coefficient ? value?.coefficient : null
                                }))
                            }}
                        />
                    </Grid>

                    <Grid item md={4} xs={12}>
                        <TextField label="Quy cách đóng gói" type="number" name='coefficient' disabled/>
                    </Grid>

                    <Grid item md={4} xs={12}>
                        <PagingAutocomplete label="Gói thầu" name="biddingPackage" api={pagingBiddingPackages}/>
                    </Grid>

                    <Grid item md={4} xs={12}>
                        <PagingAutocomplete label="Nhà cung cấp" name="supplier" api={pagingSuppliers}
                                            searchObject={{"type": 0}}/>
                    </Grid>

                    <Grid item md={4} xs={12}>
                        <PagingAutocomplete label="Nhà sản xuất" name="producer" api={pagingSuppliers}
                                            searchObject={{"type": 1}}/>
                    </Grid>

                    <Grid item md={4} xs={12}>
                        <TextField label="Số lượng" name="quantity"/>
                    </Grid>
                </Grid>
            )}
        </PopupForm>
    );
};

export default memo(observer(LotForm));