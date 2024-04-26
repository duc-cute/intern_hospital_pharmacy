import { formatMoney, getDate } from 'app/common/Constant/LocalFunction';
import moment from 'moment';
import React, { memo } from 'react'

const PrintShiftHandover = (props, ref) => {
    const { data } = props;

    let ca = ""
    if (data?.shiftWork?.name) {
        ca += data?.shiftWork?.name;
        if (data?.shiftWork?.start && moment(data?.shiftWork?.start).isValid() &&
        data?.shiftWork?.end && moment(data?.shiftWork?.end).isValid()) {
          ca += ` (${moment(data?.shiftWork.start).format("HH:mm")} - ${moment(data?.shiftWork.end).format("HH:mm")})`
        } 
    }
    const totalStart = (Number(data?.cashStart) || 0) + (Number(data?.bankAmountStart) || 0)
    const totalEnd = (Number(data?.cashEnd) || 0) + (Number(data?.bankAmountEnd) || 0)

    return (
        <div className='d-none'>
            <section ref={ref}>
                <style>
                    {`
                   @media print {
                    @page {
                        margin: 0.5cm;
                    }
                   }
                `}
                </style>

                <h4 className='text-center mb-0 mt-9'>BV Mắt Bình Thuật</h4>
                <p className='text-center border-b-dashed py-9 mb-9'><b>Biên bản bàn giao ca</b></p>
                <section className='border-b-dashed flex-column py-11 gap-9'>
                    <p className='flex items-center justify-between'>
                        <span>Ngày làm việc</span>
                        <span>{getDate(data?.dateWork)}</span>
                    </p>
                    <p className='flex items-center justify-between'>
                        <span>Ca làm việc</span>
                        <span>{ca}</span>
                    </p>
                    <p className='flex items-center justify-between'>
                        <span>Nhân viên mở ca</span>
                        <span>{data?.startStaff?.displayName}</span>
                    </p>
                </section>

                <section className='border-b-dashed flex-column py-11 gap-9'>
                    <p className='flex items-center justify-between'>
                        <b>Tổng tiền đầu ca (1)</b>
                        <b>{formatMoney(totalStart, "")}</b>
                    </p>
                    <p className='flex items-center justify-between'>
                        <span>Tiền mặt đầu ca</span>
                        <span>{formatMoney(data?.cashStart, "")}</span>
                    </p>
                    <p className='flex items-center justify-between'>
                        <span>Tài khoản đầu ca</span>
                        <span>{formatMoney(data?.bankAmountStart, "")}</span>
                    </p>
                </section>

                <section className='border-b-dashed flex-column py-11 gap-9'>
                    <p className='flex items-center justify-between'>
                        <b>Tổng tiền trong ca (2)</b>
                        <b>{formatMoney(data?.totalSale - data?.totalReturn, "")}</b>
                    </p>
                    <p className='flex items-center justify-between'>
                        <span>Bán hàng</span>
                        <span>{formatMoney(data?.totalSale, "")}</span>
                    </p>
                    <p className='flex items-center justify-between'>
                        <span>Trả hàng</span>
                        <span>{formatMoney(data?.totalReturn, "")}</span>
                    </p>
                    <p className='flex items-center justify-between'>
                        <span>Phiếu thu</span>
                        <span>0</span>
                    </p>
                    <p className='flex items-center justify-between'>
                        <span>Phiếu chi</span>
                        <span>0</span>
                    </p>
                </section>
                <section className='border-b-dashed flex-column py-11 gap-9'>
                    <p className='flex items-center justify-between'>
                        <b>Tổng tiền cuối ca (3)=(1)+(2)</b>
                        <b>{formatMoney(totalEnd, "")}</b>
                    </p>
                </section>

                {/* <section className='border-b-dashed flex-column py-11 gap-9'>
                    <p className='flex items-center justify-between'>
                        <b>Phương thức thanh toán khác</b>
                        <b>0</b>
                    </p>

                    <p className='flex items-center justify-between'>
                        <span>Chuyển khoản</span>
                        <span>{formatMoney(data?.bankSale - data?.bankReturn, "")}</span>
                    </p>

                    <p className='flex items-center justify-between'>
                        <span>Thẻ</span>
                        <span>{formatMoney(data?.cardSale - data?.cardReturn, "")}</span>
                    </p>

                    <p className='flex items-center justify-between'>
                        <span>Điểm</span>
                        <span>0</span>
                    </p>
                </section> */}

                <p className='text-center mt-15'>Ngày {getDate(new Date(), "DD")} tháng {getDate(new Date(), "MM")} năm {getDate(new Date(), "YYYY")}</p>

                <p className='flex items-center justify-between mt-5'>
                    <p className='flex items-center justify-between'>
                        <span>Nhân viên đóng ca: </span>
                        <span>{data?.endStaff?.displayName}</span>
                    </p>
                </p>
            </section>
        </div>
    )
}

export default memo(React.forwardRef(PrintShiftHandover));