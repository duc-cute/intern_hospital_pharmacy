/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
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
import GlobitsAutocomplete from "app/common/form/GlobitsAutocomplete";
import { toast } from "react-toastify";
import GlobitsNumberInput from "app/common/form/GlobitsNumberInput";
import DetailSelectedItemPopup from "app/views/StockIn/Component/DetailSelectedItemPopup";
import LocalConstants from "app/LocalConstants";
import SelectStoreTransactionStockInPopup from "./SelectStoreTransactionStockInPopup";
import { memo } from "react";
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

const Row = memo((props) => {
  const { index, arrayHelpers, rowData, editable } = props;
  const { setFieldValue } = useFormikContext();

  function handleChangeQuantity(event) {
    const { value } = event.target;
    if (value === '') {
      setFieldValue(`items[${index}].quantity`, null);
      return;
    }

    if (value * rowData?.coefficient % rowData?.defaultSku?.coefficient !== 0) {
      toast.warning('Số lượng đang lẻ so với qui cách đóng gói!')
    }

    setFieldValue(`items[${index}].quantity`, value)
  }

  function handleChangeStockKeepingUnit(_, value) {
    const newItem = {
      ...rowData,
      stockKeepingUnit: { ...value, name: value.skuName, id: value?.skuId || value?.id }, // vì object của stockeepingUnit là skus của rowData nên nếu lấy id thì k tìm đc bản ghi stockeepingunit
      coefficient: value.coefficient,
      quantity: Math.floor(rowData.quantity * rowData?.coefficient / value?.coefficient),
    }

    setFieldValue(`items[${index}]`, newItem);
  }

  const [openDetailItem, setOpenDetailItem] = useState({ isShow: false, data: {}, index: 0 });

  return (
    <TableRow key={index}>
      <TableCell>{rowData?.sourceCode || rowData?.source?.name}</TableCell>
      <TableCell>{rowData?.product?.name}</TableCell>
      <TableCell>{rowData?.batchCode}</TableCell>
      <TableCell>{getDate(rowData?.expiryDate)}</TableCell>
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
      <TableCell>{rowData?.productSkuName}</TableCell>
      <TableCell>
        {editable ?
          <GlobitsNumberInput
            name={`items[${index}].quantity`}
            InputProps={{ inputProps: { min: 0 } }}
            onChange={handleChangeQuantity}
          />
          :
          (rowData?.quantity ?? 0)
        }
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
            stockOut
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

  const [openSelectStoreTransaction, setOpenSelectStoreTransaction] = useState(false);

  function handleSelectStoreTransaction(listItem) {
    if (Array.isArray(listItem) && listItem.length > 0) {
      const newItems = [];

      listItem.forEach((storeTransaction, index) => {
        newItems.push(index > values?.items.length - 1 ? TransItem.convertFormStoreTransaction(storeTransaction) : values.items[index]);
      });

      setFieldValue('items', newItems);
      setOpenSelectStoreTransaction(false);
    } else {
      toast.warning('Vui lòng chọn lô hàng muốn xuất!')
    }
  }

  function handleOpenSelectStoreTransaction() {
    if (!values.kind) {
      toast.warning('Chưa có loại xuất kho!');
      return;
    }
    if (!values.fromStore) {
      toast.warning('Chưa có kho xuất!');
      return;
    }
    if ((values.kind === LocalConstants.ListStoreTransactionKindOut[1].value ||
      values.kind === LocalConstants.ListStoreTransactionKindOut[2].value ||
      values.kind === LocalConstants.ListStoreTransactionKindOut[3].value) && !values.toStore) {
      toast.warning('Chưa có kho đến!');
      return;
    }
    setOpenSelectStoreTransaction(true)
  }

  return (
    <FieldArray
      name="items"
      render={(arrayHelpers) => (
        <div className={`${classes.groupContainer} ${classes.root}`}>
          <Grid container>
            <Grid item xs={6}>
              <h5 className="m-0">{t("stockOut.items")}</h5>
            </Grid>
            <Grid item xs={6}>
              {editable &&
                <Button
                  className="ml-16 btn btn-primary d-inline-flex"
                  startIcon={<AddIcon />}
                  variant="contained"
                  style={{ float: "right" }}
                  onClick={handleOpenSelectStoreTransaction}
                >
                  Thêm thuốc - vật tư y tế
                </Button>
              }
            </Grid>
          </Grid>

          <div className={classes.tableContainer}>
            <Table style={{ minWidth: '1200px' }}>
              <TableHead className={classes.tableHeader}>
                <TableRow>
                  <TableCell>Nguồn</TableCell>
                  <TableCell>{t("stockIn.product")}</TableCell>
                  <TableCell>Số lô</TableCell>
                  <TableCell>Hạn sử dụng</TableCell>
                  <TableCell>{t("stockIn.stockKeepingUnit")}</TableCell>
                  <TableCell>{t("stockIn.coefficient")}</TableCell>
                  <TableCell>Số lượng</TableCell>
                  <TableCell style={{ width: "55px" }}>
                    {t("general.action")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className={classes.tableBody}>
                {values?.items?.map((item, index) => (
                  <Row
                    index={index}
                    arrayHelpers={arrayHelpers}
                    rowData={item}
                    editable={editable}
                  />
                ))}
              </TableBody>
            </Table>
          </div>

          {openSelectStoreTransaction && (
            <SelectStoreTransactionStockInPopup
              open={openSelectStoreTransaction}
              handleClose={() => setOpenSelectStoreTransaction(false)}
              handleSelect={handleSelectStoreTransaction}
            />
          )}
        </div>
      )}
    />
  );
}
export default memo(TransactionItems);