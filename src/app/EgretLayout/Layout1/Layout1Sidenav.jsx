import React, { Component } from "react";
import PropTypes from "prop-types";
import { MuiThemeProvider } from "@material-ui/core";
import { connect } from "react-redux";
import { setLayoutSettings, setDefaultSettings } from "app/redux/actions/LayoutActions";
import SideNav from "../SharedCompoents/Sidenav";
import { isMdScreen } from "utils";
import IconLock from "app/common/Icon/IconLock";
import IconLogout from "app/common/Icon/IconLogout";
import Config from 'app/appConfig';
import localStorageService from "app/services/localStorageService";
import jwtAuthService from "app/services/jwtAuthService";
import ConfirmPopup from "app/common/Component/Popup/ConfirmPopup";
import { NavLink, withRouter } from "react-router-dom";

class Layout1SideNav extends Component {
  state = {
    openConfirmLogout: false
  };

  user = null;

  constructor() {
    super();
    this.user = localStorageService.getItem("auth_user")
  }

  componentWillMount() {
    // CLOSE SIDENAV ON ROUTE CHANGE ON MOBILE
    this.unlistenRouteChange = this.props.history.listen(() => {
      if (isMdScreen()) {
        this.updateSidebarMode({ mode: "full" });
      }
    });
  }

  componentWillUnmount() {
    this.unlistenRouteChange();
  }

  updateSidebarMode = sidebarSettings => {
    let { settings, setLayoutSettings, setDefaultSettings } = this.props;
    const updatedSettings = JSON.parse(JSON.stringify(settings));
    updatedSettings.layout1Settings.leftSidebar = { ...settings.layout1Settings.leftSidebar, ...sidebarSettings }

    setLayoutSettings(updatedSettings);
    setDefaultSettings(updatedSettings);
  };

  render() {
    let { theme, settings } = this.props;
    const sideNavTheme = settings.themes[settings.layout1Settings.leftSidebar.theme] || theme;

    return (
      <MuiThemeProvider theme={sideNavTheme}>
        <nav className="sidebar">
          <div className='user-container'>
            <p className='user-img'>
              <svg width="143" height="143" viewBox="0 0 143 143" fill="none">
                <path d="M126.253 116.987C133.568 108.185 138.656 97.7514 141.086 86.5678C143.516 75.3841 143.216 63.7798 140.213 52.7363C137.21 41.6928 131.591 31.5351 123.831 23.1225C116.072 14.71 106.401 8.28994 95.6356 4.4056C84.8703 0.521257 73.3279 -0.713138 61.9847 0.806837C50.6415 2.32681 39.8312 6.55644 30.4684 13.1379C21.1056 19.7194 13.4656 28.4591 8.19484 38.6177C2.92405 48.7763 0.177503 60.055 0.187527 71.4995C0.191374 88.1367 6.05423 104.241 16.7473 116.987L16.6454 117.073C17.002 117.501 17.4095 117.868 17.7762 118.291C18.2347 118.815 18.7288 119.309 19.2025 119.819C20.6287 121.367 22.0957 122.855 23.6341 124.25C24.1027 124.678 24.5866 125.076 25.0603 125.483C26.6903 126.889 28.3662 128.224 30.1031 129.466C30.3272 129.619 30.531 129.818 30.7551 129.976V129.915C42.6852 138.31 56.9171 142.816 71.5051 142.816C86.0931 142.816 100.325 138.31 112.255 129.915V129.976C112.479 129.818 112.678 129.619 112.907 129.466C114.639 128.218 116.32 126.889 117.95 125.483C118.424 125.076 118.908 124.673 119.376 124.25C120.914 122.85 122.381 121.367 123.808 119.819C124.281 119.309 124.77 118.815 125.234 118.291C125.596 117.868 126.008 117.501 126.365 117.068L126.253 116.987ZM71.5 30.7495C76.0335 30.7495 80.4653 32.0939 84.2347 34.6126C88.0042 37.1313 90.9422 40.7112 92.6771 44.8996C94.412 49.088 94.8659 53.6968 93.9815 58.1432C93.097 62.5897 90.9139 66.6739 87.7082 69.8796C84.5026 73.0853 80.4183 75.2684 75.9719 76.1528C71.5255 77.0373 66.9166 76.5834 62.7282 74.8485C58.5398 73.1135 54.9599 70.1756 52.4412 66.4061C49.9225 62.6366 48.5782 58.2049 48.5782 53.6714C48.5782 47.5921 50.9931 41.7619 55.2918 37.4632C59.5905 33.1645 65.4208 30.7495 71.5 30.7495ZM30.7857 116.987C30.874 110.298 33.5921 103.914 38.3517 99.2143C43.1114 94.5147 49.5299 91.878 56.2188 91.8745H86.7813C93.4701 91.878 99.8887 94.5147 104.648 99.2143C109.408 103.914 112.126 110.298 112.214 116.987C101.043 127.054 86.5381 132.625 71.5 132.625C56.462 132.625 41.9571 127.054 30.7857 116.987Z" fill="#9A9A9A" />
              </svg>
            </p>
            <h4 className='user-name'>{this?.user?.displayName}</h4>
            <div className='user-list-btn'>
              <NavLink className='btn-user tooltip' tooltip="Đổi mật khẩu" to={Config.ROOT_PATH + "manage/user-profile"}>
                <IconLock />
              </NavLink>

              <button className='btn-user tooltip' tooltip="Đăng xuất" onClick={() => this.setState({ openConfirmLogout: true })}
              >
                <IconLogout />
              </button>
            </div>
          </div>
          
          <SideNav />

          <div className="sidebar__footer">
            <button className='logout__btn' onClick={() => this.setState({ openConfirmLogout: true })}>
              <IconLogout className="btn__icon" />
              <h6 className="logout__content">Đăng xuất</h6>
            </button>
          </div>
        </nav>

        {this.state.openConfirmLogout && (
          <ConfirmPopup
            isNotAPromise
            open={this.state.openConfirmLogout}
            onClose={() => this.setState({ openConfirmLogout: false })}
            text={"Bạn có chắc chắn muốn đăng xuất khỏi tài khoản này?"}
            onConfirm={() => {
              this.setState({ openConfirmLogout: false });
              jwtAuthService.logout();
            }}
          />
        )}
      </MuiThemeProvider>
    );
  }
}

Layout1SideNav.propTypes = {
  setLayoutSettings: PropTypes.func.isRequired,
  setDefaultSettings: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  setDefaultSettings: PropTypes.func.isRequired,
  setLayoutSettings: PropTypes.func.isRequired,
  settings: state.layout.settings
});

export default withRouter(connect(mapStateToProps, { setLayoutSettings, setDefaultSettings })(Layout1SideNav))