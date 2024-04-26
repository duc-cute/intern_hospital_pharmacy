import {
  Button,
  Grid,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from "@material-ui/core";
import { FieldArray, useFormikContext } from "formik";
import React from "react";
import AddIcon from "@material-ui/icons/Add";
import GlobitsPagingAutocomplete from "app/common/form/GlobitsPagingAutocomplete";
import { pagingProducts } from "app/views/Product/ProductService";
import GlobitsNumberInput from "app/common/form/GlobitsNumberInput";
import { StoreRequest } from "app/common/Model/StoreRequest";
import GlobitsAutocomplete from "app/common/form/GlobitsAutocomplete";
import GlobitsSelectInput from "app/common/form/GlobitsSelectInput";
import { LIST_PRODUCT_TYPE } from "app/common/Constant/LocalConstantList";

export default function StoreRequestItems({ editable = true }) {
  const { values, setFieldValue } = useFormikContext();
  return (
    <FieldArray
      name="items"
      render={(arrayHelpers) => (
        <div>
          <Grid container>
            <Grid item xs={6}>
              <h5 className="m-0">Danh sách sản phẩm</h5>
            </Grid>
            <Grid item xs={6}>
              {editable && (
                <Button
                  className="mb-8 btn btn-primary d-inline-flex"
                  startIcon={<AddIcon />}
                  variant="contained"
                  style={{ float: "right" }}
                  onClick={() =>
                    arrayHelpers.push({
                      product: null,
                      quantity: "",
                      stockUnitCode: null,
                      productType: null,
                    })
                  }
                >
                  Thêm thuốc - vật tư y tế
                </Button>
              )}
            </Grid>
          </Grid>

          <div>
            <Table style={{ minWidth: "1200px" }}>
              <TableHead>
                <TableRow>
                  <TableCell>Sản phẩm</TableCell>
                  <TableCell width="20%">Loại sản phẩm</TableCell>
                  <TableCell width="10%">Số lượng</TableCell>
                  <TableCell width="10%">Đơn vị tính</TableCell>
                  <TableCell style={{ width: "55px" }}>Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {values?.items?.map((item, index) => (
                  <Row
                    index={index}
                    deleteRow={() => arrayHelpers.remove(index)}
                    rowData={item}
                    editable={editable}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    />
  );
}

const Row = ({ index, deleteRow, rowData, editable }) => {
  const { setFieldValue } = useFormikContext();

  function handleChangeQuantity(event) {
    const { value } = event.target;
    if (value === "") {
      setFieldValue(`items[${index}].quantity`, "");
      return;
    }

    // if (
    //   (value * rowData?.coefficient) % rowData?.defaultSku?.coefficient !==
    //   0
    // ) {
    //   toast.warning("Số lượng đang lẻ so với qui cách đóng gói!");
    // }

    setFieldValue(`items[${index}].quantity`, value);
  }

  // function handleChangeStockKeepingUnit(_, value) {
  //   const newItem = {
  //     ...rowData,
  //     stockKeepingUnit: {
  //       ...value,
  //       name: value.skuName,
  //       id: value?.skuId || value?.id,
  //     },
  //     quantity: Math.floor(
  //       (rowData.quantity * rowData?.coefficient) / value?.coefficient
  //     ),
  //   };

  //   setFieldValue(`items[${index}]`, newItem);
  // }

  return (
    <TableRow key={index}>
      <TableCell>
        {editable ? (
          <GlobitsPagingAutocomplete
            name={`items[${index}].product`}
            api={pagingProducts}
            disableClearable
            onChange={(_, value) => {
              setFieldValue(`items[${index}].product`, value);
              setFieldValue(`items[${index}].productType`, value?.productType || null);
            }}
          />
        ) : (
          rowData?.product?.name || rowData?.productName || ""
        )}
      </TableCell>
      <TableCell>
        {editable ? (
          <GlobitsSelectInput options={LIST_PRODUCT_TYPE} name={`items[${index}].productType`} />
        ) : (
          StoreRequest.getProductType(
            rowData?.product?.productType || rowData?.productType
          )
        )}
      </TableCell>
      <TableCell>
        {editable ? (
          <GlobitsNumberInput
            name={`items[${index}].quantity`}
            InputProps={{ inputProps: { min: 0 } }}
            onChange={handleChangeQuantity}
            notDefault
          />
        ) : (
          rowData?.quantity ?? 0
        )}
      </TableCell>
      <TableCell>
        {editable ? (
          <GlobitsAutocomplete
            name={`items[${index}].stockKeepingUnit`}
            options={rowData?.product?.skus || []}
            getOptionLabel={(option) => option?.sku?.code}
            // handleChange={handleChangeStockKeepingUnit}
            disableClearable
          />
        ) : (
          rowData?.stockKeepingUnit?.sku?.code
        )}
      </TableCell>
      <TableCell style={{ textAlign: "center" }}>
        {editable && (
          <IconButton size="small" onClick={deleteRow}>
            <Icon fontSize="small" color="error">
              delete
            </Icon>
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  );
};
