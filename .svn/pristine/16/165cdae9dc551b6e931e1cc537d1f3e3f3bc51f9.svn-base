import React from "react";
import { Grid } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { useStore } from "app/stores";
import { observer } from "mobx-react";
import * as Yup from "yup";
import GlobitsTextField from "app/common/form/GlobitsTextField";
import GlobitsPagingAutocomplete from "app/common/form/GlobitsPagingAutocomplete";
import { pagingStores } from "./StoreService";
import GlobitsNumberInput from "app/common/form/GlobitsNumberInput";
import LocalConstants from "app/LocalConstants";
import GlobitsSelectInput from "app/common/form/GlobitsSelectInput";
import PopupForm from "app/common/Component/Popup/PopupForm";

export default observer(function StoreForm() {
	const { t } = useTranslation();
	const { handleClosePopup, handleSaveStore, selectedStore, openForm } = useStore().storeStore;

	const validationSchema = Yup.object({
		name: Yup.string().required(t("validation.required")).nullable(),
		code: Yup.string().required(t("validation.required")).nullable(),
		phoneNumber: Yup.string().nullable()
			.matches(LocalConstants.PhoneRegExp, "SĐT không đúng định dạng"),
		level: Yup.number().nullable().required(t("validation.required")),
	});

	return (
		<PopupForm
			size="sm"
			open={openForm}
			title={(selectedStore?.id ? t("general.button.edit") : t("general.button.add")) + " " + t("store.title")}
			handleClose={handleClosePopup}
			formik={{
				enableReinitialize: true,
				validationSchema: validationSchema,
				initialValues: selectedStore,
				onSubmit: handleSaveStore
			}}
		>
			{({ setFieldValue }) => (
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<GlobitsTextField label={t("store.name")} name="name" requiredLabel />
					</Grid>

					<Grid item xs={12}>
						<GlobitsTextField
							label={t("store.code")}
							name="code"
							requiredLabel
						/>
					</Grid>

					<Grid item xs={12}>
						<GlobitsPagingAutocomplete
							label="Kho quản lý"
							name="parent"
							api={pagingStores}
							onChange={((_, value) => {
								setFieldValue("parent", value)
								if (value.level !== null) {
									setFieldValue("level", value.level + 1)
								}
							})}
						/>
					</Grid>

					<Grid item xs={12}>
						<GlobitsSelectInput
							noNullOption
							requiredLabel
							name="level"
							label={t("store.level")}
							options={LocalConstants.STORE_LEVEL}
						/>
					</Grid>

					<Grid item xs={12}>
						<GlobitsNumberInput
							label="Số điện thoại"
							name="phoneNumber"
							notDefault
							inputProps={{ maxLength: 11 }}
						/>
					</Grid>
					<Grid item xs={12}>
						<GlobitsTextField
							label="API cập nhật tồn kho EMR"
							name="apiLink"
							notDelay
						/>
					</Grid>
				</Grid>
			)}
		</PopupForm>
	);
});
