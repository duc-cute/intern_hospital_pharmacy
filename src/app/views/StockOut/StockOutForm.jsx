/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Formik, Form } from "formik";
import { Grid, DialogActions, Button, DialogContent } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import BlockIcon from "@material-ui/icons/Block";
import { useTranslation } from "react-i18next";
import { useStore } from "app/stores";
import * as Yup from "yup";
import { observer } from "mobx-react";
import GlobitsPagingAutocomplete from "app/common/form/GlobitsPagingAutocomplete";
import { pagingStores } from "../Store/StoreService";
import GlobitsDateTimePicker from "app/common/form/GlobitsDateTimePicker";
import GlobitsSelectInput from "app/common/form/GlobitsSelectInput";
import LocalConstants from "app/LocalConstants";
import TransactionItems from "./Component/TransactionItems";
import GlobitsPopup from "app/common/GlobitsPopup";
import GlobitsCheckBox from "app/common/form/GlobitsCheckBox";
import { Check } from "@material-ui/icons";
import GlobitsTextField from "app/common/form/GlobitsTextField";
import SelectToStore from "./Component/SelectToStore";
import { pagingAttributes } from "../Attribute/AttributeService";

export default observer(function StockOutForm() {
  const { stockOutStore } = useStore();
  const { t } = useTranslation();
  const {
    handleClosePopup,
    openFormStockOut,
    dataEditStockOut,
    handleSaveStockOut,
  } = stockOutStore;

  const validationSchema = Yup.object({
    items: Yup.array()
      .of(
        Yup.object({
          quantity: Yup.number()
            .nullable()
            .typeError("Không đúng định dạng")
            .test("Is positive?", "Phải nhập số >= 0", (value) => value >= 0),
          price: Yup.number()
            .nullable()
            .typeError("Không đúng định dạng")
            .test("Is positive?", "Phải nhập số >= 0", (value) => value >= 0),
        }).nullable()
      )
      .nullable(),
  });

  const title = dataEditStockOut?.id ? (
    <span>
      Thông tin lần xuất kho{" "}
      {dataEditStockOut?.code ? (
        <span style={{ color: "#f7ba61" }}>
          (Mã xuất kho: {dataEditStockOut?.code})
        </span>
      ) : (
        ""
      )}
    </span>
  ) : (
    t("general.button.add") + " " + t("stockOut.title")
  );

  return (
    <GlobitsPopup
      open={openFormStockOut}
      handleClose={handleClosePopup}
      titleHeader={title}
      noDiaLogContent
      id="stockout-form"
      maxWidth="xl"
    >
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={dataEditStockOut}
        onSubmit={(values) => handleSaveStockOut(values)}
      >
        {({ values, setFieldValue, setValues, errors }) => {
          const editable = values?.status !== LocalConstants.TRANSACTION_STATUS_NEW;
          return (
            <Form autoComplete="off">
              <DialogContent className="dialog-body">
                <Grid container spacing={2}>
                  {/* {values.code &&
                    <Grid item md={3} sm={12} xs={12}>
                      <GlobitsTextField
                        label={t("stockOut.code")}
                        variant="standard"
                        name="code"
                        disabled
                      />
                    </Grid>} */}
                  <Grid item md={3} sm={12} xs={12}>
                    <GlobitsPagingAutocomplete
                      variant="standard"
                      label={t("Kho xuất")}
                      name="fromStore"
                      api={pagingStores}
                      disabled={!editable}
                      onChange={(_, valueFromStore) => {
                        setFieldValue("fromStore", valueFromStore);
                        setFieldValue("toStore", null);
                      }}
                      // getOptionDisabled={(option) => {
                      //   //Kho TW, miền, tỉnh không có xuất sử dụng
                      //   if (values?.kind === LocalConstants.ListStoreTransactionKindOut[0].value) {
                      //     return option?.level === LocalConstants.STORE_LEVEL[0].value ||
                      //       option?.level === LocalConstants.STORE_LEVEL[1].value ||
                      //       option?.level === LocalConstants.STORE_LEVEL[2].value
                      //   }
                      //   //Xuất tuyến trên trừ kho cấp trung ương
                      //   if (values?.kind === LocalConstants.ListStoreTransactionKindOut[1].value) {
                      //     return option?.level === LocalConstants.STORE_LEVEL[0].value
                      //   }
                      //   //Xuất tuyến dưới trừ kho cấp huyện
                      //   if (values?.kind === LocalConstants.ListStoreTransactionKindOut[3].value) {
                      //     return option?.level === LocalConstants.STORE_LEVEL[3].value
                      //   }
                      //   //Xuất khác chỉ trung ương được chọn
                      //   if (values?.kind === LocalConstants.ListStoreTransactionKindOut[4].value) {
                      //     return !(option?.level === LocalConstants.STORE_LEVEL[0].value)
                      //   }
                      //   return false
                      // }}
                    />
                  </Grid>
                  <Grid item md={3} sm={12} xs={12}>
                    <GlobitsSelectInput
                      variant="standard"
                      label={t("stockOut.kind")}
                      name="kind"
                      keyValue="value"
                      options={LocalConstants.ListStoreTransactionKindOut}
                      getOptionLabel={(option) => option.name}
                      disabled={!editable}
                      handleChange={({ target }) => {
                        if (!target.value) {
                          setValues({
                            ...values,
                            kind: null,
                            toStore: null,
                          });
                          return;
                        }
                        if (target.value === LocalConstants.ListStoreTransactionKindOut[0].value) {
                          setValues({
                            ...values,
                            kind: target.value,
                            fromStore: null,
                            toStore: null,
                          });
                          // if (values?.fromStore?.level === LocalConstants.STORE_LEVEL[3].value) {
                          //   setValues({
                          //     ...values,
                          //     kind: target.value,
                          //     toStore: null,
                          //   });
                          // } else {
                          //   setValues({
                          //     ...values,
                          //     kind: target.value,
                          //     fromStore: null,
                          //     toStore: null,
                          //   });
                          // }
                          return;
                        }
                        setFieldValue("kind", target.value);
                        setFieldValue('toStore', null);
                      }}
                      // getOptionDisabled={(option) => {
                      //   //Kho cấp TW, miền, tỉnh không có xuất sử dụng
                      //   if (option?.value === LocalConstants.ListStoreTransactionKindOut[0].value) {
                      //     return values?.fromStore?.level === LocalConstants.STORE_LEVEL[0].value ||
                      //       values?.fromStore?.level === LocalConstants.STORE_LEVEL[1].value ||
                      //       values?.fromStore?.level === LocalConstants.STORE_LEVEL[2].value
                      //   }
                      //   //Xuất tuyến trên trừ kho cấp trung ương
                      //   if (option?.value === LocalConstants.ListStoreTransactionKindOut[1].value) {
                      //     return values?.fromStore?.level === LocalConstants.STORE_LEVEL[0].value
                      //   }
                      //   //Xuất tuyến trên trừ kho cấp huyện
                      //   if (option?.value === LocalConstants.ListStoreTransactionKindOut[3].value) {
                      //     return values?.fromStore?.level === LocalConstants.STORE_LEVEL[3].value
                      //   }
                      //   //Xuất khác chỉ trung ương được chọn
                      //   if (option?.value === LocalConstants.ListStoreTransactionKindOut[4].value) {
                      //     return !(values?.fromStore?.level === LocalConstants.STORE_LEVEL[0].value)
                      //   }
                      //   return false
                      // }}
                    />
                  </Grid>
                  {(values.kind === LocalConstants.ListStoreTransactionKindOut[1].value ||
                    values.kind === LocalConstants.ListStoreTransactionKindOut[2].value ||
                    values.kind === LocalConstants.ListStoreTransactionKindOut[3].value)
                    && values.fromStore && (
                      <Grid item md={3} sm={12} xs={12}>
                        <SelectToStore
                          editable={editable}
                          kind={values.kind}
                          fromStoreId={values.fromStore?.id}
                        />
                        {/* <GlobitsAutocomplete
                        variant="standard"
                        label={t("Kho nhập")}
                        name="toStore"
                        options={stockInOptions}
                        disabled={!editable}
                      /> */}
                      </Grid>
                    )}
                  {values?.kind === LocalConstants.ListStoreTransactionKindOut[4].value &&
                    <Grid item md={3} sm={12} xs={12}>
                      <GlobitsTextField
                        label={"Xuất khác, ghi rõ"}
                        variant="standard"
                        name="kindOther"
                        disabled={!editable}
                      />
                    </Grid>
                  }
                  <Grid item md={3} sm={12} xs={12}>
                    <GlobitsDateTimePicker
                      inputVariant="standard"
                      label={t("stockOut.dateIssue")}
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
                  {values?.kind === -2 && (
                    <>
                      <Grid item md={3} sm={12} xs={12}>
                        {/* <GlobitsCheckBox
                          name="stockOutForHealthInsurancePatient"
                          label="Cấp phát cho BN Bảo hiểm y tế"
                          disabled={!editable}
                        /> */}
                        <GlobitsPagingAutocomplete
                          variant="standard"
                          label={t("Loại hóa đơn")}
                          name="typeOfTransaction"
                          api={pagingAttributes}
                          disabled={!editable}
                          searchObject = {
                            {type: 5}
                          }
                        />
                      </Grid>
                    </>
                  )}
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
