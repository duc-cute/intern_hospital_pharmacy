import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";
import MaterialTable, { MTableToolbar } from 'material-table';

export default observer(function SourceItem(props) {
    const { t } = useTranslation();
    const { listSource } = props;

    let columns = [
        { title: t("source.name"), field: "source.name", align: "left", width: "150" },
        { title: t("source.nameAbbreviation"), field: "source.nameAbbreviation", width: "150" },
        // { title: t("source.nameEnglish"), field: "source.nameEnglish", width: "150" },
        // { title: t("source.nameEnglishAbbreviation"), field: "source.nameEnglishAbbreviation", width: "150" },
        
      ];

    return (
        <Grid container spacing={2}>
            <Grid item md={12} xs={12}>
                <MaterialTable
                    data={listSource}
                    columns={columns}
                    options={{
                        selection: false,
                        actionsColumnIndex: -1,
                        paging: false,
                        search: false,
                        rowStyle: rowData => ({
                            backgroundColor:
                                rowData.tableData.id % 2 === 1 ? '#EEE' : '#FFF',
                        }),
                        padding: 'dense',
                        toolbar: false,
                        draggable: false,
                    }}
                    localization={{
                        body: {
                          emptyDataSourceMessage: "Không có dữ liệu",
                        },
                    }}
                    components={{
                        Toolbar: props => (
                            <div style={{ witdth: '100%' }}>
                                <MTableToolbar {...props} />
                            </div>
                        ),
                    }}
                />
            </Grid>
        </Grid>
    );
});
