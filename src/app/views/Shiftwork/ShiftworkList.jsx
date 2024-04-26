import { Icon, IconButton } from '@material-ui/core';
import { getDate } from 'app/common/CommonFunctions';
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

const ShiftworkList = () => {
  const { t } = useTranslation();
  const {
    shiftWorkList,
    totalPages,
    totalElements,
    rowsPerPage,
    page,
    handleChangePage,
    setRowsPerPage,
    handleDelete,
    handleEditShiftwork,
    handleSelectListShiftwork,
  } = useStore().ShiftworkStore;

  let columns = [
    { title: t("shiftWork.name"), field: "name", align: "center", width: "150" },
    {
      title: t("shiftWork.start"),
      field: "start",
      align: "center",
      width: "150",
      render: (rowData) => <>{getDate(rowData.start, "HH:mm")}</>
    },
    {
      title: t("shiftWork.end"),
      field: "end",
      align: "center",
      width: "150", 
      render: (rowData) => <>{getDate(rowData.end, "HH:mm")}</>
    },
    // { title: t("shiftWork.organization"), field: "organization", align: "left", width: "150" },
    {
      title: t("general.action"),
      align: "center",
      render: (rowData) => (
        <MaterialButton
          item={rowData}
          onSelect={(rowData, method) => {
            if (method === 0) {
              handleEditShiftwork(rowData.id);
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
      data={shiftWorkList}
      handleSelectList={handleSelectListShiftwork}
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

export default memo(observer(ShiftworkList));