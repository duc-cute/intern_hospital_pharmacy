import { Icon, IconButton } from '@material-ui/core';
import { formatMoney } from 'app/common/Constant/LocalFunction';
import GlobitsTable from 'app/common/GlobitsTable';
import { useStore } from 'app/stores';
import { observer } from 'mobx-react'
import moment from 'moment';
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next';

const MaterialButton = (props) => {
  const { item, onSelect } = props;
  return (
    <div>
      <IconButton size="small" onClick={() => onSelect(item, 0)}>
        <Icon fontSize="small" color="primary">
          visibility
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

const ShiftWorkChangeList = () => {
  const { t } = useTranslation();
  const {
    shiftWorkChangeList,
    totalPages,
    totalElements,
    rowsPerPage,
    page,
    handleChangePage,
    setRowsPerPage,
    handleDelete,
    handleEditShiftWorkChange,
    handleSelectListShiftWorkChange,
  } = useStore().shiftWorkChangeStore;

  let columns = [
    {
      title: "Ngày",
      field: "dateWork",
      render: row => (row?.dateWork && moment(row?.dateWork).isValid()) ? moment(row?.dateWork).format("DD/MM/YYYY") : ""
    },
    { 
      title: "Ca làm việc", 
      field: "name", 
      align: "center", 
      sorting: false,
      render: (row) => {
        let ret1 = row?.shiftWork?.name;
        let ret2 = ""
        if (row?.shiftWork?.start && moment(row?.shiftWork?.start).isValid() &&
        row?.shiftWork?.end && moment(row?.shiftWork?.end).isValid()) {
          ret2 += ` (${moment(row?.shiftWork.start).format("HH:mm")} - ${moment(row?.shiftWork.end).format("HH:mm")})`
        } 
        return (<>
          <div>{ret1}</div>
          <div>{ret2}</div>
        </>)
      }
    },
    {
      title: "Trạng thái",
      field: "open",
      render: row => row?.open ? "Mở" : "Đóng"
    },
    {
      title: "Nhân viên mở ca",
      field: "startStaff.displayName",
    },
    {
      title: "Tiền mặt đầu ca",
      field: "cashStart",
      render: row => formatMoney(row?.cashStart, "")
    },
    {
      title: "Tiền tài khoản đầu ca",
      field: "bankAmountStart",
      render: row => formatMoney(row?.bankAmountStart, "")
    },
    {
      title: "Tiền mặt cuối ca",
      field: "cashEnd",
      render: row => formatMoney(row?.cashEnd, "")
    },
    {
      title: "Tiền tài khoản cuối ca",
      field: "bankAmountEnd",
      render: row => formatMoney(row?.bankAmountEnd, "")
    },
    {
      title: "Nhân viên đóng ca",
      field: "endStaff.displayName",
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
              handleEditShiftWorkChange(rowData.id);
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
      data={shiftWorkChangeList}
      handleSelectList={handleSelectListShiftWorkChange}
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

export default memo(observer(ShiftWorkChangeList));