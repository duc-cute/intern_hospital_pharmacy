import React, { useState } from "react";
import { TextField, MenuItem, useTheme, useMediaQuery, Button } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { useTranslation } from "react-i18next";
import MenuBookIcon from '@material-ui/icons/MenuBook';
import PaginationOptionPopup from "./PaginationOptionPopup";

export default function GlobitsPagination({
    pageIndex = 1,
    pageSize = 10,
    setPageSize,
    setPageIndex,
    totalPages,
    pageSizeOption = [5, 10, 25, 50],
    totalElements,
}) {
    const { t } = useTranslation();

    const handleChangeSize = (event) => setPageSize(Number(event.target.value));
    const handleChangeIndex = (_, newValue) => setPageIndex(newValue);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const [openPopup, setOpenPopup] = useState(false);

    return (
        <section className="pagination-container">
            {!isMobile ? (
                <>
                    <p className="pagination-total-element">
                        Trình bày {(pageIndex - 1) * pageSize + (pageIndex === 1 ? 1 : 0)}-{pageIndex * pageSize} trong số {totalElements}
                    </p>
                    <div className="pagination-page-size">
                        {t("pageSize")}
                        <TextField
                            select
                            value={pageSize}
                            className="page-size-option"
                            onChange={handleChangeSize}
                        >
                            {pageSizeOption.map((option, index) => {
                                return (
                                    <MenuItem key={index} value={option}>
                                        {option}
                                    </MenuItem>
                                );
                            })}
                        </TextField>
                    </div>
                </>
            ) : (
                <>
                    <div item className="flex-center gap-2">
                        <p>{totalElements} bản ghi</p>
                        <Button className="btn-orange mw-none" onClick={() => setOpenPopup(true)}>
                            <MenuBookIcon fontSize="small" />
                        </Button>
                    </div>

                    <PaginationOptionPopup
                        open={openPopup}
                        handleClose={() => setOpenPopup(false)}
                        totalElements={totalElements}
                        setRowsPerPage={handleChangeSize}
                        pageSizeOption={pageSizeOption}
                        totalPages={totalPages}
                        handleChangePage={handleChangeIndex}
                        page={pageIndex}
                        pageSize={pageSize}
                    />
                </>
            )}

            <Pagination
                className="pagination-page-index"
                count={totalPages || 1}
                shape="rounded"
                page={pageIndex}
                color="primary"
                onChange={handleChangeIndex}
                boundaryCount={1}
                siblingCount={1}
                showFirstButton
                showLastButton
            />
        </section>
    );
}
