import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { Grid, DialogActions, Button, DialogContent } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import BlockIcon from "@material-ui/icons/Block";
import { useTranslation } from "react-i18next";
import { useStore } from "../../stores";
import { observer } from "mobx-react";
import * as Yup from "yup";
import GlobitsTextField from "../../common/form/GlobitsTextField";
import { getAllByLevel } from './AdministrativeUnitService'
import GlobitsSelectInput from "app/common/form/GlobitsSelectInput";
import LocalConstants from "app/LocalConstants";
import GlobitsAutocomplete from "app/common/form/GlobitsAutocomplete";
import { useFormikContext } from "formik";

function SelectLevel(props) {
  const { values, setFieldValue } = useFormikContext();
  const { t } = props;

  const [parents, setParents] = useState([]);

  // const [parent, setParent] = useState(values.parent);

  const handleGetAllByLevel = (level) => {
    getAllByLevel(parseInt(level - 1)).then(({ data }) => {
      setParents(data)
    });
  }

  useEffect(() => {
    if (values.level) {
      handleGetAllByLevel(values.level)
    }

  }, [values.level]);

  const handleChange = (level) => {
    setFieldValue('parent', null);
    handleGetAllByLevel(level);
    setFieldValue('level', level);
  }

  return (
    <>
      <Grid item md={6} sm={12} xs={12}>
        <GlobitsSelectInput
          variant="standard"
          label="Cấp"
          name="level"
          keyValue="value"
          options={LocalConstants.AdminitractiveLevel}
          defaultValue={values.parent}
          handleChange={(event) => {
            handleChange(event.target.value)
          }}
        />

      </Grid>
      <Grid item md={6} sm={12} xs={12}>
        {values.level !== 1 &&
          <GlobitsAutocomplete
            variant="standard"
            name="parent"
            label={t("administrative_unit.parent")}
            options={parents}
          />
        }

      </Grid>
    </>
  );
}

export default observer(function AdministrativeUnitForm() {
  const { administrativeStore } = useStore();
  const { t } = useTranslation();

  const { handleClose, createAdministrative, editAdministrative, selectedAdministrativeUnit } =
    administrativeStore;

  const [administrative, setAdministrative] = useState({
    id: "",
    code: "",
    level: null,
    description: "",
    name: "",
    parent: null
  });

  const validationSchema = Yup.object({
    code: Yup.string().required(t("validation.required")).nullable(),
    name: Yup.string().required(t("validation.required")).nullable(),
  });

  useEffect(() => {
    if (selectedAdministrativeUnit) setAdministrative(selectedAdministrativeUnit);
  }, [selectedAdministrativeUnit]);



  function hanledFormSubmit(values) {
    if (values.id.length === 0) {
      createAdministrative(values);
    } else {
      editAdministrative(values);
    }
  }

  return (
    <Formik
      validationSchema={validationSchema}
      enableReinitialize
      initialValues={administrative}
      onSubmit={(values) => hanledFormSubmit(values)}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          <DialogContent className="dialog-body">
            <Grid container spacing={2}>
              <Grid item md={6} sm={12} xs={12}>
                <GlobitsTextField
                  variant="standard"
                  label={t("administrative_unit.name")}
                  name="name" requiredLabel
                />
              </Grid>

              <Grid item md={6} sm={12} xs={12}>
                <GlobitsTextField
                  variant="standard"
                  label={t("administrative_unit.code")}
                  name="code" requiredLabel
                />
              </Grid>
              <SelectLevel t={t} />
              <Grid item md={12} sm={12} xs={12}>
                <GlobitsTextField
                  variant="standard"
                  label={t("administrative_unit.description")}
                  name="description"
                  multiline
                // rows={3}
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
              // disabled={isSubmitting}
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
