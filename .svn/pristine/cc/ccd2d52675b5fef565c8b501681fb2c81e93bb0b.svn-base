import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { EgretVerticalNav } from "egret";
import { setLayoutSettings } from "app/redux/actions/LayoutActions";
import { withTranslation } from 'react-i18next';
import { NAVIGATION } from "app/navigations";

const ViewEgretVerticalNav = withTranslation()(EgretVerticalNav);

class Sidenav extends Component {
  updateSidebarMode = sidebarSettings => {
    let { settings, setLayoutSettings } = this.props;
    let activeLayoutSettingsName = settings.activeLayout + "Settings";
    let activeLayoutSettings = settings[activeLayoutSettingsName];

    setLayoutSettings({
      ...settings,
      [activeLayoutSettingsName]: {
        ...activeLayoutSettings,
        leftSidebar: {
          ...activeLayoutSettings.leftSidebar,
          ...sidebarSettings
        }
      }
    });
  };

  render() {
    return (
      <Fragment>
        {this.props.children}
        <ViewEgretVerticalNav navigation={NAVIGATION} />
        <div onClick={() => this.updateSidebarMode({ mode: "close" })} className="sidenav__overlay" />
      </Fragment>
    );
  }
}

Sidenav.propTypes = {
  setLayoutSettings: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  setLayoutSettings: PropTypes.func.isRequired,
  settings: state.layout.settings
});
export default withRouter(connect(mapStateToProps, { setLayoutSettings })(Sidenav));