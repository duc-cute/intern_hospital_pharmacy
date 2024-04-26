import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";
import GlobitsPopup from "app/common/GlobitsPopup";
import { Button, DialogActions, DialogContent, Grid } from "@material-ui/core";
import GlobitsSelectInput from "app/common/form/GlobitsSelectInput";
import GlobitsNumberInput from "app/common/form/GlobitsNumberInput";
import GlobitsTextField from "app/common/form/GlobitsTextField";
import GlobitsAutocomplete from "app/common/form/GlobitsAutocomplete";
import GlobitsDateTimePicker from "app/common/form/GlobitsDateTimePicker";
import { Block, Delete } from "@material-ui/icons";
import GlobitsConfirmationDialog from "app/common/GlobitsConfirmationDialog";
import LocalConstants from "app/LocalConstants";
import { useFormikContext } from "formik";
import { toast } from "react-toastify";

export default observer(function DetailSelectedItemPopup(props) {
  const { t } = useTranslation();
  const { open, data, handleClose, index, arrayHelpers, stockOut } = props;
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { values, setFieldValue } = useFormikContext();
  function handleChangeStockKeepingUnit(_, value) {
    if (!value) {
      return;
    }
    const newQuantity = Math.floor(data.quantity * data.coefficient / value.coefficient)
    const newItem = {
      ...data,
      stockKeepingUnit: { ...value, id: value.skuId, name: value.skuName },
      coefficient: value.coefficient,
      quantity: newQuantity,
      voucherQuantity: newQuantity
    }
    setFieldValue(`items[${index}]`, newItem);
  }
  function handleChangeVoucherQuantity(e) {
    const newItem = data;
    if (e.target.value === '') {
      newItem.voucherQuantity = null
      newItem.quantity = null
    } else {
      newItem.voucherQuantity = e.target.value
      newItem.quantity = e.target.value
    }
    setFieldValue(`items[${index}]`, newItem);
  }

  function handleChangeQuantity(e) {
    const newItem = data;
    if (e.target.value === '') {
      newItem.quantity = null
    } else {
      newItem.quantity = e.target.value;
    }

    if (Number(e.target.value) === newItem.voucherQuantity) {
      newItem.lossReason = null
    }

    if (e.target.value * data.coefficient % data.defaultSku.coefficient !== 0) {
      toast.warning('Số lượng thực tế đang lẻ so với qui cách đóng gói!')
    }
    setFieldValue(`items[${index}]`, newItem);
  }

  let displayContent = data?.product?.content
  if (displayContent && data?.product?.unit) {
    displayContent = displayContent + ` (${data.product.unit})`
  }

  return (
    <>
      <GlobitsPopup
        id="dialog-item-detail"
        open={open}
        handleClose={handleClose}
        titleHeader={"Thông tin chi tiết (" + data?.product?.name + ")"}
      >
        <DialogContent className="dialog-body pt-12">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4}>
              <GlobitsAutocomplete name={`items[${index}].product`} disabled label="Tên" />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <GlobitsTextField name={`items[${index}].product.activeIngredient`} disabled label="Hoạt chất" />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <GlobitsTextField value={displayContent} name={`items[${index}].product.contentDisplay`} disabled label="Hàm lượng" />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <GlobitsTextField name={`items[${index}].batchCode`} disabled label="Số lô" />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <GlobitsDateTimePicker name={`items[${index}].expiryDate`} disabled label="Hạn sử dụng" />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <GlobitsAutocomplete
                name={`items[${index}].stockKeepingUnit`}
                options={data?.skus || []}
                getOptionLabel={(option) => option?.skuName}
                handleChange={handleChangeStockKeepingUnit}
                label="Đơn vị tính"
                disableClearable
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <GlobitsTextField
                name={`items[${index}].coefficient`}
                value={values?.items[index]?.coefficient || null}
                disabled
                label="Quy cách đóng gói"
              />
            </Grid>
            {!stockOut &&
              <Grid item xs={12} md={6} lg={4}>
                <GlobitsNumberInput
                  name={`items[${index}].voucherQuantity`}
                  InputProps={{ inputProps: { min: 0 } }}
                  fullWidth
                  onChange={handleChangeVoucherQuantity}
                  label="Số lượng theo chứng từ"
                  disabled
                />
              </Grid>
            }
            <Grid item xs={12} md={6} lg={4}>
              <GlobitsNumberInput
                name={`items[${index}].quantity`}
                InputProps={{ inputProps: { min: 0, max: data?.voucherQuantity } }}
                onChange={handleChangeQuantity}
                fullWidth
                label={stockOut ? "Số lượng" : "Số lượng thực tế"}
                disabled
              />
            </Grid>
            {!stockOut &&
              <Grid item xs={12} md={6} lg={4}>
                <GlobitsSelectInput
                  name={`items[${index}].lossReason`}
                  options={LocalConstants.ListReasons}
                  // disabled={data?.quantity === data?.voucherQuantity}
                  keyValue='value'
                  label="Lý do chênh lệch"
                  disabled
                />
              </Grid>
            }
          </Grid>
        </DialogContent>
        <DialogActions className="dialog-footer p-0">
          <div className="flex flex-space-between flex-middle">
            <Button
              startIcon={<Block />}
              className="mr-12 btn btn-secondary d-inline-flex"
              variant="contained"
              onClick={handleClose}
            >
              {t("general.button.back")}
            </Button>
            <Button
              startIcon={<Delete />}
              className="btn btn-danger d-inline-flex"
              variant="contained"
              onClick={() => {
                setConfirmDelete(true)
              }}
            >
              {t("general.button.delete")}
            </Button>
          </div>
        </DialogActions>

      </GlobitsPopup>
      <GlobitsConfirmationDialog
        open={confirmDelete}
        onConfirmDialogClose={() => setConfirmDelete(false)}
        onYesClick={() => { arrayHelpers.remove(index); handleClose() }}
        title={t("confirm_dialog.delete.title")}
        text={t("confirm_dialog.delete.text")}
        agree={t("confirm_dialog.delete.agree")}
        cancel={t("confirm_dialog.delete.cancel")}
      />
    </>
  );
});
