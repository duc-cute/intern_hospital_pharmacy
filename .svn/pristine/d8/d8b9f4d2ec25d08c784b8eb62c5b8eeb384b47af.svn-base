import { getDate } from 'app/common/Constant/LocalFunction';
import { StoreRequest } from 'app/common/Model/StoreRequest';
import { useStore } from 'app/stores';
import { observer } from 'mobx-react'
import React, { memo, useState } from 'react'
import { useReactToPrint } from 'react-to-print';
import { Button } from "@material-ui/core";
import Print from 'app/common/Component/Print/Print';

function StoreRequestPrint() {
    const { selectedStoreRequest } = useStore().storeRequestStore;
    const [content, setContent] = useState(null)

    const handlePrint = useReactToPrint({
        content: () => content,
        documentTitle: "Phiếu kết quả xét nghiệm",
    });

    return (
        <>
            <Button className="btn-orange mr-2 btn-container" variant="contained" onClick={handlePrint}>
                <p className='btn-content'>In phiếu</p>
            </Button>
            <Print className='d-none' ref={(ref) => setContent(ref)}>
                <center>BỆNH VIỆN MẮT BÌNH THUẬN</center>
                <center className='text-22 mt-10'><strong>PHIẾU YÊU CẦU XUẤT KHO</strong></center>
                <p className='mt-5'>Mã phiếu: <b>{selectedStoreRequest?.code}</b></p>
                <p>Ngày yêu cầu: <b>{getDate(selectedStoreRequest?.dateIssue)}</b></p>
                <p>Phòng ban yêu cầu: <b>{selectedStoreRequest?.department?.name}</b></p>
                <center className='text-18'><strong>DANH SÁCH THUỐC - VẬT TƯ Y TẾ</strong></center>

                <table border="1" className='mt-5'>
                    <thead>
                        <tr>
                            <th align="center">Loại thuốc - vật tư y tế</th>
                            <th align="center">Tên thuốc - vật tư y tế</th>
                            <th align="center">Số lượng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedStoreRequest?.items?.map((item, index) => (
                            <tr key={index}>
                                <td align="left">{StoreRequest.getProductType(item?.productType)}</td>
                                <td align='left'>{item?.drug?.name || item?.medicalSupply?.name || ""}</td>
                                <td align='center'>{item?.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <section className='text-center pr-20 mt-10' style={{ width: "max-content", marginLeft: "auto" }}>
                    <p>Ngày {new Date().getDate()} tháng {new Date().getMonth() + 1} năm {new Date().getFullYear()}</p>
                    <p><strong>THỦ KHO</strong></p>
                </section>
            </Print>
        </>
    )
}

export default memo(observer(StoreRequestPrint));