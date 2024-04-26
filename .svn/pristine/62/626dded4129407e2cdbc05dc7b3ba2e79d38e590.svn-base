import { Grid, Button, DialogContent, DialogActions, Checkbox } from "@material-ui/core";
import React from "react";
import SaveIcon from "@material-ui/icons/Save";
import BlockIcon from "@material-ui/icons/Block";
import moment from "moment";
import GlobitsPopup from "app/common/GlobitsPopup";
import GlobitsTable from "app/common/GlobitsTable";
import { toast } from "react-toastify";
import LocalConstants from "app/LocalConstants";
import { pagingSources } from "app/views/Source/SourceService";
import LotForm from "app/views/Lot/LotForm";
import { StoreContext } from "app/stores";
import { Form, Formik } from "formik";
import GlobitsPagingAutocomplete from "app/common/form/GlobitsPagingAutocomplete";
import GlobitsTextField from "app/common/form/GlobitsTextField";
import SearchIcon from "@material-ui/icons/Search";
import { observer } from "mobx-react";
import i18n from "i18n";
import { getDate } from "app/common/Constant/LocalFunction";
import { pagingProducts } from "app/views/Product/ProductService";

class SelectLotStockInPopup extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      selectedItem: props?.values?.items?.map(item => item?.lot) || [],
    };

    this.context = context;
    context.lotStore.searchObject.pageSize = 5;
    context.lotStore.handleChangeFormSearch({ checkSku: true, supplierId: props?.values?.supplier?.id });
  }

  handleClick = (item) => {
    let selected = this.state.selectedItem;
    const selectedIndex = selected.findIndex(e => e.id === item.id);

    if (selectedIndex === -1) {
      selected.push(item);

      if (item?.expiryDate && moment(item?.expiryDate).isBefore(moment(new Date()), "date")) {
        toast.warning(`Lô vừa chọn đã hết hạn sử dụng (Số lô: ${item?.batchCode})`)
      }
    } else {
      selected.splice(selectedIndex, 1);
    }

    this.setState({ selectedItem: selected });
  }

  componentWillUnmount() {
    this.context.lotStore.resetStore();
  }

  render() {
    const { selectedItem } = this.state;
    const { handleClose, handleSelect, open, arrayHelpers, storeLevel, kind } = this.props;
    const { searchObject, pageLot, handleChangeFormSearch, handleOpenForm } = this.context.lotStore;

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
            onSubmit={handleChangeFormSearch}
            initialValues={{ ...searchObject }}
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
                      multiple
                      name="sources"
                      disableClearable
                      label="Nguồn"
                      api={pagingSources}
                      onChange={(_, sources) => onChange('sources', sources)}
                      searchObject={kind === LocalConstants.ListStoreTransactionKindIn[0].value ? { levels: [storeLevel] } : {}}
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <GlobitsPagingAutocomplete
                      name="product"
                      disableClearable
                      label="Thuốc vật tư - y tế"
                      api={pagingProducts}
                      onChange={(_, product) => onChange('product', product)}
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

                  <Grid item xs={12} className="d-flex align-center">
                    <Button className="mt- btn btn-primary" onClick={() => handleOpenForm()}>Thêm lô mới</Button>
                  </Grid>

                  <Grid item xs={12} className="mt-16">
                    <GlobitsTable
                      doubleSidePagination={false}
                      data={pageLot?.content || []}
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
                              onChange={() => this.handleClick(rowData)}
                              value={rowData.id}
                              checked={selectedItem.some(e => e.id === rowData.id)}
                            />
                          )
                        },
                        { title: "Nguồn", field: "source.name", width: "150" },
                        { title: 'Thuốc - vật tư y tế', field: "product.name", align: "left", width: "150" },
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
                        { title: "Đơn vị tính", field: "stockKeepingUnit.name", width: "150" },
                        { title: "Quy cách đóng gói", field: "productSkuName", width: "150" },
                      ]}
                      totalPages={pageLot?.totalPages}
                      handleChangePage={(_, pageIndex) => handleChangeFormSearch({ pageIndex })}
                      setRowsPerPage={e => handleChangeFormSearch({ pageSize: e.target.value })}
                      pageSize={searchObject.pageSize}
                      totalElements={pageLot?.totalElements}
                      page={searchObject.pageIndex}
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

        <LotForm />
      </GlobitsPopup>
    );
  }
}

SelectLotStockInPopup.contextType = StoreContext;
export default observer(SelectLotStockInPopup);