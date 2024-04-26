import React, { Component } from "react";
import {
  Icon,
  IconButton,
  Hidden,
  withStyles,
  MuiThemeProvider,
  MenuItem
} from "@material-ui/core";
import { EgretMenu, EgretToolbarMenu } from "egret";
import { setLayoutSettings } from "app/redux/actions/LayoutActions";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import ConstantList from "../../appConfig";
import LanguageSelect from '../SharedCompoents/LanguageSelect';
import { withTranslation } from 'react-i18next';
import { logoutUser } from "app/redux/actions/UserActions";
import { getCurrentUser } from "app/views/User/UserService"
import localStorageService from "app/services/localStorageService";
import { Link } from "react-router-dom";

const ViewLanguageSelect = withTranslation()(LanguageSelect);
class Layout2Topbar extends Component {
  state = {
    currentUserName: "",
  };

  handleSignOut = () => { this.props.logoutUser(); };

  updateSidebarMode = sidebarSettings => {
    let { settings, setLayoutSettings } = this.props;

    setLayoutSettings({
      ...settings,
      layout2Settings: {
        ...settings.layout2Settings,
        leftSidebar: {
          ...settings.layout2Settings.leftSidebar,
          ...sidebarSettings
        }
      }
    });
  };

  handleSidebarToggle = () => {
    let { settings } = this.props;
    let { layout2Settings } = settings;

    let mode =
      layout2Settings.leftSidebar.mode === "close" ? "mobile" : "close";

    this.updateSidebarMode({ mode });
  };

  componentDidMount() {
    // let user = localStorageService.getItem("auth_user");
    // if (user != null) {
    //   this.setState({ currentUserName: user.username }, () => {
    //     console.log(user)
    //   });
    // }


    getCurrentUser().then(({ data }) => {
      if (data) {
        this.setState({ currentUserName: data.username });

      }
    })
  }

  render() {
    let { theme, settings } = this.props;
    let { currentUserName } = this.state;
    const topbarTheme =
      settings.themes[settings.layout2Settings.topbar.theme] || theme;
    return (
      <MuiThemeProvider theme={topbarTheme}>
        <Helmet>
          <style>
            {`.topbar {
              background-color: ${topbarTheme.palette.primary.main};
              border-color: ${topbarTheme.palette.divider} !important;
            }
            .topbar .brand__text {
              color: ${topbarTheme.palette.primary.contrastText};
            }
            `}
          </style>
        </Helmet>

        <div className="topbar">
          <div className="flex flex-space-between flex-middle container h-100">
            <div className="flex flex-middle brand">
              <Link to={ConstantList.HOME_PAGE}>
                <img src={ConstantList.ROOT_PATH + "assets/images/logo.png"} alt="company-logo" />

                </Link>
                  <span className="brand__text">NEW VITIMES</span>
                </div>
                <div className="mx-auto"></div>
                <div className="flex flex-middle">
                  <EgretToolbarMenu offsetTop="80px">
                    <ViewLanguageSelect />
                    <EgretMenu
                      menuButton={
                        <img
                          className="mx-8 text-middle circular-image-small"
                          src={ConstantList.ROOT_PATH + "assets/images/avatar.jpg"}
                          alt="user"
                        />
                      }
                      menuText={
                        <span className="text-bottom">
                          {currentUserName}
                        </span>
                      }
                    >
                      {/* <MenuItem
                    className="flex flex-middle"
                    style={{ minWidth: 185 }}
                  >
                    <Icon> home </Icon>
                    <span className="pl-16"> Home </span>
                  </MenuItem>
                  <MenuItem
                    className="flex flex-middle"
                    style={{ minWidth: 185 }}
                  >
                    <Icon> person </Icon>
                    <span className="pl-16"> Person </span>
                  </MenuItem>
                  <MenuItem
                    className="flex flex-middle"
                    style={{ minWidth: 185 }}
                  >
                    <Icon> settings </Icon>
                    <span className="pl-16"> Settings </span>
                  </MenuItem> */}
                      <MenuItem
                        onClick={this.handleSignOut}
                        className="flex flex-middle"
                        style={{ minWidth: 185 }}
                      >
                        <Icon> power_settings_new </Icon>
                        <span className="pl-16"> Đăng xuất </span>
                      </MenuItem>
                    </EgretMenu>
                  </EgretToolbarMenu>

                  <Hidden mdUp>
                    <IconButton onClick={this.handleSidebarToggle}>
                      <Icon>menu</Icon>
                    </IconButton>
                  </Hidden>
                </div>
            </div>
          </div>
      </MuiThemeProvider>
    );
  }
}

Layout2Topbar.propTypes = {
  setLayoutSettings: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  setLayoutSettings: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  settings: state.layout.settings
});

export default withStyles({}, { withTheme: true })(
  connect(
    mapStateToProps,
    { setLayoutSettings, logoutUser }
  )(Layout2Topbar)
);
