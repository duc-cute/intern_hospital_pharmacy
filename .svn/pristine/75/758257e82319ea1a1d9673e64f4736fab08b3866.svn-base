import React, { memo, useEffect, useMemo, useState } from 'react'
import FormikFocusError from 'app/common/form/FormikFocusError';
import { Form, Formik } from 'formik';
import * as Yup from "yup";
import { Grid, Button } from "@material-ui/core";
import GlobitsPagingAutocomplete from 'app/common/form/GlobitsPagingAutocomplete';
import { pagingStores } from 'app/views/Store/StoreService';
import LocalConstants from "app/LocalConstants";
import GlobitsSelectInput from 'app/common/form/GlobitsSelectInput';
import { useTranslation } from 'react-i18next';
import SelectToStore from '../Component/SelectToStore';
import GlobitsTextField from 'app/common/form/GlobitsTextField';
import GlobitsDateTimePicker from 'app/common/form/GlobitsDateTimePicker';
import TransactionItems from '../Component/TransactionItems';
import { Check, Save, Block } from "@material-ui/icons";
import { NavLink } from 'react-router-dom';
import Config from "app/appConfig";
import { StockIn } from 'app/common/Model/StockIn';
import { createGoodsIssueTransactionByRequestId, getStockOut } from '../StockOutService';
import { toast } from "react-toastify";
import { getDefaultStore } from 'app/common/Constant/LocalFunction';
import { useStore } from "app/stores";
import ChooseStoreRequestButton from '../Component/ChooseStoreRequestButton';

const Index = () => {
    const { t } = useTranslation();
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const storeRequestId = params.get('storeRequestId');

    const { handleSaveStockOut } = useStore().stockOutStore;

    const [stockIn, setStockIn] = useState({ ...new StockIn() });

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

    useEffect(() => {
        if (id) {
            getStockOut(id).then((res) => setStockIn(res?.data)).catch(() => toast.warning("toast.get_fail"));
        } else {
            const { store } = getDefaultStore();
            setStockIn({ ...new StockIn(), toStore: store })
        }
    }, [id]);

    useEffect(() => {
        if (storeRequestId) {
            console.log("🔥🔥🔥 ~ useEffect ~ storeRequestId:", storeRequestId)
            createGoodsIssueTransactionByRequestId(storeRequestId).then((res) => setStockIn(res?.data)).catch(() => toast.warning("toast.get_fail"));
        }
    }, [storeRequestId]);

    const editable = useMemo(() => stockIn?.status !== LocalConstants.TRANSACTION_STATUS_NEW, [stockIn?.status])

    return (
        <Formik
            enableReinitialize
            initialValues={stockIn}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => handleSaveStockOut(values, true).then(() => setSubmitting(false))}
        >
            {({ values, setValues }) => (
                <Form autoComplete='off' className="cards-container">
                    <FormikFocusError />
                    <h4 className="cards-header">Xuất kho</h4>

                    <Grid container spacing={2} className="cards-body">
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
                                        setValues({ ...values, kind: null, toStore: null });
                                        return;
                                    }

                                    if (target.value === LocalConstants.ListStoreTransactionKindOut[0].value) {
                                        setValues({ ...values, kind: target.value, fromStore: null, toStore: null });
                                        return;
                                    }

                                    setValues({ ...values, kind: target.value, toStore: null });
                                }}
                            />
                        </Grid>


                        <Grid item md={3} sm={12} xs={12}>
                            <GlobitsPagingAutocomplete
                                label="Kho xuất"
                                name="fromStore"
                                api={pagingStores}
                                disabled={!editable}
                                onChange={(_, valueToStore) => setValues({ ...values, fromStore: valueToStore, toStore: null })}
                            />
                        </Grid>

                        {([LocalConstants.ListStoreTransactionKindOut[1].value, LocalConstants.ListStoreTransactionKindOut[2].value, LocalConstants.ListStoreTransactionKindOut[3].value].includes(values.kind)
                            && values.fromStore) && (
                                <Grid item md={3} sm={12} xs={12}>
                                    <SelectToStore editable={editable} kind={values.kind} fromStoreId={values.fromStore?.id} />
                                </Grid>
                            )}

                        {values?.kind === LocalConstants.ListStoreTransactionKindOut[4].value &&
                            <Grid item md={3} sm={12} xs={12}>
                                <GlobitsTextField label="Xuất khác, ghi rõ" name="kindOther" disabled={!editable} />
                            </Grid>
                        }

                        <Grid item md={3} sm={12} xs={12}>
                            <GlobitsDateTimePicker label={t("stockOut.dateIssue")} name="dateIssue" disabled={!editable} />
                        </Grid>

                        <Grid item md={3} sm={12} xs={12}>
                            <GlobitsTextField label="Mã hóa đơn" name="invoiceCode" disabled={!editable} />
                        </Grid>

                        {!values?.id &&
                            <Grid item xs="auto">
                                <ChooseStoreRequestButton />
                            </Grid>
                        }

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
                                to={Config.ROOT_PATH + "manage/stock-out"}
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