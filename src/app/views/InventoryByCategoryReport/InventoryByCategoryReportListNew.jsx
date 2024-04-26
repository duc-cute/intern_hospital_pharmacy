import React, { useEffect, useState } from "react";
import { useStore } from "app/stores";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";
import "./styles.scss";
import {
  PivotViewComponent,
  FieldList,
  CalculatedField,
  Inject,
} from "@syncfusion/ej2-react-pivotview";
// import { Form, Formik } from "formik";
// import GlobitsSelectInput from "app/common/form/GlobitsSelectInput";
// import LocalConstants from "app/LocalConstants";
import { Grid } from "@material-ui/core";

export default observer(function InventoryByCategoryReportList() {
  const { inventoryByCategoryReportStore } = useStore();
  const { t } = useTranslation();

  const { inventoryReportList } = inventoryByCategoryReportStore;

  const [pivotObj, setPivotObj] = useState(null);
  // const [currentMonth, setCurrentMonth] = useState(new Date());
  // const firsDateCurrentMonth = new Date(currentMonth).setDate(1);

  // const [listTimeSheetMonth, setListTimeSheetMonth] = useState([]);

  const dataSourceSettings = {
    dataSource: inventoryReportList,

    expandAll: false,
    // formatSettings: [
    //   { name: "workingDate", type: "date", format: "dd/MM/yyyy" },
    //   { name: "startTime", type: "date", format: "hh:mm a" },
    //   { name: "endTime", type: "date", format: "hh:mm a" },
    // ],
    rows: [
      { name: "productName", baseField: "productId" },
      // { name: "activity", baseField: "activityId" },
    ],
    columns: [{ name: "categoryName", baseField: "categoryId" }],
    values: [
      { name: "quantity", caption: "Tồn đầu kỳ", type: "Sum" },
      { name: "inQuantityInterm", caption: "Nhập kho", type: "Sum" },
      { name: "outQuantityInterm", caption: "Xuất kho", type: "Sum" },
      { name: "inventoryQuantity", caption: "Tồn cuối kỳ", type: "Sum" },
    ],
  };


  // useEffect(() => {
  //   let roles = localStorageService.getLoginUser()?.user?.roles?.map((item) => item.authority) || [];
  //   let auth = ["HR_MANAGER", "ROLE_ADMIN"];
  //   if (roles.some((role) => auth.indexOf(role) !== -1)) {
  //     loadAllTimeSheet(getAllTimesheet)
  //   } else {
  //     loadTimeSheet(searchTimeSheetDate)
  //   }
  //   eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [currentMonth]);

  // function loadAllTimeSheet(api) {
  //   api({ monthReport: currentMonth.getMonth() + 1, yearReport: currentMonth.getFullYear() }).then((response) => {
  //     setListTimeSheetMonth(response.data.length > 0 ? response.data : []);
  //   }).catch(() => {
  //     toast('Thất bại!', "Đã có lỗi xảy ra!");
  //     setListTimeSheetMonth([])
  //   })
  // }

  // function loadTimeSheet(api) {
  //   api({ monthReport: currentMonth.getMonth() + 1, yearReport: currentMonth.getFullYear() }).then((response) => {
  //     if (response != null && response.data != null) {
  //       setListTimeSheetMonth(response.data.items.length > 0 ? response.data.items : []);
  //     }

  //   }).catch(() => {
  //     toast('Thất bại!', "Đã có lỗi xảy ra!");
  //     setListTimeSheetMonth([])
  //   })
  // }

  // function handleChangeMonth(month, setFieldValue) {
  //   const firsDateCurrentMonthToDate = new Date(firsDateCurrentMonth);
  //   const date = new Date(firsDateCurrentMonthToDate.setMonth(month - 1));
  //   setCurrentMonth(date);
  //   setFieldValue("month", date.getMonth() + 1);
  //   setFieldValue("year", date.getFullYear());
  // }

  return (
    <>
      {/* <Formik
        enableReinitialize
        initialValues={{
          month: currentMonth.getMonth() + 1,
          year: currentMonth.getFullYear(),
        }}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "5px",
              }}
            >
              <div style={{ fontSize: 25, margin: 0, display: "flex" }}>
                <span style={{ margin: "0px 5px" }}> Tháng</span>
                <div style={{ width: "120px" }}>
                  <GlobitsSelectInput
                    name={"month"}
                    options={LocalConstants.ListMonth}
                    handleChange={({ target }) =>
                      handleChangeMonth(target.value, setFieldValue)
                    }
                  />
                </div>
                <span style={{ margin: "0px 5px" }}> năm</span>
                <div style={{ width: "120px" }}>
                  <GlobitsSelectInput
                    name={"year"}
                    options={LocalConstants.ListYear}
                    handleChange={({ target }) => {
                      setFieldValue("year", target.value);
                      setCurrentMonth(
                        new Date(currentMonth.setFullYear(target.value))
                      );
                    }}
                  />
                </div>
              </div>
            </Form>
          );
        }}
      </Formik> */}
      <Grid container spacing={1}>
        <Grid item md={12} xs={12}>
          <PivotViewComponent
            height={"100%"}
            width={"100%"}
            dataSourceSettings={dataSourceSettings}
            showFieldList={true}
            allowCalculatedField={true}
            ref={(d) => setPivotObj(d)}
            allowExcelExport={true}
          >
            <Inject services={[FieldList, CalculatedField]}></Inject>
          </PivotViewComponent>
        </Grid>
      </Grid>
    </>
  );
});
