import { Icon, IconButton } from '@material-ui/core';
import { getDate } from 'app/common/CommonFunctions';
import GlobitsTable from 'app/common/GlobitsTable';
import { useStore } from 'app/stores';
import { observer } from 'mobx-react'
import React from 'react'
import { useTranslation } from 'react-i18next';

const MaterialButton = (props) => {
  const { item, onSelect } = props;
  return (
    <div>
      <IconButton size="small" onClick={() => onSelect(item, 0)}>
        <Icon fontSize="small" color="primary">
          edit
        </Icon>
      </IconButton>
      <IconButton size="small" onClick={() => onSelect(item, 1)}>
        <Icon fontSize="small" color="error">
          delete
        </Icon>
      </IconButton>
    </div>
  );
}

export const SaleAssociateList = () => {
  const { t } = useTranslation();
  const {
    saleAssList,
    totalPages,
    totalElements,
    rowsPerPage,
    page,
    handleChangePage,
    setRowsPerPage,
    handleDelete,
    handleEditSaleAss,
    handleSelectListSaleAss,
  } = useStore().saleAssociateStore;

  let columns = [
    {
      title: t("saleAssociate.code"),
      field: "code",
      align: "center",
      width: "150",
    },
    {
      title: t("saleAssociate.displayName"),
      field: "displayName",
      align: "center",
      width: "150",
    },
    {
      title: t("saleAssociate.startTime"),
      field: "startTime",
      align: "center",
      width: "150",
      render: (rowData) => <>{getDate(rowData.startTime, "HH:mm")}</>
    },
    {
      title: t("saleAssociate.endTime"),
      field: "endTime",
      align: "center",
      width: "150",
      render: (rowData) => <>{getDate(rowData.endTime, "HH:mm")}</>
    },
    { title: t("saleAssociate.org"), field: "org.name", align: "left", width: "150" },
    {
      title: t("general.action"),
      align: "center",
      render: (rowData) => (
        <MaterialButton
          item={rowData}
          onSelect={(rowData, method) => {
            if (method === 0) {
              handleEditSaleAss(rowData.id);
            } else if (method === 1) {
              handleDelete(rowData.id);
            } else {
              alert("Call Selected Here:" + rowData.id);
            }
          }}
        />
      ),
    },
  ]

  return (
    <GlobitsTable
      selection
      data={saleAssList}
      handleSelectList={handleSelectListSaleAss}
      columns={columns}
      totalPages={totalPages}
      handleChangePage={handleChangePage}
      setRowsPerPage={setRowsPerPage}
      pageSize={rowsPerPage}
      pageSizeOption={[1, 2, 3, 5, 10, 25]}
      totalElements={totalElements}
      page={page}
    />
  )
}

export default observer(SaleAssociateList)