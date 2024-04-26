import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setLayoutSettings } from "app/redux/actions/LayoutActions";
import { PropTypes } from "prop-types";
import { isMdScreen } from "utils";
import localStorageService from "app/services/localStorageService";
import IconMenu from "app/common/Icon/IconMenu";
import IconModule from "app/common/Icon/IconModule";
import { EMR_URL } from "app/appConfig";

class Layout1Topbar extends Component {
  state = {};

  updateSidebarMode = (sidebarSettings) => {
    let { settings, setLayoutSettings } = this.props;

    setLayoutSettings({
      ...settings,
      layout1Settings: {
        ...settings.layout1Settings,
        leftSidebar: {
          ...settings.layout1Settings.leftSidebar,
          ...sidebarSettings,
        },
      },
    });
  };

  handleSidebarToggle = () => {
    let { settings } = this.props;
    let { layout1Settings } = settings;

    let mode;
    if (isMdScreen()) {
      mode = layout1Settings.leftSidebar.mode === "close" ? "mobile" : "close";
    } else {
      mode = layout1Settings.leftSidebar.mode === "full" ? "close" : "full";
    }

    this.updateSidebarMode({ mode });
  };

  componentDidMount = () => {
    const user = localStorageService.getItem("auth_user");

    this.setState({ currentUserName: user?.username, moduleName: user?.userPermissionDto?.orgName });
  }

  render() {
    const { moduleName } = this.state;
    return (
      <header className='header-container'>
        <h5 className='flex flex-middle flex-center gap-4 text-green m-0'>
          <button id='btn-sidebar' className='flex flex-middle flex-center mr-4' onClick={this.handleSidebarToggle}>
            <IconMenu />
          </button>
          {/* Cửa hàng kính */}
        </h5>
        <h2 className='title-web'>
          <strong>{moduleName || "Bệnh viện mắt Bình Thuận"}</strong>
        </h2>
        <span className="redirect-module" >
          <a href={EMR_URL} className='link-redirect-module flex flex-middle flex-center'>
            <IconModule />
            <strong className="ml-8">Chọn module</strong>
          </a>
        </span>
      </header>
    );
  }
}

Layout1Topbar.propTypes = {
  setLayoutSettings: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  setLayoutSettings: PropTypes.func.isRequired,
  settings: state.layout.settings,
});

export default withRouter(connect(mapStateToProps, { setLayoutSettings })(Layout1Topbar))