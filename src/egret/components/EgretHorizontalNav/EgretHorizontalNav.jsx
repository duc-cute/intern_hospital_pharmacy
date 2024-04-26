import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "@material-ui/core";
import localStorageService from "app/services/localStorageService";

class EgretHorizontalNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
      activeLink: "",
    };
    this.handleClick = this.handleClick.bind(this);
  }

  renderLevels = (levels) => {
    const { t } = this.props;
    let roles = localStorageService.getLoginUser()?.roles?.map((item) => item.authority) || [];
    return levels.map((item, key) => {
      if (item.isVisible) {
        if (!item.auth || roles.some((role) => (item.auth).indexOf(role) !== -1)) {
          if (item.type === 2) {
            return (
              <li
                className={`nav-item ${key === this.state.activeLink ? "active" : ""
                  }`}
                key={key}
                onClick={() => this.handleClick(key)}
              >
                <div>
                  {item.icon && (
                    <Icon className="item-icon text-middle">{item.icon}</Icon>
                  )}
                  {t(item.name)}
                  <Icon className="item-icon text-middle">expand_more_icon</Icon>
                </div>
                <div className="mega-menu">
                  <ul
                    className={`submenu-overflow ${key === this.state.activeLink ? "active" : ""
                      }`}
                  >
                    {item.children.map((item, key) => {
                      if (!item.auth || roles.some((role) => (item.auth).indexOf(role) !== -1)) {
                        return (
                          <div className="mega-menu-item" key={key}>
                            {/* {t(item.name)} */}
                            <div className="mega-menu-sub-item">
                              {item.children?.map((subItem, subKey) => {
                                return (
                                  <div key={subKey} onClick={this.handleClick}>
                                    <NavLink className="nav-item" to={subItem.path}>
                                      {subItem.icon && (
                                        <Icon className="item-icon text-middle">{subItem.icon}</Icon>
                                      )}
                                      {t(subItem.name)}
                                    </NavLink>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        )
                      }
                    })}
                  </ul>
                </div>
              </li>
            );
          }
          if (item.children) {
            return (
              <li
                className={`nav-item ${key === this.state.activeLink ? "active" : ""
                  }`}
                key={key}
                onClick={() => this.handleClick(key)}
              >
                <div>
                  {item.icon && (
                    <Icon className="item-icon text-middle">{item.icon}</Icon>
                  )}
                  {t(item.name)}
                  <Icon className="item-icon text-middle">expand_more_icon</Icon>
                </div>
                <ul
                  className={`submenu-overflow ${key === this.state.activeLink ? "active" : ""
                    }`}
                >
                  {this.renderLevels(item.children)}
                </ul>
              </li>
            );
          } else {
            return (
              <li key={key} onClick={this.handleClick}>
                <NavLink className="nav-item" to={item.path}>
                  {item.icon && (
                    <Icon className="item-icon text-middle">{item.icon}</Icon>
                  )}
                  {t(item.name)}
                </NavLink>
              </li>
            );
          }
        }
      }
    });
  };

  componentDidMount() {
    var currentMenu = document.querySelectorAll(".nav-item.active")[0];
    if (currentMenu) {
      currentMenu.parentElement.parentElement.parentElement.classList.add(
        "active"
      );
    }

  }

  // UNSAFE_componentWillUpdate(nextProps, nextState) {
  //   var currentMenu;
  //   if (nextState.activeLink !== this.state.activeLink) {
  //     currentMenu = document.querySelectorAll(".nav-item.active")[0];
  //     currentMenu.classList.remove("active");
  //   } else {
  //     currentMenu = document.querySelectorAll(".nav-item.active")[0];
  //     currentMenu.parentElement.parentElement.parentElement.classList.add(
  //       "active"
  //     );
  //   }
  // }

  handleClick = (key) => {
    this.setState({ activeLink: key, opened: true });
  };

  render() {
    let max = this.props.max;
    let navigation = this.props.navigation;
    if (max && navigation.length > max) {
      let childItem = {
        name: "More",
        icon: "more_vert",
        children: navigation.slice(max, navigation.length),
      };
      navigation = navigation.slice(0, max);
      navigation.push(childItem);
    }
    return (
      <div className="horizontal-nav">
        <ul ref={this.wrapperRef} className="menu">
          {this.renderLevels(navigation)}
        </ul>
      </div>
    );
  }
}
export default EgretHorizontalNav;
