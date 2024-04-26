import { Grid, Button, DialogContent, DialogActions, Checkbox } from "@material-ui/core";
import React from "react";
import SaveIcon from "@material-ui/icons/Save";
import BlockIcon from "@material-ui/icons/Block";
import moment from "moment";
import GlobitsPopup from "app/common/GlobitsPopup";
import GlobitsTable from "app/common/GlobitsTable";
import { pagingSources } from "app/views/Source/SourceService";
import { Form, Formik, FormikContext } from "formik";
import GlobitsPagingAutocomplete from "app/common/form/GlobitsPagingAutocomplete";
import GlobitsTextField from "app/common/form/GlobitsTextField";
import SearchIcon from "@material-ui/icons/Search";
import { observer } from "mobx-react";
import { getDate } from "app/common/Constant/LocalFunction";
import { pagingProducts } from "app/views/Product/ProductService";
import { StoreTransactionSearch } from "app/common/Model/SearchObject";
import { getStoreTransactions } from "app/views/Lot/LotService";
import GlobitsConfirmationDialog from "app/common/GlobitsConfirmationDialog";
import GlobitsAutocomplete from "app/common/form/GlobitsAutocomplete";
import i18n from "i18n";

class SelectStoreTransactionStockInPopup extends React.Component {
  static contextType = FormikContext;

  constructor(props, context) {
    super(props);
    this.state = {
      selectedItem: JSON.parse(JSON.stringify(context.values.items)) || [],
      storeTransactions: [],
      itemConfirm: null
    };

    this.getStoreTransactions({ ...new StoreTransactionSearch() })
  }

  handleClick = (item) => {
    let { selectedItem: selected = [], itemConfirm } = this.state
    const selectedIndex = selected.findIndex(e => e.id === item.id);

    if (selectedIndex === -1) {
      if (!itemConfirm && item.orderNumber !== 1 && item.orderNumber !== null) {
        if (selected.filter(e => e.productId === item.productId && e.orderNumber < item.orderNumber).length !== (item.orderNumber - 1)) {
          this.setState({ itemConfirm: item });
          return;
        }
      }

      selected.push({
        ...item,
        stockKeepingUnit: item.defaultSku,
        quantity: item.defaultSku.quantity,
        coefficient: item.defaultSku.coefficient
      });
    } else {
      selected.splice(selectedIndex, 1);
    }

    this.setState({ selectedItem: selected, openConfirm: false, itemConfirm: null });
  }

  getStoreTransactions = async (obj) => {
    obj.productId = obj.product?.id || null;
    obj.sourceId = obj.source?.id || null;

    const res = await getStoreTransactions(obj)
    this.setState({ storeTransactions: res?.data })
  }

  render() {
    const { selectedItem, storeTransactions, itemConfirm } = this.state;
    const { handleClose, handleSelect, open, arrayHelpers } = this.props;

    return (
      <GlobitsPopup
        open={open}
        handleClose={handleClose}
        titleHeader="Chọn lô"
        maxWidth="lg"
      >
        <DialogContent className="dialog-body">
          <Formik
            enableReinitialize
            onSubmit={this.getStoreTransactions}
            initialValues={{ ...new StoreTransactionSearch() }}
          >
            {({ submitForm, setFieldValue }) => {

              const onChange = (name, value) => {
                setFieldValue(name, value);
                submitForm();
              }

              return (
                <Grid container spacing={2} className="pt-12" component={Form}>
                  <Grid item xs={4}>
                    <GlobitsPagingAutocomplete
                      name="source"
                      label="Nguồn"
                      api={pagingSources}
                      onChange={(_, sources) => onChange('source', sources)}
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <GlobitsPagingAutocomplete
                      name="product"
                      label="Thuốc vật tư - y tế"
                      api={pagingProducts}
                      onChange={(_, product) => onChange('product', product)}
                      getOptionLabel={(option) => `${option?.name} ${option?.content?.trim() ? "(" + option.content + ")" : ""}`}
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <GlobitsTextField
                      name="keyword"
                      label={i18n.t("general.enter_search")}
                      InputProps={{
                        endAdornment: (
                          <button type="submit" className="btn-search p-0" >
                            <SearchIcon style={{ position: "absolute", top: "4px", right: "3px" }} />
                          </button>
                        )
                      }} />
                  </Grid>

                  <Grid item xs={12} className="flex flex-end mt-16" component='p'>
                    Tổng số bản ghi: {storeTransactions?.length || 0}
                  </Grid>

                  <Grid item xs={12} className="mt-16">
                    <GlobitsTable
                      noPagination
                      data={storeTransactions || []}
                      columns={[
                        {
                          title: "Chọn",
                          field: "custom",
                          align: "center",
                          width: 150,
                          render: (rowData) => (
                            <Checkbox
                              id={`radio${rowData.id}`}
                              name="radSelected"
                              value={rowData.id}
                              onChange={() => this.handleClick(rowData)}
                              checked={selectedItem.some(e => e.id === rowData.id)}
                            />
                          )
                        },
                        { title: "Nguồn", field: "sourceCode", width: "150" },
                        { title: 'Thuốc - vật tư y tế', field: "productName", align: "left", width: "150" },
                        { title: "Số lô", field: "batchCode", align: "left", width: "150" },
                        {
                          title: "Hạn sử dụng", field: "expiryDate", width: "150",
                          cellStyle: (index, rowData) => (
                            {
                              fontWeight: 500,
                              color: (rowData?.expiryDate && (moment(rowData?.expiryDate).isBefore(moment(new Date()), "date")) ? "red" : ((moment(rowData?.expiryDate).isSameOrBefore(moment(new Date()).add(6, "months"), "date")) ? "#fe851c" : "#000"))
                            }
                          ),
                          render: rowData => getDate(rowData?.expiryDate)
                        },
                        {
                          title: "Đơn vị tính", field: "skus", width: "174",
                          render: rowData => {
                            const indexItem = selectedItem.findIndex(e => e.id === rowData.id);

                            if (indexItem !== -1) {
                              return (
                                <GlobitsAutocomplete
                                  name='stockKeepingUnit'
                                  value={selectedItem[indexItem].stockKeepingUnit}
                                  options={rowData.skus}
                                  displayData="skuName"
                                  disableClearable
                                  handleChange={(_, value) => {
                                    const newListItem = JSON.parse(JSON.stringify(selectedItem));
                                    newListItem[indexItem].coefficient = value?.coefficient;
                                    newListItem[indexItem].quantity = value?.quantity;
                                    newListItem[indexItem].stockKeepingUnit = value;

                                    this.setState({ selectedItem: newListItem })
                                    rowData.defaultSku = value
                                  }}
                                />
                              )
                            }

                            return rowData.defaultSku.skuName
                          }
                        },
                        { title: "Quy cách đóng gói", field: "productSkuName", width: "150" },
                        {
                          title: "Số lượng",
                          field: "defaultSku.quantity",
                          width: "150",
                          render: rowData => parseInt(rowData?.defaultSku?.quantity) ? parseInt(rowData?.defaultSku?.quantity).toLocaleString() : 0
                        },
                      ]}
                      options={{
                        headerStyle: {
                          backgroundColor: "#3366ff",
                          color: "#fff",
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              )
            }}
          </Formik>
        </DialogContent>
        <DialogActions className="dialog-footer p-0 flex flex-end flex-middle">
          <Button
            startIcon={<BlockIcon />}
            variant="contained"
            className="mr-12 btn btn-secondary d-inline-flex"
            color="secondary"
            onClick={() => {
              handleClose()
            }}
          >
            {i18n.t("general.button.back")}
          </Button>
          <Button
            startIcon={<SaveIcon />}
            className="mr-0 btn btn-primary d-inline-flex"
            variant="contained"
            color="primary"
            onClick={() => handleSelect(selectedItem, arrayHelpers)}
          >
            {i18n.t("general.button.select")}
          </Button>
        </DialogActions>

        <GlobitsConfirmationDialog
          open={Boolean(itemConfirm)}
          onConfirmDialogClose={() => this.setState({ itemConfirm: null })}
          onYesClick={() => this.handleSelectedItem(itemConfirm)}
          title='Yêu cầu xác nhận'
          text={'Đây không phải lô hàng có hạn sử dụng gần nhất. Bạn có chắc chắn muốn xuất lô hàng này không!'}
          agree={i18n.t("confirm_dialog.delete.agree")}
          cancel={i18n.t("confirm_dialog.delete.cancel")}
          danger
        />
      </GlobitsPopup>
    );
  }
}

export default observer(SelectStoreTransactionStockInPopup);