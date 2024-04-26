import React, { Component } from "react";
import { withStyles, Icon } from "@material-ui/core";
import TouchRipple from "@material-ui/core/ButtonBase";
import { withRouter } from "react-router-dom";

const styles = (theme) => {
  return {
    expandIcon: {
      transition: "transform 0.3s cubic-bezier(0, 0, 0.2, 1) 0ms",
      transform: "rotate(90deg)",
      // marginRight: "16px"
    },
    collapseIcon: {
      transition: "transform 0.3s cubic-bezier(0, 0, 0.2, 1) 0ms",
      transform: "rotate(0deg)",
      // marginRight: "16px"
    },
    "expansion-panel": {
      overflow: "hidden",
      transition: "max-height 0.3s cubic-bezier(0, 0, 0.2, 1)",
    },
    highlight: {
      background: theme.palette.primary.main,
    },
  };
};

class EgretVerticalNavExpansionPanel extends Component {
  state = {
    collapsed: true,
  };
  elementRef = React.createRef();

  componentHeight = 0;

  handleClick = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  calcaulateHeight(node) {
    if (node.name !== "child") {
      for (let child of node.children) {
        this.calcaulateHeight(child);
      }
    }
    this.componentHeight += node.clientHeight;
    return;
  }
  componentDidMount() {
    let { location } = this.props;
    this.calcaulateHeight(this.elementRef);

    // OPEN DROPDOWN IF CHILD IS ACTIVE
    for (let child of this.elementRef.children) {
      if (child.getAttribute("href") === location.pathname) {
        this.setState({ collapsed: false });
      }
    }
  }
  render() {
    let { collapsed } = this.state;
    let { classes, children } = this.props;
    let { name, icon, badge } = this.props.item;
    const { t } = this.props;
    return (
      <li className="item-nav">
        <TouchRipple
          className="flex-middle h-12 w-100 link_item"
          style={{ justifyContent:'space-between' }}
          onClick={this.handleClick}
        >
          <h6 className="flex flex-middle" style={{ gap: 5, marginBottom: 0 }}>
            <Icon className="text-white">{icon}</Icon>
            <p className="links_name">{t(name)}</p>
          </h6>
          {badge && (
            <div className={`badge bg-${badge.color}`}>{badge.value}</div>
          )}
          <div className={collapsed ? classes.collapseIcon + " item-arrow" : classes.expandIcon + " item-arrow"}>
            <Icon className="text-middle" style={{ color:"#ffffff" }}>chevron_right</Icon>
          </div>
        </TouchRipple>

        <ul className={classes["expansion-panel"] + " submenu"}
          ref={(el) => (this.elementRef = el)}
          style={collapsed ? { maxHeight: "0px" } : { maxHeight: this.componentHeight + "px" }}
        >
          {children}
        </ul>
      </li>
    );
  }
}

export default withRouter(withStyles(styles)(EgretVerticalNavExpansionPanel));
