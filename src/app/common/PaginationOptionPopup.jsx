import React from "react";
import {
  Dialog,
  DialogTitle,
  Icon,
  IconButton,
  DialogContent,
  MenuItem,
  Grid,
  TextField,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";

export default function PaginationOptionPopup(props) {
  const { t } = useTranslation();
  const {
    open,
    handleClose,
    setRowsPerPage,
    pageSizeOption,
    totalPages,
    handleChangePage,
    page,
  } = props;

  const [pageIndex, setPageIndex] = React.useState(page);
  const handleGo = (event) => {
    if (pageIndex < 1 || pageIndex > totalPages) {
      alert("Hãy nhập số từ 1 dến " + totalPages);
      return;
    }
    handleChangePage(event, Number(pageIndex));
  };

  const [pageSize, setPageSize] = React.useState(props.pageSize);

  const handleChange = (event) => {
    setRowsPerPage(event);
    setPageSize(event.target.value);
  };

  return (
    <Dialog className="dialog-container" open={open} fullWidth maxWidth="sm">
      <DialogTitle
        className="dialog-header"
        style={{ cursor: "move" }}
        id="draggable-dialog-title"
      >
        <span className="mb-20">{t("pagination.tool")}</span>
        <IconButton
          style={{ position: "absolute", right: "10px", top: "10px" }}
          onClick={() => handleClose()}
        >
          <Icon title={t("general.close")}>
            close
          </Icon>
        </IconButton>
      </DialogTitle>
      <DialogContent className="o-hidden">
        <Grid container={2}>
          <Grid item xs={6}>
            <div>
              <p>{t("general.rows_per_page")}</p>
              <TextField select value={pageSize} onChange={handleChange}>
                {pageSizeOption?.map((option, index) => (
                  <MenuItem value={option}>{option}</MenuItem>
                ))}
              </TextField>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div>
              <p>
                <span></span>
                {t("general.goto_page")}
              </p>
              <TextField
                type="number"
                name="pageIndex"
                value={pageIndex}
                onChange={(e) => setPageIndex(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleGo(e);
                  }
                }}
              />
            </div>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
