import React, {useEffect, useState} from "react";
import {Button, makeStyles} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import BlockIcon from "@material-ui/icons/Block";
import {useTranslation} from "react-i18next";
import {useStore} from "app/stores";
import {observer} from "mobx-react";
import GeneralInformationTab from "./Tabs/GeneralInfomationTab";
import ProductSku from "./Component/ProductSkus";
import ProductImage from "./Tabs/ProductImage";
import {toast} from "react-toastify";
import * as Yup from "yup";
import PopupForm from "app/common/Component/Popup/PopupForm";
import {ProductType} from "app/common/Constant/LocalConstant";
import ProductIngredient from "./Component/ProductIngredient";

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
    productType: ProductType.DRUG,
    content: null,
    unit: null,
    ingredients: [],
    productActiveIngredientList: [],
    images: [],
    // activeIngredientObj: null
}

function ProductForm({handleAfterSubmit}) {
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

    const [product, setProduct] = useState(initialValues);

    const validationSchema = Yup.object({
        code: Yup.mixed().nullable().required("Vui lòng nhập mã hàng trước khi lưu"),
        name: Yup.mixed().nullable().required("Vui lòng nhập tên hàng trước khi lưu"),
        categories: Yup.array().nullable().defined("Vui lòng chọn nhóm thuốc")
    });

    useEffect(() => {
        if (selectedProduct) {
            setProduct({...selectedProduct, ingredients: selectedProduct?.ingredients});
        } else {
            setProduct(initialValues)
        }
    }, [selectedProduct]);

    async function handleSubmit(product, {setSubmitting}) {
        try {
            let i = 0;
            const images = product?.images?.reduce((acc, m) => {
                if (m?.image?.id) {
                    const newItem = {...m, sortNumber: i}
                    i++;
                    return [...acc, newItem]
                }
                return acc;
            }, [])

            let newProduct = {...product, images, ingredients: product?.ingredients || null}

            if (!(product?.skus?.length > 0)) {
                toast.warn("Phải nhập ít nhất 1 đơn vị tính!")
                return;
            }

            if (!product.skus.some(e => e.isDefault)) {
                toast.warn("Phải chọn ít nhất 1 đơn vị tính là mặc định!")
                return;
            }

            if (!product.skus.some(e => Number(e.coefficient) === 1)) {
                toast.warn("Phải chọn ít nhất 1 đơn vị có quy cách đóng gòi bằng 1!")
                return;
            }

            // if (product.categories?.length > 1) {
            //   newProduct.categories = [product.categories[0]]
            // }

            let res;
            if (product.id) {
                res = await editProduct(newProduct);
            } else {
                res = await createProduct(newProduct);
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
            title={"Thông tin thuốc"}
            open={shouldOpenEditorDialog}
            handleClose={handleClose}
            noDiaLogContent
            size={"lg"}
            formik={{
                validationSchema: validationSchema,
                enableReinitialize: true,
                initialValues: product,
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
            id="productForm"
        >
            <div className={classes.root} style={{maxHeight: "70vh"}}>
                <GeneralInformationTab/>
                <ProductImage/>
                <ProductIngredient/>
                <ProductSku/>
            </div>
        </PopupForm>
    );
}

export default observer(ProductForm);