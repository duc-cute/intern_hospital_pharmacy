import React from "react";
import { Grid } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";
import MaterialTable, { MTableToolbar } from 'material-table';

export default observer(function Categoryitem(props) {
    const { t } = useTranslation();
    const { listCategory } = props;

    let columns = [
        { title: t("category.code"), field: "category.code", width: "150" },
        { title: t("category.name"), field: "category.name", width: "150" },
        { title: t("category.parent"), field: "category.parent.name", width: "150" }
    ];

    return (
        <Grid container spacing={2}>
            <Grid item md={12} xs={12}>
                <MaterialTable
                    data={listCategory}
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
