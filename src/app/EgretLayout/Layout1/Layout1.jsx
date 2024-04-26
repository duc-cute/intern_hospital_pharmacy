import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { setLayoutSettings } from "app/redux/actions/LayoutActions";
import { withStyles } from "@material-ui/core";
import { isMdScreen, classList } from "utils";
import { renderRoutes } from "react-router-config";
import Layout1TopBar from "./Layout1Topbar";
import Layout1SideNav from "./Layout1Sidenav";
import Footer from "../SharedCompoents/Footer";
import AppContext from "app/appContext";
import { withTranslation } from "react-i18next";
import localStorageService from "app/services/localStorageService";
const ViewLayout1TopBar = withTranslation()(Layout1TopBar);
const styles = (theme) => {
  return {
    layout: {
      backgroundColor: theme.palette.background.default,
    },
  };
};

class Layout1 extends Component {
  state = {
    roles: localStorageService.getLoginUser()?.roles?.map((item) => item.authority) || [],
  }

  componentWillMount() {
    if (isMdScreen()) {
      this.updateSidebarMode({ mode: "close" });
    }
  }

  updateSidebarMode = (sidebarSettings) => {
    let { settings, setLayoutSettings } = this.props;
    const updatedSettings = JSON.parse(JSON.stringify(settings));
    updatedSettings.layout1Settings.leftSidebar = { ...settings.layout1Settings.leftSidebar, ...sidebarSettings };

    setLayoutSettings(updatedSettings);
  };

  getRouters = (routes) => {
    const { roles } = this.state;

    const newRoutes = [];
    routes.forEach(item => {
      if (!item.auth || roles.some((role) => (item.auth).indexOf(role) !== -1)) {
        const router = item.children ? this.getRouters(item.children) : [item];
        newRoutes.push(...router);
      }
    })

    return newRoutes;
  }

  render() {
    let { settings, classes } = this.props;
    let { layout1Settings, activeLayout, perfectScrollbar } = settings;

    let layoutClasses = {
      [classes.layout]: true,
      [`${activeLayout} sidenav-${layout1Settings.leftSidebar.mode}`]: true,
      "topbar-fixed": layout1Settings.topbar.fixed,
    };

    return (
      <AppContext.Consumer>
        {({ routes }) => (
          <div className={classList(layoutClasses)}>
            {layout1Settings.leftSidebar.show && <Layout1SideNav />}

            <div className={`content-wrap position-relative${!layout1Settings.leftSidebar.show ? " w-100 m-0" : ""}`}>
              {layout1Settings.topbar.show && layout1Settings.topbar.fixed && (
                <ViewLayout1TopBar />
              )}

              {perfectScrollbar && (
                <div className="scrollable-content">
                  <main className="content">{renderRoutes(this.getRouters(routes))}</main>
                  <div className="my-auto" />
                  {settings.footer.show && <Footer />}
                </div>
              )}
            </div>
          </div>
        )}
      </AppContext.Consumer>
    );
  }
}

Layout1.propTypes = {
  settings: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  setLayoutSettings: PropTypes.func.isRequired,
  settings: state.layout.settings,
});

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, { setLayoutSettings })(Layout1));
