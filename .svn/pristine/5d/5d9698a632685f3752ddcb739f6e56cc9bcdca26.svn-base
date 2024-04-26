import React from "react";
import { memo } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles({
  root: {
    minWidth: 200,
  },
  wrapper: {
    display: "flex",
    padding: "16px 12px !important",
    alignItems: "center",
    justifyContent: "space-around",
    gap: 20
  },
  ico: {
    "& .material-icons.MuiIcon-root": {
        fontSize: "3rem",
    }
  },
  count: {
    fontSize: 13,
    minHeight: 19.5,
  },
  title: {
    fontSize: 13,
    color: "#333"
  },
  displayQuantity: {
    fontSize: 20,
    fontWeight: 700
  }
});

function DashboardCard({icon, title, displayQuantity, countTitle, color}) {
    const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent className={classes.wrapper}>
        <section className={classes.ico}>
            <Icon style={{ color }}>{icon}</Icon>
        </section>
        <section>
            <div className={classes.count}>{countTitle}</div>
            <div className={classes.displayQuantity} style={{ color }}>{displayQuantity}</div>
            <div className={classes.title}>{title}</div>
        </section>
      </CardContent>
    </Card>
  );
};
export default memo(DashboardCard)