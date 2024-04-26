import { Icon, IconButton } from '@material-ui/core';
import GlobitsTable from 'app/common/GlobitsTable';
import { useStore } from 'app/stores';
import { observer } from 'mobx-react'
import React, { memo } from 'react'
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

const BankList = () => {
  const { t } = useTranslation();
  const {
    bankList,
    totalPages,
    totalElements,
    rowsPerPage,
    page,
    handleChangePage,
    setRowsPerPage,
    handleDelete,
    handleEditBank,
    handleSelectListBank,
  } = useStore().bankStore;

  let columns = [
    { 
      title: "Mã ngân hàng", 
      field: "code",
    },
    {
      title: "Tên rút gọn",
      field: "shortName",
    },
    {
      title: "Tên ngân hàng",
      field: "name",
    },
    {
      title: "Mã BIN",
      field: "bin",
    },
    {
      title: t("general.action"),
      align: "center",
      sorting: false,
      render: (rowData) => (
        <MaterialButton
          item={rowData}
          onSelect={(rowData, method) => {
            if (method === 0) {
              handleEditBank(rowData.id);
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
      // selection
      data={bankList}
      handleSelectList={handleSelectListBank}
      columns={columns}
      totalPages={totalPages}
      handleChangePage={handleChangePage}
      setRowsPerPage={setRowsPerPage}
      pageSize={rowsPerPage}
      pageSizeOption={[1, 2, 3, 5, 10, 25]}
      totalElements={totalElements}
      page={page}
    />
  );
}

export default memo(observer(BankList));