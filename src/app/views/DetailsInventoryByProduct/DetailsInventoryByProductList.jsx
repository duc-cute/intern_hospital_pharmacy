import React from "react";
import GlobitsTable from "../../common/GlobitsTable";
import { useStore } from "../../stores";
import { useTranslation } from "react-i18next";
import { IconButton, Icon } from "@material-ui/core";
import { observer } from "mobx-react";
import moment from "moment";
import LocalConstants from "app/LocalConstants";

function MaterialButton(props) {
  const { item } = props;
  return (
    <div>
      <IconButton size="small" onClick={() => props.onSelect(item, 0)}>
        <Icon fontSize="small" color="primary">
          visibility
        </Icon>
      </IconButton>
      {/* <IconButton size="small" onClick={() => props.onSelect(item, 1)}>
        <Icon fontSize="small" color="error">
          delete
        </Icon>
      </IconButton> */}
    </div>
  );
}

export default observer(function DetailsInventoryByProductList() {
  const { detailsInventoryByProductStore } = useStore();
  const { t } = useTranslation();

  const {
    detailsInventoryByProductList,
    totalPages,
    totalElements,
    rowsPerPage,
    page,
    handleChangePage,
    setRowsPerPage,
  } = detailsInventoryByProductStore;

  let columns = [
    { title: t("stockIn.code"), field: "storeTransaction.code", width: "150" },
    {
      title: t("stockIn.dateIssue"), field: "dateIssue", align: "center", width: "150",
      render: (rowData) => {
        return rowData?.storeTransaction?.dateIssue ? moment(rowData.storeTransaction.dateIssue).format("DD/MM/YYYY") : ""
      }
    },
    // {
    //   title: t("Loại"), field: "", align: "left", width: "150",
    //   render: rowData => {
    //     return LocalConstants.ListStoreTransactionType.find((e) => e.value === rowData?.storeTransaction?.type)?.name || ""
    //   }
    // },
    // {
    //   title: t("Loại nhập"), field: "", align: "left", width: "150",
    //   render: rowData => {
    //     return LocalConstants.ListStoreTransactionKindIn.concat(LocalConstants.ListStoreTransactionKindOut).find((e) => e.value === rowData?.storeTransaction?.kind)?.name || ""
    //   }
    // },
    {
      title: "Loại xuất - nhập kho", field: "", align: "left", width: "150",
      render: rowData => {
        return <span>
          {LocalConstants.ListStoreTransactionType.find((e) => e.value === rowData?.storeTransaction?.type)?.name || ""}{" "}
          ({LocalConstants.ListStoreTransactionKindIn.concat(LocalConstants.ListStoreTransactionKindOut).find((e) => e.value === rowData?.storeTransaction?.kind)?.name || ""})
        </span>
      }
    },
    {
      title: "Hạn sử dụng", field: "expiryDate", align: "center", width: "150",
      render: (rowData) => {
        return rowData?.expiryDate ? moment(rowData.expiryDate).format("DD/MM/YYYY") : ""
      }
    },
    {
      title: "Đơn vị tính", field: "stockKeepingUnit.name", align: "left", width: "150"
    },
    {
      title: "Số lượng", field: "quantity", align: "left", width: "150"
    },
    {
      title: "Đơn giá", field: "price", align: "right", width: "150",
      render: rowData => {
        return (
          <span>{rowData?.price?.toLocaleString() + " đ"}</span>
        )
      }
    },
    {
      title: "Thành tiền", field: "amount", align: "right", width: "150",
      render: rowData => {
        return (
          <span>{rowData?.amount?.toLocaleString() + " đ"}</span>
        )
      }
    },
    {
      title: "Quy cách đóng gói", field: "coefficient", align: "center", width: "150"
    },
  ];
  return (
    <GlobitsTable
      data={detailsInventoryByProductList}
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
});
