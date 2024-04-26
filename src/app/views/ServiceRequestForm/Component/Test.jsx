import { Grid, Button, IconButton, Icon, makeStyles } from "@material-ui/core";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import Config from "../../../common/GlobitsConfigConst";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import MaterialTable from "material-table";
import AddIcon from "@material-ui/icons/Add";
import TestSelectPopup from "./TestSelectPopup";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "12px",
  },
}));

function MaterialButton(props) {
  const { item } = props;
  return (
    <div>
      {/* <IconButton size="small" onClick={() => props.onSelect(item, 0)}>
        <Icon fontSize="small" color="primary">
          edit
        </Icon>
      </IconButton> */}
      <IconButton size="small" onClick={() => props.onSelect(item, 1)}>
        <Icon fontSize="small" color="error">
          delete
        </Icon>
      </IconButton>
    </div>
  );
}

export default observer(function Test(props) {
  const { t } = useTranslation();
  const classes = useStyles();
  const { items, setValueConcepts } = props;
  const [openCreatePopup, setOpenCreatePopup] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (items?.length > 0){
      setData(items);
    }
  }, [items])

  const handleSelect = (values) => {
    setData(values);
    setValueConcepts(values);
  }

  let columns = [
    {
      title: t("general.action"),
      ...Config.tableCellConfig,
      render: (rowData) => (
        <MaterialButton
          item={rowData}
          onSelect={(rowData, method) => {
            if (method === 0) {
              // data[rowData.tableData.id].edit = !rowData.edit;
              // handleSelect([...data]);
            } else if (method === 1) {
              const arr = data.filter((e) => e.concept.id !== rowData.concept.id);
              handleSelect([...arr]);
            } else {
              alert("Call Selected Here:" + rowData.id);
            }
          }}
        />
      ),
    },
    // {
    //   title: "Giá trị",
    //   field: "value",
    //   ...Config.tableCellConfig,
    //   render: (rowData) => {
    //     return (
    //       rowData.edit ?
    //       <TextField
    //         value={rowData?.value}
    //         onClick={(e) => {
    //           e.stopPropagation();
    //         }}
    //         onChange={(e) => {
    //           data[rowData.tableData.id].value = e.target.value;
    //           setData([...data])
    //         }}
    //       />
    //       :
    //       <>{rowData.value}</>
    //     )
    //   }
    // },
    {
      title: "Mã xét nghiệm",
      field: "concept.code",
      ...Config.tableCellConfig,
    },
    {
      title: "Tên xét nghiệm",
      field: "concept.name",
      ...Config.tableCellConfig,
    },
    // {
    //   title: "Mô tả",
    //   field: "concept.description",
    //   ...Config.tableCellConfig,
    // },
  ];
  return (
    <React.Fragment>
      <Grid container spacing={2} className={classes.root}>
        <Grid item md={12} sm={12} xs={12}>
          <Grid container spacing={3}>
            <Grid item md={12} sm={12} xs={12}>
              <Button
                className="mb-16 mr-16 btn btn-secondary d-inline-flex"
                startIcon={<AddIcon />}
                variant="contained"
                onClick={() => setOpenCreatePopup(true)}
              >
                Thêm/sửa xét nghiệm
              </Button>
            </Grid>

            <Grid item xs={12}>
              <MaterialTable
                data={data}
                columns={columns}
                options={{
                  selection: false,
                  actionsColumnIndex: -1,
                  paging: false,
                  search: false,
                  toolbar: false,
                  headerStyle: {
                    backgroundColor: "#e3f2fd",
                    paddingLeft: "5px",
                    paddingRight: "5px",
                    position: "sticky",
                  },
                  maxBodyHeight: "50vh"
                }}
                localization={{
                  body: {
                    emptyDataSourceMessage: `${t("general.emptyDataMessageTable")}`,
                  },
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {openCreatePopup &&
      <TestSelectPopup
        open={openCreatePopup}
        handleClose={() => setOpenCreatePopup(false)}
        t={t}
        selectedItems={data}
        handleSelect={handleSelect}
      />}
    </React.Fragment>
  );
});
