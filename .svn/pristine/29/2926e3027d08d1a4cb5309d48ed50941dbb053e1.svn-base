import React, {useEffect, useState} from "react";
import {Button, makeStyles} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import BlockIcon from "@material-ui/icons/Block";
import {useTranslation} from "react-i18next";
import {useStore} from "app/stores";
import {observer} from "mobx-react";
import {toast} from "react-toastify";
import * as Yup from "yup";
import PopupForm from "app/common/Component/Popup/PopupForm";
import {ProductType} from "app/common/Constant/LocalConstant";
import ProductImage from "../Product/Tabs/ProductImage";
import ProductSku from "../Product/Component/ProductSkus";
import GeneralInformationTab from "./Tabs/GeneralInfomationTab";

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        width: "100%",
        minHeight: 350,
        "& .MuiTabs-indicator": {
            display: "none"
        }
    },
}));

const initialValues = {
    id: null,
    name: "",
    code: "",
    description: "",
    skus: [],
    categories: [],
    productType: ProductType.MEDICAL_SUPPLY,
    content: null,
    unit: null,
    ingredients: [],
    productActiveIngredientList: [],
    images: [],
    // activeIngredientObj: null
}

function MedicaSuppliesForm({handleAfterSubmit}) {
    const classes = useStyles();
    const {productStore} = useStore();
    const {t} = useTranslation();
    const {
        handleClose,
        editProduct,
        createProduct,
        selectedProduct,
        shouldOpenEditorDialog,
    } = productStore;

    const [medicaSupplies, setMedicaSupplies] = useState(initialValues);

    const validationSchema = Yup.object({
        code: Yup.mixed().nullable().required("Vui lòng nhập mã hàng trước khi lưu"),
        name: Yup.mixed().nullable().required("Vui lòng nhập tên hàng trước khi lưu"),
        categories: Yup.array().nullable().defined("Vui lòng chọn nhóm vật tư y tế")
    });

    useEffect(() => {
        if (selectedProduct) {
            setMedicaSupplies({...selectedProduct, ingredients: selectedProduct?.ingredients});
        } else {
            setMedicaSupplies(initialValues)
        }
    }, [selectedProduct]);

    async function handleSubmit(medicaSupplies, {setSubmitting}) {
        try {
            let i = 0;
            const images = medicaSupplies?.images?.reduce((acc, m) => {
                if (m?.image?.id) {
                    const newItem = {...m, sortNumber: i}
                    i++;
                    return [...acc, newItem]
                }
                return acc;
            }, [])

            let newMedicaSupplies = {...medicaSupplies, images, ingredients: medicaSupplies?.ingredients || null}

            if (!(medicaSupplies?.skus?.length > 0)) {
                toast.warn("Phải nhập ít nhất 1 đơn vị tính!")
                return;
            }

            if (!medicaSupplies.skus.some(e => e.isDefault)) {
                toast.warn("Phải chọn ít nhất 1 đơn vị tính là mặc định!")
                return;
            }

            if (!medicaSupplies.skus.some(e => Number(e.coefficient) === 1)) {
                toast.warn("Phải chọn ít nhất 1 đơn vị có quy cách đóng gòi bằng 1!")
                return;
            }

            // if (medicaSupplies.categories?.length > 1) {
            //   newMedicaSupplies.categories = [medicaSupplies.categories[0]]
            // }

            let res;
            if (medicaSupplies.id) {
                res = await editProduct(newMedicaSupplies);
            } else {
                res = await createProduct(newMedicaSupplies);
            }
            if (handleAfterSubmit) {
                handleAfterSubmit(res?.data)
            }
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <PopupForm
            title={"Thông tin vật tư y tế"}
            open={shouldOpenEditorDialog}
            handleClose={handleClose}
            noDiaLogContent
            size={"lg"}
            formik={{
                validationSchema: validationSchema,
                enableReinitialize: true,
                initialValues: medicaSupplies,
                onSubmit: handleSubmit,
            }}
            action={({isSubmitting}) => (
                <div className="flex flex-space-between flex-middle gap-12">
                    <Button
                        type="submit"
                        startIcon={<SaveIcon/>}
                        className="btn btn-primary d-inline-flex"
                        disabled={isSubmitting}
                    >
                        {t("general.button.save")}
                    </Button>
                    <Button
                        startIcon={<BlockIcon/>}
                        className="btn btn-secondary d-inline-flex"
                        disabled={isSubmitting}
                        onClick={handleClose}
                    >
                        {t("general.button.cancel")}
                    </Button>
                </div>
            )}
            id="medicaSuppliesForm"
        >
            <div className={classes.root} style={{maxHeight: "70vh"}}>
                <GeneralInformationTab/>
                <ProductImage/>
                <ProductSku/>
            </div>
        </PopupForm>
    );
}

export default observer(MedicaSuppliesForm);