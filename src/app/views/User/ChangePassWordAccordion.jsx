import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import GlobitsTextField from "../../common/form/GlobitsTextField";
import {
  Grid,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useFormikContext } from "formik";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    background: "rgb(237, 245, 251)",
    boxShadow: "0 0.5rem 1rem rgb(0 0 0, 15%)",
  },
  details: {
    background: "#fff",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function ControlledAccordions() {
  const { setValues, values, initialValues } = useFormikContext();

  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const { t } = useTranslation();

  const handleChange = () => {
    if (!expanded) {
      setValues({
        ...values,
        confirmPassword: null,
        password: null
      })
    } else {
      setValues({
        ...values,
        confirmPassword: initialValues.password,
        password: initialValues.password
      })
    }
    setExpanded(!expanded);
  };

  return (
    <Grid item md={12} xs={12}>
      <div className={classes.root}>
        <Accordion
          className={classes.container}
          expanded={expanded}
          onChange={handleChange}
        >
          {values.id && (
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="changePasswordPanelbh-content"
              id="changePasswordPanelbh-header"
            >
              <Typography className={classes.heading}>
                {t('Đổi mật khẩu')}
              </Typography>
            </AccordionSummary>
          )}
          {(expanded || !values.id) && (
            <AccordionDetails className={classes.details}>
              <Grid container spacing={2}>
                <Grid item sm={6} xs={12}>
                  <GlobitsTextField
                    variant="standard"
                    type="password"
                    label={t("user.password")}
                    validate="true"
                    name="password"
                    notDelay
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <GlobitsTextField
                    variant="standard"
                    type="password"
                    validate="true"
                    label={t("user.re_password")}
                    name="confirmPassword"
                    notDelay
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          )}
        </Accordion>
      </div>
    </Grid>
  );
}