/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, memo } from "react";
import {
  Grid,
  Button,
  IconButton,
  Icon,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { useFormikContext, FieldArray } from "formik";
import { useTranslation } from "react-i18next";
import AddIcon from "@material-ui/icons/Add";
import SelectLotStockInPopup from "./SelectLotStockInPopup";
import { toast } from "react-toastify";
import DetailSelectedItemPopup from "./DetailSelectedItemPopup";
import GlobitsAutocomplete from "app/common/form/GlobitsAutocomplete";
import GlobitsNumberInput from "app/common/form/GlobitsNumberInput";
import GlobitsSelectInput from "app/common/form/GlobitsSelectInput";
import { TransItem } from "app/common/Model/TransItem";
import { getDate } from "app/common/Constant/LocalFunction";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "10px",
    background: "#E4f5fc",
    padding: "10px 15px",
    borderRadius: "5px",
  },
  groupContainer: {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      borderRadius: "0!important",
    },
  },
  tableContainer: {
    background: "#fafafa",
    padding: "8px",
    marginTop: "16px",
    borderRadius: "12px",
    maxHeight: "50vh",
    minHeight: "30vh",
    overflowY: "auto",
    "*": {
      whiteSpace: "nowrap"
    }
  },
  tableHeader: {
    width: "100%",
    borderBottom: "1px solid #E3F2FD",
    marginBottom: "8px",
    "& th": {
      textAlign: 'center',
    },
  },
}));

const ListReasons = [
  { name: 'Nhầm lô', value: 'Nhầm lô', },
  { name: 'Nhầm số lượng', value: 'Nhầm số lượng', },
  { name: 'Vỡ do vận chuyển', value: 'Vỡ do vận chuyển' },
]

const Row = memo((props) => {
  const { index, arrayHelpers, rowData, editable } = props;
  const { values, setFieldValue } = useFormikContext();

  useEffect(() => {
    if (rowData.quantity === rowData.voucherQuantity) {
      setFieldValue(`items[${index}].lossReason`, null);
    }
  }, [rowData.quantity]);

  function handleChangeStockKeepingUnit(_, value) {
    const newQuantity = Math.floor(rowData.quantity * rowData?.coefficient / value?.coefficient);
    const newItem = {
      ...rowData,
      stockKeepingUnit: { ...value, id: value.skuId, name: value.skuName },
      coefficient: value?.coefficient,
      quantity: newQuantity,
      voucherQuantity: newQuantity,
      productSkuName: value?.productSkuName || value?.skuName
    }

    setFieldValue(`items[${index}]`, newItem);
  }

  function handleChangeVoucherQuantity(e) {
    const newItem = rowData;
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
    const newItem = { ...rowData, quantity: e.target.value || null };

    if (Number(newItem.quantity) === newItem.voucherQuantity) {
      newItem.lossReason = null
    }

    if ((Number(newItem.quantity) || 0) * (rowData?.coefficient || 0) % (rowData?.defaultSku?.coefficient || 0) !== 0) {
      toast.warning('Số lượng thực tế đang lẻ so với qui cách đóng gói!')
    }
    setFieldValue(`items[${index}]`, newItem);
  }

  const [openDetailItem, setOpenDetailItem] = useState({ isShow: false, data: {}, index: 0 });

  return (
    <TableRow key={index}>
      <TableCell>{rowData?.source?.name}</TableCell>
      <TableCell>{rowData?.product?.name}</TableCell>
      <TableCell>{rowData?.batchCode}</TableCell>
      <TableCell>{getDate(rowData?.expiryDate)}</TableCell>
      <TableCell>{rowData?.productSkuName}</TableCell>
      <TableCell>
        {editable ?
          <GlobitsAutocomplete
            name={`items[${index}].stockKeepingUnit`}
            options={rowData.skus || []}
            getOptionLabel={(option) => option.skuName}
            handleChange={handleChangeStockKeepingUnit}
            disableClearable
          />
          :
          rowData?.stockKeepingUnit?.skuName
        }
      </TableCell>
      <TableCell>
        {editable ?
          <GlobitsNumberInput
            name={`items[${index}].voucherQuantity`}
            InputProps={{ inputProps: { min: 0 } }}
            onChange={handleChangeVoucherQuantity}
          />
          :
          (rowData?.voucherQuantity ?? 0)
        }
      </TableCell>
      <TableCell>
        <GlobitsNumberInput name={`items[${index}].quantity`} InputProps={{ inputProps: { min: 0 } }} onChange={handleChangeQuantity} />
      </TableCell>
      <TableCell>
        <GlobitsSelectInput
          name={`items[${index}].lossReason`}
          options={ListReasons}
          disabled={rowData.quantity === rowData.voucherQuantity}
          value={values?.items[index].lossReason || null}
          keyValue='value'
        />
      </TableCell>
      <TableCell style={{ textAlign: "center" }}>
        {editable &&
          <IconButton
            size="small"
            onClick={() => setOpenDetailItem({ isShow: true, data: rowData, index: index })}
          >
            <Icon fontSize="small" color="error">
              delete
            </Icon>
          </IconButton>
        }

        {openDetailItem?.isShow &&
          <DetailSelectedItemPopup
            open={openDetailItem?.isShow}
            handleClose={() => setOpenDetailItem({ isShow: false, data: null })}
            data={openDetailItem?.data || null}
            index={openDetailItem?.index}
            arrayHelpers={arrayHelpers}
          />
        }
      </TableCell>
    </TableRow>
  )
})

function TransactionItems({ editable }) {
  const { t } = useTranslation();
  const classes = useStyles();
  const { values, setFieldValue } = useFormikContext();

  const [openSelectLot, setOpenSelectLot] = useState(false);

  function handleSelectLot(listItem) {
    if (Array.isArray(listItem) && listItem.length > 0) {
      const newItems = [];

      listItem.forEach(lot => {
        const item = values?.items?.find(item => item?.lot?.id === lot?.id);
        newItems.push(item ? item : TransItem.convertFormLot(lot));
      });

      setFieldValue('items', newItems);
      setOpenSelectLot(false);
    } else {
      toast.warning('Vui lòng chọn lô hàng muốn nhập!')
    }
  }

  const handleOpenSelectLot = () => {
    if (!values?.toStore) {
      toast.warn("Chưa chọn kho nhập");
      return;
    }

    if (!values?.kind) {
      toast.warn("Chưa chọn loại nhập kho");
      return;
    }
    setOpenSelectLot(true)
  }

  return (
    <FieldArray
      name="items"
      render={(arrayHelpers) => (
        <div className={`${classes.groupContainer} ${classes.root}`}>
          <Grid container>
            <Grid item xs={6}>
              <h5 className="m-0">{t("stockIn.items")}</h5>
            </Grid>

            {editable && (
              <Grid item xs={6}>
                <Button
                  className="ml-16 btn btn-primary d-inline-flex"
                  startIcon={<AddIcon />}
                  style={{ float: "right" }}
                  onClick={handleOpenSelectLot}
                >
                  Thêm thuốc - vật tư y tế
                </Button>
              </Grid>
            )}
          </Grid>

          <div className={classes.tableContainer}>
            <Table style={{ minWidth: "1400px" }}>
              <TableHead className={classes.tableHeader}>
                <TableRow>
                  <TableCell>Nguồn</TableCell>
                  <TableCell>Thuốc - vật tư y tế</TableCell>
                  <TableCell>Số lô</TableCell>
                  <TableCell>Hạn sử dụng</TableCell>
                  <TableCell>{t("stockIn.coefficient")}</TableCell>
                  <TableCell>{t("stockIn.stockKeepingUnit")}</TableCell>
                  <TableCell>Số lượng theo chứng từ</TableCell>
                  <TableCell style={{ color: "var(--primary)" }}>Số lượng thực tế</TableCell>
                  <TableCell style={{ color: "var(--primary)" }}>Lý do chênh lệch</TableCell>
                  <TableCell style={{ width: "55px", }}>{t("general.action")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className={classes.tableBody}>
                {values?.items?.map((item, index) => (
                  <Row
                    key={item.id || index}
                    index={index}
                    arrayHelpers={arrayHelpers}
                    rowData={item}
                    editable={editable}
                  />
                ))}
              </TableBody>
            </Table>
          </div>

          {openSelectLot && (
            <SelectLotStockInPopup
              open={openSelectLot}
              handleClose={() => setOpenSelectLot(false)}
              handleSelect={handleSelectLot}
              storeLevel={values?.toStore?.level}
              kind={values?.kind}
              values={values}
            />
          )}
        </div>
      )}
    />
  );
}

export default memo(TransactionItems)