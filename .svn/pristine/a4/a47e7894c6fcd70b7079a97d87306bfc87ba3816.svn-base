import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { Grid, DialogActions, Button, DialogContent } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import BlockIcon from "@material-ui/icons/Block";
import { useTranslation } from "react-i18next";
import { useStore } from "../../stores";
import * as Yup from "yup";
import { observer } from "mobx-react";
import GlobitsTextField from "../../common/form/GlobitsTextField";
import GlobitsSelectInput from "app/common/form/GlobitsSelectInput";
import LocalConstants from "app/LocalConstants";

export default observer(function AttributeForm() {
  const { attributeStore } = useStore();
  const { t } = useTranslation();
  const {
    handleClose,
    createAttribute,
    editAttribute,
    selectedAttribute,
  } = attributeStore;

  const [attribute, setAttribute] = useState({
    id: "",
    code: "",
    name: "",
  });

  const validationSchema = Yup.object({
    code: Yup.string().required(t("validation.required")).nullable(),
    name: Yup.string().required(t("validation.required")).nullable(),
  });

  useEffect(() => {
    if (selectedAttribute) setAttribute(selectedAttribute);
  }, [selectedAttribute]);

  function hanledFormSubmit(attribute) {
    if (attribute.id.length === 0) {
      createAttribute(attribute);
    } else {
      editAttribute(attribute);
    }
  }

  return (
    <Formik
      validationSchema={validationSchema}
      enableReinitialize
      initialValues={attribute}
      onSubmit={(values) => hanledFormSubmit(values)}
    >
      {({ isSubmitting, values }) => (
        <Form autoComplete="off">
          <DialogContent className="dialog-body">
            <Grid container spacing={2}>
              <Grid item md={12} sm={12} xs={12}>
                <GlobitsTextField
                  variant="standard"
                  label={t("attribute.code")}
                  name="code"
                  requiredLabel
                />
              </Grid>
              <Grid item md={12} sm={12} xs={12}>
                <GlobitsTextField
                  variant="standard"
                  label={t("attribute.name")}
                  name="name"
                  requiredLabel
                />
              </Grid>
              <Grid item md={12} sm={12} xs={12}>
                <GlobitsSelectInput
                  variant="standard"
                  label={t("attribute.type")}
                  name="type"
                  options = {LocalConstants.TypeOfAttribute}
                  keyValue = "value"
                  value = {values?.type || null}
                />
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions className="dialog-footer p-0">
            <div className="flex flex-space-between flex-middle">
              <Button
                startIcon={<BlockIcon />}
                variant="contained"
                className="mr-12 btn btn-secondary d-inline-flex"
                color="secondary"
                onClick={() => handleClose()}
              >
                {t("general.button.cancel")}
              </Button>
              <Button
                startIcon={<SaveIcon />}
                className="mr-0 btn btn-primary d-inline-flex"
                variant="contained"
                color="primary"
                type="submit"
                //disabled={isSubmitting}
              >
                {t("general.button.save")}
              </Button>
            </div>
          </DialogActions>
        </Form>
      )}
    </Formik>
  );
});
