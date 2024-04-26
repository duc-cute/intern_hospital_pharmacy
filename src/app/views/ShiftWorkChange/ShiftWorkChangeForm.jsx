import React, { useRef } from "react";
import { Button, Grid } from "@material-ui/core";
import GlobitsPagingAutocomplete from "app/common/form/GlobitsPagingAutocomplete";
import GlobitsVNDCurrencyInput from "app/common/form/GlobitsVNDCurrencyInput";
import moment from "moment";
import { pagingStaffs } from "app/views/Staff/StaffService";
import PrintShiftHandover from "./PrintShiftHandover";
import { useReactToPrint } from "react-to-print";
import PopupForm from "app/common/Component/Popup/PopupForm";
import { formatMoney } from "app/common/Constant/LocalFunction";
import { PaymentMethod } from "app/common/Constant/LocalConstant";
import { observer } from "mobx-react";
import { useStore } from "app/stores";

export default observer(function CloseShiftWork(props) {
  const {
    handleClose,
    selectedShiftWorkChange,
    editShiftWorkChange
  } = useStore().shiftWorkChangeStore;
  const { open = true } = props;

  const content = useRef();

  const handlePrint = useReactToPrint({
    content: () => content.current,
    documentTitle: "Đóng ca làm việc",
  });

  let title = "Chi tiết ca làm việc";
  if (selectedShiftWorkChange?.dateWork && moment(selectedShiftWorkChange?.dateWork).isValid()) {
    title += ": " + moment(selectedShiftWorkChange?.dateWork).format("DD/MM/YYYY")
  }
  if (selectedShiftWorkChange?.shiftWork?.name) {
    title += " - " + selectedShiftWorkChange?.shiftWork?.name;
    if (selectedShiftWorkChange?.shiftWork?.start && moment(selectedShiftWorkChange?.shiftWork?.start).isValid() &&
      selectedShiftWorkChange?.shiftWork?.end && moment(selectedShiftWorkChange?.shiftWork?.end).isValid()) {
      title += ` (${moment(selectedShiftWorkChange?.shiftWork.start).format("HH:mm")} - ${moment(selectedShiftWorkChange?.shiftWork.end).format("HH:mm")})`
    }
  }

  return (
    <PopupForm
      size="lg"
      open={open}
      title={title}
      handleClose={handleClose}
      formik={{
        enableReinitialize: true,
        initialValues: selectedShiftWorkChange,
        onSubmit: editShiftWorkChange,
      }}
      action={() =>
        <>
          <Button
            variant="contained"
            className="mr-12 btn btn-secondary d-inline-flex"
            color="secondary"
            onClick={() => {
              handlePrint();
            }}
          >
            In phiếu bàn giao
          </Button>
        </>
      }
    >
      {({ values }) => {
        const cashSale = values?.salesOrders?.reduce((acc, m) =>
          (m?.paymentMethod === PaymentMethod.CASH ? acc + (m?.payedAmount || 0) : acc), 0
        ) || 0
        const bankSale = values?.salesOrders?.reduce((acc, m) =>
          (m?.paymentMethod === PaymentMethod.BANK ? acc + (m?.payedAmount || 0) : acc), 0
        ) || 0
        const cardSale = values?.salesOrders?.reduce((acc, m) =>
          (m?.paymentMethod === PaymentMethod.CARD ? acc + (m?.payedAmount || 0) : acc), 0
        ) || 0
        const totalSale = values?.salesOrders?.reduce((acc, m) => (acc + (m?.payedAmount || 0)), 0) || 0
        const cashReturn = values?.returnOrders?.reduce((acc, m) =>
          (m?.paymentMethod === PaymentMethod.CASH ? acc + (m?.totalAmountRefund || 0) : acc), 0
        ) || 0
        const bankReturn = values?.returnOrders?.reduce((acc, m) =>
          (m?.paymentMethod === PaymentMethod.BANK ? acc + (m?.totalAmountRefund || 0) : acc), 0
        ) || 0
        const cardReturn = values?.returnOrders?.reduce((acc, m) =>
          (m?.paymentMethod === PaymentMethod.CARD ? acc + (m?.totalAmountRefund || 0) : acc), 0
        ) || 0
        const totalReturn = values?.returnOrders?.reduce((acc, m) => (acc + (m?.totalAmountRefund || 0)), 0) || 0
        return (
          <>
            <p className="text-gray">
              {/* <span className="mr-16">
                Giờ mở ca: <b>{getDateTime(new Date())}</b>
              </span> */}
              <span className="mr-16">
                Nhân viên mở ca: <b>{values?.startStaff?.displayName}</b>
              </span>
            </p>

            <section className="mt-16 border-gray border-radius-4 p-12 flex items-center justify-between">
              <b>Đầu ca</b>
              <div className="flex gap-8">
                {values?.cashStart > 0 &&
                  <b className="text-blue">Tiền mặt: {formatMoney(values?.cashStart)}</b>
                }
                {values?.bankAmountStart > 0 &&
                  <b className="text-blue">Tiền tài khoản: {formatMoney(values?.bankAmountStart)}</b>
                }
              </div>
            </section>

            <section className="mt-16 border-gray border-radius-4 p-12">
              <p className="flex items-center justify-between mb-10">
                <b>Trong ca</b>
              </p>

              <div className="flex items-center m-w-full gap-8 mt-10">

                <div className="bg-light-gray p-10 w-25percent border-radius-8">
                  <p>
                    <b>Bán hàng</b> {values?.salesOrders?.length || 0} hóa đơn
                  </p>

                  <p className="p-6 flex items-center justify-between border-b-solid">
                    <span>1. Tiền mặt</span>
                    <span>{formatMoney(cashSale, "")}</span>
                  </p>

                  <p className="p-6 flex items-center justify-between border-b-solid">
                    <span>2. Chuyển khoản</span>
                    <span>{formatMoney(bankSale, "")}</span>
                  </p>

                  <p className="p-6 flex items-center justify-between border-b-solid">
                    <span>3. Thẻ</span>
                    <span>{formatMoney(cardSale, "")}</span>
                  </p>

                  <p className="p-6 flex items-center justify-between border-b-solid">
                    <span>4. Điểm</span>
                    <span>0</span>
                  </p>

                  <p className="p-6 flex items-center justify-between">
                    <b>Tổng thu</b>
                    <span>{formatMoney(totalSale, "")}</span>
                  </p>
                </div>
                <div className="bg-light-gray p-10 w-25percent border-radius-8">
                  <p>
                    <b>Trả hàng</b> {values?.returnOrders?.length || 0} hóa đơn
                  </p>

                  <p className="p-6 flex items-center justify-between border-b-solid">
                    <span>1. Tiền mặt</span>
                    <span className={cashReturn > 0 && "text-red"}>{cashReturn > 0 && "-"}{formatMoney(cashReturn, "")}</span>
                  </p>

                  <p className="p-6 flex items-center justify-between border-b-solid">
                    <span>2. Chuyển khoản</span>
                    <span className={bankReturn > 0 && "text-red"}>{bankReturn > 0 && "-"}{formatMoney(bankReturn, "")}</span>
                  </p>

                  <p className="p-6 flex items-center justify-between border-b-solid">
                    <span>3. Thẻ</span>
                    <span className={cardReturn > 0 && "text-red"}>{cardReturn > 0 && "-"}{formatMoney(cardReturn, "")}</span>
                  </p>

                  <p className="p-6 flex items-center justify-between border-b-solid">
                    <span>4. Điểm</span>
                    <span>-</span>
                  </p>

                  <p className="p-6 flex items-center justify-between">
                    <b>Tổng thu</b>
                    <span className={totalReturn > 0 && "text-red"}>{totalReturn > 0 && "-"}{formatMoney(totalReturn, "")}</span>
                  </p>
                </div>

                <div className="bg-light-gray p-10 w-25percent border-radius-8">
                  <p>
                    <b>Phiếu thu</b> 0 phiếu
                  </p>

                  <p className="p-6 flex items-center justify-between border-b-solid">
                    <span>1. Tiền mặt</span>
                    <span>0</span>
                  </p>

                  <p className="p-6 flex items-center justify-between border-b-solid">
                    <span>2. Chuyển khoản</span>
                    <span>0</span>
                  </p>

                  <p className="p-6 flex items-center justify-between border-b-solid">
                    <span>3. Thẻ</span>
                    <span>0</span>
                  </p>

                  <p className="p-6 flex items-center justify-between border-b-solid">
                    <span>4. Điểm</span>
                    <span>-</span>
                  </p>

                  <p className="p-6 flex items-center justify-between">
                    <b>Tổng thu</b>
                    <b>0</b>
                  </p>
                </div>

                <div className="bg-light-gray p-10 w-25percent border-radius-8">
                  <p>
                    <b>Phiếu chi</b> 0 phiếu
                  </p>

                  <p className="p-6 flex items-center justify-between border-b-solid">
                    <span>1. Tiền mặt</span>
                    <span>0</span>
                  </p>

                  <p className="p-6 flex items-center justify-between border-b-solid">
                    <span>2. Chuyển khoản</span>
                    <span>0</span>
                  </p>

                  <p className="p-6 flex items-center justify-between border-b-solid">
                    <span>3. Thẻ</span>
                    <span>0</span>
                  </p>

                  <p className="p-6 flex items-center justify-between border-b-solid">
                    <span>4. Điểm</span>
                    <span>-</span>
                  </p>

                  <p className="p-6 flex items-center justify-between">
                    <b>Tổng thu</b>
                    <b>0</b>
                  </p>
                </div>
              </div>
            </section>

            <section className="mt-16 border-gray border-radius-4 p-12">
              <p className="flex items-center justify-between mb-10">
                <b>Cuối ca</b>
              </p>
              <Grid container spacing={2}>
                <Grid item md={4} xs={12}>
                  <GlobitsPagingAutocomplete
                    label="Nhân viên đóng ca"
                    name="endStaff"
                    api={pagingStaffs}
                    requiredLabel
                    displayData="displayName"
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <GlobitsVNDCurrencyInput
                    label="Tiền mặt bàn giao thực tế"
                    name="cashEnd"
                    requiredLabel
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <GlobitsVNDCurrencyInput
                    label="Tiền tài khoản bàn giao thực tế"
                    name="bankAmountEnd"
                    requiredLabel
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <GlobitsVNDCurrencyInput
                    label="Tổng tiền"
                    name="total"
                    requiredLabel
                  />
                </Grid>

                {/* <Grid item md={4} xs={12}>
                  <GlobitsVNDCurrencyInput
                    label="Số tiền chêch lệch"
                    name="differenceAmount"
                  />
                </Grid> */}

                {/* <Grid item md={4} xs={12}>
                  <GlobitsTextField label="Ghi chú" name="note" />
                </Grid> */}
              </Grid>
            </section>

            <PrintShiftHandover
              ref={content}
              data={{
                ...values,
                cashSale,
                bankSale,
                cardSale,
                totalSale,
                cashReturn,
                bankReturn,
                cardReturn,
                totalReturn
              }}
            />
          </>
        );
      }}
    </PopupForm>
  );
})
