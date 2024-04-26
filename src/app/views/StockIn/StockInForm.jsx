/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Formik, Form } from "formik";
import { Grid, DialogActions, Button, DialogContent } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import BlockIcon from "@material-ui/icons/Block";
import { useTranslation } from "react-i18next";
import { useStore } from "../../stores";
import * as Yup from "yup";
import { observer } from "mobx-react";
// import GlobitsTextField from "../../common/form/GlobitsTextField";
import GlobitsPagingAutocomplete from "app/common/form/GlobitsPagingAutocomplete";
import { pagingStores } from "../Store/StoreService";
import { pagingSuppliers } from "../Supplier/SupplierService";
import GlobitsDateTimePicker from "app/common/form/GlobitsDateTimePicker";
import GlobitsSelectInput from "app/common/form/GlobitsSelectInput";
import LocalConstants from "app/LocalConstants";
import TransactionItems from "./Component/TransactionItems";
import GlobitsPopup from "app/common/GlobitsPopup";
import FormikFocusError from "app/common/form/FormikFocusError";
import { Check } from "@material-ui/icons";
import GlobitsTextField from "app/common/form/GlobitsTextField";
import SelectFromStore from "./Component/SelectFromStore";

export default observer(function StockInForm() {
  const { stockInStore } = useStore();
  const { t } = useTranslation();
  const {
    openFormStockIn,
    dataEditStockIn,
    handleClosePopup,
    handleSaveStockIn,
  } = stockInStore;

  const validationSchema = Yup.object({
    items: Yup.array().of(
      Yup.object({
        quantity: Yup.number()
          .nullable()
          .typeError("Không đúng định dạng")
          .test(
            'Is positive?',
            'Số lượng thực tế nhỏ hơn hoặc bằng số lượng theo chứng từ!',
            function (value) {
              if (this.from[0].value.voucherQuantity < value) return false;
              return true;
            }
          ),
        voucherQuantity: Yup.number().nullable().typeError("Không đúng định dạng"),
        price: Yup.number()
          .nullable()
          .typeError("Không đúng định dạng")
          .test(
            'Is positive?',
            'Phải nhập số >= 0',
            (value) => value >= 0
          )
      }).nullable(),
    ).nullable()
  });

  const title = dataEditStockIn?.id 
    ? 
    (<span>Thông tin lần nhập kho  {dataEditStockIn?.code ? <span style={{color: "#f7ba61"}}>(Mã nhập kho: {dataEditStockIn?.code})</span> : ""}</span>) 
    : 
    (t("general.button.add")) + " " + t("stockIn.title")

  return (
    <GlobitsPopup
      open={openFormStockIn}
      titleHeader={title}
      handleClose={handleClosePopup}
      noDiaLogContent
      id="stockin-form"
      maxWidth="xl"
    >
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={dataEditStockIn}
        onSubmit={handleSaveStockIn}
      >
        {({ values, setValues, setFieldValue }) => {
          const editable = values?.status !== LocalConstants.TRANSACTION_STATUS_NEW;
          return (
            <Form autoComplete="off">
              <FormikFocusError />
              <DialogContent className="dialog-body">
                <Grid container spacing={2}>
                  <Grid item md={3} sm={12} xs={12}>
                    <GlobitsPagingAutocomplete
                      variant="standard"
                      label={t("Kho nhập")}
                      name="toStore"
                      api={pagingStores}
                      disabled={!editable}
                      onChange={(_, valueToStore) => {
                        setFieldValue('toStore', valueToStore);
                        setFieldValue('fromStore', null);
                        
                      }}
                    />
                  </Grid>
                  <Grid item md={3} sm={12} xs={12}>
                    <GlobitsSelectInput
                      label={t("Loại nhập kho")}
                      name="kind"
                      keyValue="value"
                      variant="standard"
                      options={LocalConstants.ListStoreTransactionKindIn}
                      disabled={!editable}
                      handleChange={({ target }) => {
                        if (!target.value) {
                          setValues({ ...values, kind: null, fromStore: null, supplier: null });
                          return;
                        }
                        if (target.value === 2) {
                          setValues({ ...values, kind: target.value, fromStore: null });
                          return;
                        }
                        if(target.value !== 1){
                          setFieldValue('supplier',null);
                        }
                        setFieldValue('kind', target.value)
                        setFieldValue('fromStore',null);

                      }}
                    />
                  </Grid>
                  {values.kind > 3 && values?.toStore &&
                    <Grid item md={3} sm={12} xs={12}>
                      <SelectFromStore
                        editable={editable}
                        kind={values.kind}
                        toStoreId={values?.toStore?.id}
                      />
                    </Grid>
                  }
                  {values.kind === 1 &&
                    <Grid item md={3} sm={12} xs={12}>
                      <GlobitsPagingAutocomplete
                        variant="standard"
                        label={t("Nhà cung cấp")}
                        name="supplier"
                        api={pagingSuppliers}
                        disabled={!editable}
                      />
                    </Grid>
                  }
                  <Grid item md={3} sm={12} xs={12}>
                    <GlobitsDateTimePicker 
                      inputVariant="standard"
                      label={t("stockIn.dateIssue")} 
                      name="dateIssue" 
                      disabled={!editable}
                    />
                  </Grid>
                  <Grid item md={3} sm={12} xs={12}>
                    <GlobitsTextField
                      label={"Mã hóa đơn"}
                      variant="standard"
                      name="invoiceCode"
                      disabled={!editable}
                    />
                  </Grid>
                  <Grid item md={12} sm={12} xs={12}>
                    <TransactionItems editable={editable} />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions className="dialog-footer p-0">
                <div className="flex flex-space-between flex-middle">
                  <Button
                    startIcon={<BlockIcon />}
                    variant="contained"
                    className="mr-12 btn btn-secondary d-inline-flex"
                    color="secondary"
                    onClick={() => handleClosePopup()}
                  >
                    {/* {t("general.button.cancel")} */}
                    {t("general.button.back")}
                  </Button>
                  {
                    values?.status === LocalConstants.TRANSACTION_STATUS_NEW ?
                    <Button
                      startIcon={<Check />}
                      className="mr-0 btn btn-danger d-inline-flex"
                      type="submit"
                    >
                      Xác nhận
                    </Button>
                    :
                    <Button
                      startIcon={<SaveIcon />}
                      className="mr-0 btn btn-primary d-inline-flex"
                      type="submit"
                    >
                      {t("general.button.save")}
                    </Button>
                  }
                </div>
              </DialogActions>
            </Form>
          )
        }}
      </Formik>
    </GlobitsPopup>
  );
});
