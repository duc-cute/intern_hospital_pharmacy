import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "@material-ui/core";
import TouchRipple from "@material-ui/core/ButtonBase";
import EgretVerticalNavExpansionPanel from "./EgretVerticalNavExpansionPanel";
import { withStyles } from "@material-ui/styles";
import { withTranslation } from 'react-i18next';
import localStorageService from "app/services/localStorageService";
const ViewEgretVerticalNavExpansionPanel = withTranslation()(EgretVerticalNavExpansionPanel);
const styles = theme => ({
  expandIcon: {
    transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
    transform: "rotate(90deg)"
  },
  collapseIcon: {
    transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
    transform: "rotate(0deg)"
  }
});

class EgretVerticalNav extends Component {
  state = {
    collapsed: false,
    roles: localStorageService.getLoginUser()?.roles?.map((item) => item.authority) || [],
  };

  renderLevels = data => {
    const { t } = this.props;
    return data.map((item, index) => {
      if (!item.auth || this.state.roles.some((role) => (item.auth).indexOf(role) !== -1)) {
        if (item.children) {
          return (
            <ViewEgretVerticalNavExpansionPanel item={item} key={index}>
              {this.renderLevels(item.children)}
            </ViewEgretVerticalNavExpansionPanel>
          );
        }

        return (
          <TouchRipple key={item.name} name="child" className="item-nav" component="li">
            <NavLink exact key={index} to={item.path} className="link_item" activeClassName="link_item-active">
              {(() => {
                if (item.icon) {
                  return (
                    <Icon className="text-white item-icon">{item.icon}</Icon>
                  );
                } else {
                  return (
                    <span className="text-wite">{item.iconText}</span>
                  );
                }
              })()}
              <h6 className="links_name">{t(item.name)}</h6>
              {/* {item.badge && (
                  <div className={`badge bg-${item.badge.color}`}>
                    {item.badge.value}
                  </div>
                )} */}
            </NavLink>
          </TouchRipple>
        );
      }

      return <React.Fragment key={index}></React.Fragment>
    });
  };

  handleClick = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  render() {
    return (
      <ul className="nav-list">
        {this.renderLevels(this.props.navigation)}
      </ul>
    );
  }
}

export default withStyles(styles)(EgretVerticalNav);
