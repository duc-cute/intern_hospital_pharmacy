import React, { useState, useEffect } from "react";
import {
  TextField,
  MenuItem,
  Grid,
  makeStyles,
  Button,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { useTranslation } from "react-i18next";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import PaginationOptionPopup from "./PaginationOptionPopup";
import MenuBookIcon from '@material-ui/icons/MenuBook';

const useStyles = makeStyles((theme) => ({
  paginationBar: {
    display: "flex",
    flexWrap: "nowrap",
    padding: "15px 7px",
    "& > div": {
      justifyContent: "flex-end"
    },
    "& > .Mui-selected": {
      color: "#fff",
      backgroundColor: "#2a80c8",
      borderColor: "#2a80c8",
    },
    "& > .Mui-selected::hover": {
      color: "#fff",
      backgroundColor: "#1f5f94",
      borderColor: "#1f5f94",
    },
    [theme.breakpoints.down("xs")]: {
      paddingTop: '24px !important',
    },
  },
  rowTool: {
    display: "flex",
    alignItems: "center",
    // width: "100%",
    "& > p": {
      margin: "5px 0px",
    },
    [theme.breakpoints.down("xs")]: {
      padding: '0px 24px !important'
    },
  },
  rowOptions: {
    marginLeft: "15px",
    "& > div::before": {
      content: "none",
    },
    "& > div::after": {
      content: "none",
    },
  },
  totalRows: {
    "& > p": {
      margin: 0,
      "& > span": {
        margin: "0px 12px 0px 6px",
        padding: "0px 12px 0px 6px",
        borderRight: "1px solid rgba(0, 0, 0, 0.15)",
        [theme.breakpoints.down("sm")]: {
          borderRight: "none",
        },
      },
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  pageGoto: {
    display: "flex",
    "& > p": {
      margin: 0,
      marginRight: "15px",
      paddingTop: "3px",
      "& > span": {
        margin: "0px 12px 0px 6px",
        borderRight: "1px solid rgba(0, 0, 0, 0.15)",
      },
    },
  },
  gotoInput: {
    width: "50px",
    "& > div::before": {
      content: "none",
    },
    "& > div::after": {
      content: "none",
    },
  },
  rowsPerPage: {
    display: "flex",
    alignItems: "center",
    "& > p": {
      margin: 0,
    },
  },
  pageSelector: {
    "& .MuiPagination-ul": {
      "& .MuiPaginationItem-root": {
        [theme.breakpoints.down("sm")]: {
          minWidth: "26px",
          margin: 0,
          padding: 0,
        },
      },
    },
  },
}));

export default function GlobitsPagination(props) {
  const { t } = useTranslation();
  const classes = useStyles();
  let {
    handleChangePage,
    totalPages,
    setRowsPerPage,
    pageSizeOption = [1, 2, 3, 5, 10, 25],
    totalElements,
    page,
    showOnlyPagination
  } = props;
  const [pageSize, setPageSize] = React.useState(props.pageSize);
  useEffect(() => {
    setPageSize(props.pageSize)
  }, [props.pageSize])
  const handleChange = (event) => {
    setRowsPerPage(event);
    setPageSize(event.target.value);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isExtraSmall = useMediaQuery(theme.breakpoints.down("xs"));

  const [openPopup, setOpenPopup] = useState(false);

  return (
    <div className={classes.paginationBar}>
      <Grid container spacing={2}>

        {!showOnlyPagination && (
          <>
            {!isMobile && (
              <Grid className={classes.rowTool} item xs={isExtraSmall ? 12 : 'auto'}>
                <div className={classes.totalRows}>
                  <p>
                    {t("general.total_rows")}
                    <span className={classes.totalRowsNum}>{totalElements}</span>
                  </p>
                </div>
                <div className={classes.rowsPerPage}>
                  <p>{t("general.rows_per_page")}</p>
                  <TextField
                    select
                    value={pageSize}
                    className={classes.rowOptions}
                    onChange={handleChange}
                  >
                    {pageSizeOption?.map((option, index) => {
                      return (
                        <MenuItem key={index} value={option}>
                          {option}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                </div>
              </Grid>
            )}

            {isMobile && (
              <>
                <Grid className={classes.rowTool} item xs={isExtraSmall ? 12 : 'auto'}>
                  <div className={classes.totalRows}>
                    <p>
                      {t("general.total_rows")}
                      <span className={classes.totalRowsNum}>{totalElements}</span>
                    </p>
                  </div>
                  <Button
                    className="btn btn-primary d-inline-flex"
                    startIcon={<MenuBookIcon />}
                    variant="contained"
                    onClick={() => setOpenPopup(true)}
                  />
                </Grid>

                <PaginationOptionPopup
                  open={openPopup}
                  handleClose={() => setOpenPopup(false)}
                  totalElements={totalElements}
                  setRowsPerPage={setRowsPerPage}
                  pageSizeOption={pageSizeOption}
                  totalPages={totalPages}
                  handleChangePage={handleChangePage}
                  page={page}
                  pageSize={pageSize}
                />
              </>
            )}
          </>
        )}

        <Grid className={classes.pageSelector} item xs={isExtraSmall ? 12 : 'auto'}
          style={isExtraSmall ? {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          } : {}
          }
        >
          <Pagination
            count={totalPages}
            shape="rounded"
            page={page}
            color="primary"
            onChange={handleChangePage}
            boundaryCount={1}
            siblingCount={1}
            showFirstButton
            showLastButton
          />
        </Grid>
      </Grid>
    </div>
  );
}
