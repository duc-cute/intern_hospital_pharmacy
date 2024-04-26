import React, { useState } from "react";
import { useFormikContext } from "formik";
import {
  Grid,
  Button,
  makeStyles
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";
import AddIcon from "@material-ui/icons/Add";
import SourceItem from "../Component/SourceItem";
import SourceSelectPopup from "../Component/SourceSelectPopup";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#E4f5fc",
    padding: "10px 15px", 
    marginTop: "10px",
    borderRadius: "5px",
  },
  groupContainer: {
    width: "100%",
    alignItems: 'center',
    "& .MuiOutlinedInput-root": {
      borderRadius: "0!important",
    },
  },
}));

export default observer(function SourceTab() {
  const { t } = useTranslation();
  const classes = useStyles();

  const [openSelectSource, setOpenSelectSource] = useState(false);
  const [selectedSources, setSelectedSources] = useState([]);

  const { values, setFieldValue } = useFormikContext();

  return (
    <div style={{ padding: 8 }}>
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={12} >
          <Grid container className={classes.groupContainer}>
            <Grid item xs={6}>
              <h5 className="m-0">{t('Danh sách nguồn')}</h5>
            </Grid>
            <Grid item xs={6}>
              <Button
                className="mb-16 mr-16 btn btn-primary d-inline-flex"
                startIcon={<AddIcon />}
                variant="contained"
                style={{ float: 'right' }}
                onClick={() => {
                  setSelectedSources(values?.sources || [])
                  setOpenSelectSource(true);
                }}
              >
                {t("product.addSource")}
              </Button>
            </Grid>
          </Grid>

        </Grid>

        <Grid item xs={12}>
          <SourceItem listSource={values?.sources || []} />
        </Grid>
        {openSelectSource &&
          <SourceSelectPopup
            t={t}
            open={openSelectSource}
            selectedSources={selectedSources}
            handleSelect={(values) => {
              setFieldValue("sources", values)
              setOpenSelectSource(false);
            }}
            handleClose={() => setOpenSelectSource(false)}
          />}
      </Grid>
    </div>
  );
});
