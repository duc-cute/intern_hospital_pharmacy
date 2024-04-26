import React from "react";
import { MenuItem, TextField } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import Popup from "../Popup/Popup";

function PaginationOptionPopup(props) {
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
    <Popup
      open={open}
      handleClose={handleClose}
      size="sm"
      title="Phân trang"
    >
      <TextField select value={pageSize} onChange={handleChange} fullWidth className="input-container" label={t("pageSize")}>
        {pageSizeOption.map((option, index) => (
          <MenuItem key={index} value={option}>{option}</MenuItem>
        ))}
      </TextField>

      <TextField
        label="Đi tới trang:"
        className="input-container mt-2"
        fullWidth
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
    </Popup>

  );
}

export default PaginationOptionPopup