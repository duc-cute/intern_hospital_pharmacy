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

const BankAccountList = () => {
  const { t } = useTranslation();
  const {
    bankAccountList,
    totalPages,
    totalElements,
    rowsPerPage,
    page,
    handleChangePage,
    setRowsPerPage,
    handleDelete,
    handleEditBankAccount,
    handleSelectListBankAccount,
  } = useStore().bankAccountStore;

  let columns = [
    {
      title: "Ngân hàng",
      field: "bank.name",
    },
    { 
      title: "Tên chủ thẻ", 
      field: "name",
    },
    {
      title: "Số tài khoản",
      field: "accountNumber",
    },
    {
      title: "Số thẻ",
      field: "cardCode",
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
              handleEditBankAccount(rowData.id);
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
      data={bankAccountList}
      handleSelectList={handleSelectListBankAccount}
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

export default memo(observer(BankAccountList));