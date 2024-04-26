import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { Grid, DialogActions, Button, DialogContent } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import BlockIcon from "@material-ui/icons/Block";
import { useTranslation } from "react-i18next";
import { useStore } from "../../stores";
import * as Yup from "yup";
import { observer } from "mobx-react";
import Test from "./Component/Test";

import LocalConstants from "app/LocalConstants";
import GlobitsTextField from "app/common/form/GlobitsTextField";
import GlobitsSelectInput from "app/common/form/GlobitsSelectInput";

export default observer(function ServiceRequestFormForm() {
  const { ServiceRequestFormStore } = useStore();
  const { t } = useTranslation();
  const {
    handleClose,
    createServiceRequestForm,
    editServiceRequestForm,
    selectedServiceRequestForm,
  } = ServiceRequestFormStore;

  const [serviceRequestForm, setServiceRequestForm] = useState({
    id: "",
    name: "",
    code: "",
    formType : "",
    concepts: []
  });
  // const setValueConcepts = (concepts) => {
  //   setServiceRequestForm({...serviceRequestForm, concepts})
  //   // serviceRequestForm.concepts = concepts;
  // };

  const validationSchema = Yup.object({
    code: Yup.string().required(t("validation.required")).nullable(),
    name: Yup.string().required(t("validation.required")).nullable(),
    formType: Yup.number().required(t("validation.required")).nullable(),
  });

  useEffect(() => {
    if (selectedServiceRequestForm)
      setServiceRequestForm(selectedServiceRequestForm);
  }, [selectedServiceRequestForm]);

  // function hanledFormSubmit(religion) {
  //   if (religion.id.length === 0) {
  //     createReligion(religion);
  //   } else {
  //     editReligion(religion);
  //   }
  // }

  function requiredLabel(label) {
    return <span>{label} ( <span style={{ color: "red" }}>*</span> )</span>
  }

  return (
    <Formik
      validationSchema={validationSchema}
      enableReinitialize
      initialValues={serviceRequestForm}
      onSubmit={(values) =>
        values.id.length === 0
          ? createServiceRequestForm(values)
          : editServiceRequestForm(values)
      }
    >
      {({ isSubmitting, values }) => (
        <Form autoComplete="off">
          <DialogContent className="dialog-body">
            <Grid container spacing={2}>
              <Grid item sm={4} xs={12}>
                <GlobitsTextField 
                  label={requiredLabel(t("serviceRequestForm.code"))} 
                  name="code"
                />
              </Grid>
              <Grid item sm={4} xs={12}>
                <GlobitsTextField 
                  label={requiredLabel(t("serviceRequestForm.name"))}
                  name="name" 
                />
              </Grid>
              <Grid item sm={4} xs={12}>
              <GlobitsSelectInput
                  label={requiredLabel(t("serviceRequestForm.formType"))}
                  name="formType"
                  keyValue="value"
                  options={LocalConstants.ListFormType}
                />
              </Grid>
              <Test
                setValueConcepts={(concepts) => {
                  setServiceRequestForm({...values, concepts})
                }}
                items={serviceRequestForm.concepts}
              ></Test>
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
