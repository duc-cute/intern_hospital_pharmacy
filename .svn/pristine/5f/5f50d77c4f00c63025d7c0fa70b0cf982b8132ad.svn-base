import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import ConstantList from "../appConfig";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "block",
    alignItems: "flex-end",
    justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
  },
  title: {
    display: "flex",
    color: "#000000 !important",
    fontWeight: "700!important",
    textTransform: "capitalize",
    fontSize: "1.5rem",
    [theme.breakpoints.down("md")]: {
      fontSize: "1.5rem",
    },
  },
  location: {
    display: "flex",
    color: "#000000 !important",
    fontSize: "12px",
  },
}));

const GlobitsBreadcrumb = ({ routeSegments }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <div className={classes.root}>
      <div className={classes.title}>
        {routeSegments ? (
          <Fragment>
            <span className="">
              {routeSegments[routeSegments.length - 1]["subName"] ? routeSegments[routeSegments.length - 1]["subName"] : routeSegments[routeSegments.length - 1]["name"]}
            </span>
          </Fragment>
        ) : null}
      </div>
      <div className={classes.location}>
        <span>
          {t("general.you_are_here")}&nbsp;&nbsp;
        </span>
        <NavLink to={ConstantList.ROOT_PATH}>{t("general.home")}</NavLink>
        {routeSegments
          ? routeSegments.map((route, index) => (
            <Fragment key={index}>
              <span>&nbsp; &nbsp;/&nbsp; &nbsp;</span>

              <span className="">{route.name}</span>

              {route.subName &&
                <>
                  <span>&nbsp; &nbsp;/&nbsp; &nbsp;</span>
                  <span className="">{route.subName}</span>
                </>
              }

            </Fragment>
          ))
          : null}
      </div>
    </div>
  );
};

export default GlobitsBreadcrumb;
