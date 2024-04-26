import React, { memo, useEffect, useMemo, useState } from 'react'
import FormikFocusError from 'app/common/form/FormikFocusError';
import { Form, Formik } from 'formik';
import * as Yup from "yup";
import { Grid, Button } from "@material-ui/core";
import GlobitsPagingAutocomplete from 'app/common/form/GlobitsPagingAutocomplete';
import { pagingStores } from 'app/views/Store/StoreService';
import LocalConstants from "app/LocalConstants";
import GlobitsSelectInput from 'app/common/form/GlobitsSelectInput';
import SelectFromStore from '../Component/SelectFromStore';
import { pagingSuppliers } from 'app/views/Supplier/SupplierService';
import GlobitsDateTimePicker from 'app/common/form/GlobitsDateTimePicker';
import GlobitsTextField from 'app/common/form/GlobitsTextField';
import TransactionItems from '../Component/TransactionItems';
import { useTranslation } from 'react-i18next';
import { useStore } from "app/stores";
import { StockIn } from 'app/common/Model/StockIn';
import { getStockIn } from '../StockInService';
import { NavLink } from 'react-router-dom';
import { toast } from "react-toastify";
import { getDefaultStore } from 'app/common/Constant/LocalFunction';
import { Check, Save, Block } from "@material-ui/icons";
import Config from "app/appConfig";
import { StockInKind } from 'app/common/Constant/LocalConstant';

const Index = () => {
  const { t } = useTranslation();
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  const { handleSaveStockIn } = useStore().stockInStore;

  const [stockIn, setStockIn] = useState({ ...new StockIn() });

  const validationSchema = Yup.object({
    items: Yup.array().of(
      Yup.object({
        quantity: Yup.number()
          .nullable()
          .typeError("Không đúng định dạng")
          .test('Is-positive?', 'Số lượng thực tế nhỏ hơn hoặc bằng số lượng theo chứng từ!', function (value) {
            return !(this.from[0].value.voucherQuantity < value)
          }),
        voucherQuantity: Yup.number().nullable().typeError("Không đúng định dạng"),
        price: Yup.number().nullable().typeError("Không đúng định dạng").test('Is-positive?', 'Phải nhập số >= 0', (value) => value >= 0)
      }).nullable(),
    ).nullable()
  });

  useEffect(() => {
    if (id) {
      getStockIn(id).then((res) => setStockIn(res?.data)).catch(() => toast.warning("toast.get_fail"));
    } else {
      const { store } = getDefaultStore();
      setStockIn({ ...new StockIn(), toStore: store })
    }
  }, [id]);

  const editable = useMemo(() => stockIn?.status !== LocalConstants.TRANSACTION_STATUS_NEW, [stockIn?.status])

  return (
    <Formik
      enableReinitialize
      initialValues={stockIn}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => handleSaveStockIn(values, true).then(() => setSubmitting(false))}
    >
      {({ values, setValues }) => (
        <Form autoComplete='off' className="cards-container">
          <FormikFocusError />
          <h4 className="cards-header">Nhập kho</h4>

          <Grid container spacing={2} className="cards-body">
            <Grid item md={3} xs={12}>
              <GlobitsPagingAutocomplete
                label="Kho nhập"
                name="toStore"
                api={pagingStores}
                disabled={!editable}
                onChange={(_, valueToStore) => setValues({ ...values, toStore: valueToStore, fromStore: null })}
              />
            </Grid>

            <Grid item md={3} xs={12}>
              <GlobitsSelectInput
                label="Loại nhập kho"
                name="kind"
                keyValue="value"
                options={LocalConstants.ListStoreTransactionKindIn}
                disabled={!editable}
                handleChange={({ target }) => {
                  if (target.value === values.kind) {
                    return;
                  }

                  const newValues = JSON.parse(JSON.stringify(values));
                  newValues.kind = target.value || null;
                  newValues.fromStore = null;
                  newValues.supplier = null;

                  setValues(newValues);
                }}
              />
            </Grid>

            {(![StockInKind.RETYPE, StockInKind.FROM_SUPPLIER].includes(values.kind) && values?.toStore) &&
              <Grid item md={3} xs={12}>
                <SelectFromStore editable={editable} kind={values.kind} toStoreId={values?.toStore?.id} />
              </Grid>
            }

            {values.kind === StockInKind.FROM_SUPPLIER &&
              <Grid item md={3} xs={12}>
                <GlobitsPagingAutocomplete label="Nhà cung cấp" name="supplier" api={pagingSuppliers} disabled={!editable} />
              </Grid>
            }

            <Grid item md={3} xs={12}>
              <GlobitsDateTimePicker label={t("stockIn.dateIssue")} name="dateIssue" disabled={!editable} />
            </Grid>

            <Grid item md={3} xs={12}>
              <GlobitsTextField label="Mã hóa đơn" name="invoiceCode" disabled={!editable} />
            </Grid>

            <Grid item xs={12}>
              <TransactionItems editable={editable} />
            </Grid>

            <Grid item xs={12} className="flex flex-center flex-middle gap-12">
              {values?.status === LocalConstants.TRANSACTION_STATUS_NEW ? (
                <Button startIcon={<Check />} className="btn btn-danger d-inline-flex" type="submit">
                  Xác nhận
                </Button>
              ) : (
                <Button startIcon={<Save />} className=" btn btn-primary d-inline-flex" type="submit">
                  {t("general.button.save")}
                </Button>
              )}

              <Button
                startIcon={<Block />}
                className="btn btn-secondary d-inline-flex"
                component={NavLink}
                to={Config.ROOT_PATH + "manage/stock-in"}
              >
                {t("general.button.back")}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}

export default memo(Index);