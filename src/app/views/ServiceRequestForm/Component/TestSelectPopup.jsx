import React from "react";
import SaveIcon from "@material-ui/icons/Save";
import { Formik, Form } from "formik";
import BlockIcon from "@material-ui/icons/Block";
import {
  Dialog,
  DialogTitle,
  Icon,
  IconButton,
  Button,
  DialogContent,
  Grid,
  Checkbox,
  DialogActions
} from "@material-ui/core";
import Draggable from "react-draggable";
import Paper from "@material-ui/core/Paper";
import { observer } from "mobx-react";
import GlobitsPagination from "app/common/GlobitsPagination";
import { pagingConcepts } from "../../Concept/ConceptService";
import MaterialTable from "material-table";
import SearchIcon from "@material-ui/icons/Search";
import GlobitsTextField from "app/common/form/GlobitsTextField";
import GlobitsSelectInput from "app/common/form/GlobitsSelectInput";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default observer(class DiagnosticSelectPopup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        conceptType : 1,
        rowsPerPage: 5,
        page: 1,
        totalElements: 0,
        totalPages: 0,
        selectedItems: [],
        keyword: '',
        itemList: [],
        selectedValue: '',
    };
  }

  ListConceptType = [
    { value: 1, name: "Xét nghiệm" }, //LAB_TEST
    { value: 4, name: "TÌm kiếm nghiên cứu hình ảnh" }, //IMAGE_STUDY_FINDING
  ];

  setPage = page => {
      this.setState({ page }, function () {
          this.updatePageData();
      })
  };

  setRowsPerPage = event => {
      this.setState({ rowsPerPage: event.target.value, page: 1 }, function () {
          this.updatePageData();
      })
  };

  handleChangePage = (event, newPage) => {
      this.setPage(newPage);
  };

  updatePageData = async () => {
      let searchObject = {
          pageIndex: this.state.page,
          pageSize: this.state.rowsPerPage,
          keyword: this.state.keyword,
          conceptType: this.state.conceptType,
      }

      let response = await pagingConcepts(searchObject);

      let { selectedItems } = this.state;

      let arr = response.data.content;
      let selectedArr = selectedItems;

      if (selectedArr && selectedArr.length > 0) {
          for (let i = 0; i < arr.length; i++) {
              for (let j = 0; j < selectedArr.length; j++) {
                  if (arr[i].id === selectedArr[j].concept.id) {
                      arr[i].tableData = { ...arr[i].tableData, checked: true };
                      arr[i].value = selectedArr[j].value;
                      break;
                  }
              }
          }
      }
      this.setState({
          itemList: arr,
          totalElements: response.data.totalElements,
          totalPages: response.data.totalPages,
      });
  };

  componentDidMount() {
      this.updatePageData();
  }

  componentWillMount() {
      let { selectedItems } = this.props;
      this.setState({ selectedItems: [...selectedItems] });
  }

  handleRowClick = (event, rowData) => {
      this.onSelectRows(rowData);
  }

  handleClickCheckBox = (rowData) => {
    this.onSelectRows(rowData);
  };

  onSelectRows = rowData => {
    let { selectedItems, itemList } = this.state;

    let rslts = itemList;
    const index = rslts.indexOf(rowData);
    let arr = selectedItems;

    rslts[index].tableData.checked = !rslts[index]?.tableData?.checked;

    if (rslts[index]?.tableData.checked) {
        arr.push({concept: rslts[index], value: ""});
    } else {
        arr = arr.filter((e) => e?.concept.id !== rslts[index]?.id);
    }

    this.setState({ itemList: rslts, selectedItems: arr }, () => {
      // if (rslts[index]?.tableData.checked) {
      //   document.getElementById(`value-${index}`).focus();
      // }
    });
  }

  search = (keyword,conceptType) => {
      this.setState({ keyword: keyword,
        conceptType : conceptType,}, () => this.updatePageData());
  };

  render() {
    const { t, handleClose, handleSelect, open } = this.props;
    let { itemList } = this.state;
    const cellConfigs = {
      width: "150", 
      align: "center",
      cellStyle: { 
        userSelect: "none",
        msUserSelect: "none",
        MozUserSelect: "none",
        WebkitUserSelect: "none",
      }
    }
    return (
      <Dialog
        className="dialog-container"
        open={open}
        PaperComponent={PaperComponent}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle
          className="dialog-header bgc-primary-d1"
          style={{ cursor: "move" }}
          id="draggable-dialog-title"
        >
          <span className="mb-20 text-white">Xét nghiệm</span>
          <IconButton
            style={{ position: "absolute", right: "10px", top: "10px" }}
            onClick={() => handleClose()}
          >
            <Icon color="disabled" title={t("general.close")}>
              close
            </Icon>
          </IconButton>
        </DialogTitle>

        <div className="dialog-body">
          <DialogContent>
            <Grid container spacing={2}>
            <Formik
              initialValues={this.state}
              onSubmit={(values) => this.search(values.keyword,values.conceptType)}
            >
              {({ isSubmitting, values, setFieldValue }) => (
                <Form style={{width:"100%"}} autoComplete="off">
                  <Grid container spacing={2} className="d-inline-flex">
                  <Grid item xs={4}>
                    <GlobitsSelectInput
                      label="Loại xét nghiệm"
                      name="conceptType"
                      keyValue="value"
                      options={this.ListConceptType}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <GlobitsTextField
                      label="Từ khóa tìm kiếm"
                      name="keyword"
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      variant="contained"
                      onClick={this.updatePageData}
                      startIcon={ <SearchIcon/>}
                      className="mr-0 btn btn-primary d-inline-flex"
                      color="primary"
                      type="submit"
                    >Tìm kiếm</Button>
                  </Grid>
                  </Grid>
                  
                </Form>
              )}

            </Formik>
            <Grid item xs={12} className="mt-16">

                <MaterialTable
                    data={itemList}
                    columns={[
                        { title: "Chọn", field: "check", ...cellConfigs,
                          render: (rowData) => {
                            return (
                              <Checkbox
                                checked={rowData?.tableData.checked ? true : false}
                                name="checked"
                                color="primary"
                              />
                            )
                          }
                        },
                        // { title: "Giá trị", field: "value", ...cellConfigs,
                        //   render: (rowData) => {
                        //     return (
                        //       rowData.tableData.checked &&
                        //       <TextField
                        //         id={`value-${rowData.tableData.id}`}
                        //         value={rowData?.value}
                        //         onClick={(e) => {
                        //           e.stopPropagation();
                        //         }}
                        //         onChange={(e) => {
                        //           if (rowData.tableData.checked){
                        //             const value = e.target.value;
                        //             itemList[rowData.tableData.id].value = value;
                        //             selectedItems.forEach((item, index) => {
                        //               if (rowData.id == item.concept.id) {
                        //                 selectedItems[index].value = value;
                        //                 this.setState({selectedItems})
                        //               }
                        //             })
                        //           }
                        //         }}
                        //       />
                        //     )
                        //   }
                        // },
                        { title: "Mã", field: "code", ...cellConfigs, },
                        { title: 'Tên', field: "name", ...cellConfigs, },
                        { title: 'Mô tả', field: "description", ...cellConfigs, },
                    ]}
                    onRowClick={this.handleRowClick}
                    // onSelectionChange={(rows, rowData) => {
                    //     this.handleClickCheckBox(rowData);
                    // }}
                    options={{
                        selection: false,
                        actionsColumnIndex: -1,
                        paging: false,
                        search: false,
                        toolbar: false,
                        maxBodyHeight: "440px",
                        headerStyle: {
                            backgroundColor: "#3366ff",
                            color: "#fff",
                        },
                        rowStyle: (rowData, index) => ({
                            backgroundColor: index % 2 === 1 ? 'rgb(237, 245, 251)' : '#FFF',
                        }),
                    }}
                    localization={{
                        body: {
                            emptyDataSourceMessage: "Không có dữ liệu",
                        },
                    }}
                />
                <GlobitsPagination
                    totalPages={this.state.totalPages}
                    handleChangePage={this.handleChangePage}
                    setRowsPerPage={this.setRowsPerPage}
                    pageSize={this.state.rowsPerPage}
                    pageSizeOption={[1, 2, 3, 5, 10, 25]}
                    totalElements={this.state.totalElements}
                    page={this.state.page}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <div className="dialog-footer">
            <DialogActions className="p-0">
              <div className="flex flex-space-between flex-middle">
                <Button
                  startIcon={<BlockIcon />}
                  variant="contained"
                  className="mr-12 btn btn-secondary d-inline-flex"
                  color="secondary"
                  onClick={() => handleClose()}
                >
                  {t("general.button.cancel")}
                </Button>
                <Button
                  startIcon={<SaveIcon />}
                  className="mr-0 btn btn-primary d-inline-flex"
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handleSelect(this.state.selectedItems)
                    handleClose();
                  }}
                >
                  {t("general.button.select")}
                </Button>
              </div>
            </DialogActions>
          </div>
        </div>
      </Dialog>
    );
  }
})
  
