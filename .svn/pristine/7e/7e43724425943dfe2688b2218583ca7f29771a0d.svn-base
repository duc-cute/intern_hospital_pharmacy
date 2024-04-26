import React from "react";
import SaveIcon from "@material-ui/icons/Save";
import BlockIcon from "@material-ui/icons/Block";
import {
  Dialog,
  DialogTitle,
  Icon,
  IconButton,
  Button,
  DialogContent,
  Grid,
  DialogActions,
  Checkbox,
} from "@material-ui/core";
import Draggable from "react-draggable";
import Paper from "@material-ui/core/Paper";
import { observer } from "mobx-react";
import GlobitsPagination from "app/common/GlobitsPagination";
import { pagingSources } from "../../Source/SourceService";
import MaterialTable from "material-table";

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

export default observer(class SourceSelectPopup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rowsPerPage: 5,
      page: 1,
      totalElements: 0,
      totalPages: 0,
      selectedItem: {},
      keyword: '',
      itemList: [],
      selectedValue: null,
    };
  }

  setPage = (page) => {
    this.setState({ page }, function () {
      this.updatePageData();
    });
  };

  setRowsPerPage = (event) => {
    this.setState(
      { rowsPerPage: event.target.value, page: 1 },
      function () {
        this.updatePageData();
      }
    );
  };

  handleChangePage = (event, newPage) => {
    this.setPage(newPage);
  };

  updatePageData = async () => {
    let searchObject = {
      pageIndex: this.state.page,
      pageSize: this.state.rowsPerPage,
      keyword: this.state.keyword,
    };
    let response = await pagingSources(searchObject);

    const { selectedItems } = this.state;

    let arr = response.data.content;
    let selectedArr = selectedItems;

    if (selectedArr && selectedArr.length > 0) {
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < selectedArr.length; j++) {
          if (arr[i].id === selectedArr[j].source.id) {
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
    const { selectedSources } = this.props;
    // console.log(selectedItems);
    this.setState({ selectedItems: selectedSources ? selectedSources : [] });
  }

  handleRowClick = (event, rowData) => {
    this.onSelectRows(rowData);
  }

  handleClickCheckBox = (rowData) => {
    this.onSelectRows(rowData);
  };

  onSelectRows = rowData => {
    const { selectedItems, itemList } = this.state;

    let rslts = itemList;
    const index = rslts.indexOf(rowData);
    
    let arr = [...selectedItems];

    rslts[index].tableData.checked = !rslts[index]?.tableData?.checked;

    if (rslts[index]?.tableData.checked) {
      arr.push({ source: rslts[index] });
    } else {
      arr = arr.filter((e) => e?.source.id !== rslts[index]?.id);
    }

    this.setState({ itemList: rslts, selectedItems: arr });

  }

  search = (obj) => {
    this.setState({ keyword: obj?.keyword }, () => this.updatePageData());
  };

  handleSelectData = () =>{
    let {selectedItems} = this.state;
    const { handleSelect } = this.props;
    if(selectedItems && selectedItems.length > 0){
      handleSelect(selectedItems);
    }else{
      handleSelect([]);
      // toast("Bạn cần chọn ít nhất một lựa chọn")
    }
  }

  render() {
    const { t, handleClose, open } = this.props;
    const { itemList } = this.state;

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
      open &&
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
          <span className="mb-20 text-white">Chọn nguồn</span>
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
              {/* <Grid item xs={7}></Grid> */}
              {/* <Grid item xs={5}>
                <GlobitsSearchInput search={this.search} />
              </Grid> */}
              <Grid item xs={12}>

                <MaterialTable
                  data={itemList}
                  columns={[
                    {
                      title: "Chọn", field: "check", ...cellConfigs,
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
                    { title: 'Tên tiếng Việt', field: "name", ...cellConfigs, },
                    { title: 'Tên viết tắt tiếng Việt', field: "nameAbbreviation", ...cellConfigs, },
                  ]}
                  onRowClick={this.handleRowClick}
                  options={{
                    selection: false,
                    actionsColumnIndex: -1,
                    paging: false,
                    search: false,
                    toolbar: false,
                    maxBodyHeight: "440px",
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
                  onClick={() => {
                    handleClose()
                  }}
                >
                  {t("general.button.cancel")}
                </Button>
                <Button
                  startIcon={<SaveIcon />}
                  className="mr-0 btn btn-primary d-inline-flex"
                  variant="contained"
                  color="primary"
                  // onClick={() => {
                  //   handleSelect(selectedItems)
                  // }}
                  onClick={ () => this.handleSelectData()}
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

