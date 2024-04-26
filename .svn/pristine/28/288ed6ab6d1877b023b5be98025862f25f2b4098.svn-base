import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { Grid, DialogActions, Button, DialogContent, Checkbox } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import BlockIcon from "@material-ui/icons/Block";
import { useTranslation } from "react-i18next";
import { useStore } from "../../stores";
import { observer } from "mobx-react";
import * as Yup from "yup";
import GlobitsTextField from "../../common/form/GlobitsTextField";
import GlobitsCheckBox from "app/common/form/GlobitsCheckBox";
import SelectSourceLevels from "./components/SelectSourceLevels";

export default observer(function SourceForm() {
  const { sourceStore } = useStore();
  const { t } = useTranslation();
  const { handleClose, createSource, editSource, selectedSource } =
    sourceStore;
  const [source, setSource] = useState({
    id: "",
    name: "",
    nameAbbreviation: "",
    doNotUse: null,
    levels: []
  });

  const validationSchema = Yup.object({
    name: Yup.string().required(t("validation.required")).nullable(),
    nameAbbreviation: Yup.string().required(t("validation.required")).nullable(),
  });

  useEffect(() => {
    if (selectedSource) {
      setSource(selectedSource);
    }
  }, [selectedSource]);

  function hanledFormSubmit(values) {
    const source = {
      ...values
    }
    if (source.id.length === 0) {
      createSource(source);
    } else {
      editSource(source);
    }
  }

  return (
    <Formik
      validationSchema={validationSchema}
      enableReinitialize
      initialValues={source}
      onSubmit={(values) => hanledFormSubmit(values)}
    >
      {({ values, setFieldValue }) => {
        // console.log("🔥 ~ SourceForm ~ values:", values)
        return (
          <Form autoComplete="off">

            <DialogContent className="dialog-body">
              <Grid container spacing={2} className="w-100">
                <Grid item xs={12}>
                  <GlobitsTextField
                    variant="standard"
                    label={t("source.name")}
                    name="name"
                    requiredLabel
                  />
                </Grid>
                <Grid item xs={12}>
                  <GlobitsTextField
                    variant="standard"
                    label={t("source.nameAbbreviation")}
                    name="nameAbbreviation"
                    requiredLabel
                  />
                </Grid>
                <Grid item xs={12}>
                  <SelectSourceLevels />
                  {/* <GlobitsAutocomplete
                    name="levels"
                    options={LocalConstants.STORE_LEVEL}
                    multiple
                    label={t("store.level")}
                    variant="standard"
                    requiredLabel
                    value={values?.levels || []}
                    getOptionSelected={(option, value) => {
                      return  option?.value === value?.value
                    }}
                    // handleChange={(_, values) => {
                    //   let newValue = []
                    //   if (values?.length > 0) {
                    //     newValue = values.map((level) => {
                    //       if (!parseInt(level)) {
                    //         return level.value
                    //       }
                    //       return level
                    //     })
                    //   }
                    //   setFieldValue("level", newValue)
                    // }}
                  /> */}
                </Grid>
                <Grid item xs={12}>
                  <GlobitsCheckBox
                    name="doNotUse"
                    label="Không sử dụng"
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
                >
                  {t("general.button.save")}
                </Button>
              </div>
            </DialogActions>
          </Form>
        )
      }}
    </Formik>
  );
});
