import React, { Component } from "react";
import ConstantList from "app/appConfig";
import {
  Avatar,
  Grid,
  Select,
  FormControl,
  Button,
  withStyles,
  InputLabel,
  TextField
} from "@material-ui/core";
import localStorageService from "app/services/localStorageService";
import MenuItem from '@material-ui/core/MenuItem';
import ChangePasswordDiaglog from "./ChangePasswordPopup";
import authService from "app/services/jwtAuthService";
import axios from "axios";
import GlobitsBreadcrumb from "app/common/GlobitsBreadcrumb";
import { ListGender } from "app/LocalConstants";

class UserProfile extends Component {
  state = { open: true, user: {}, shouldOpenImageDialog: false, shouldOpenPasswordDialog: false };
  windowResizeListener;

  toggleSidenav = () => {
    this.setState({ open: !this.state.open });
  };

  handleWindowResize = () => {
    return event => {
      if (event.target.innerWidth < 768) {
        this.setState({ mobile: true });
      } else this.setState({ mobile: false });
    };
  };

  componentDidMount() {
    let user = localStorageService.getLoginUser();
    this.setState({ user: user });

    if (window.innerWidth < 768) {
      this.setState({ open: false });
    }
    if (window)
      this.windowResizeListener = window.addEventListener("resize", event => {
        if (event.target.innerWidth < 768) {
          this.setState({ open: false });
        } else {
          this.setState({ open: true })
        };
      });
  }

  componentWillUnmount() {
    if (window) window.removeEventListener("resize", this.windowResizeListener);
  }
  handleOpenUploadDialog = () => {
    this.setState({
      shouldOpenImageDialog: true
    });
  }
  handleDialogClose = () => {
    this.setState({
      shouldOpenImageDialog: false
    })
  }
  handleOpenPasswordDialog = () => {
    this.setState({
      shouldOpenPasswordDialog: true
    });
  }
  handleDialogPasswordClose = () => {
    this.setState({
      shouldOpenPasswordDialog: false
    })
  }

  openPasswordDialog = () => {
    this.setState({
      shouldOpenPasswordDialog: true
    })
  }
  handleUpdate = (blobValue) => {
    const url = ConstantList.API_ENPOINT + "/api/users/updateavatar";
    let formData = new FormData();
    formData.set('uploadfile', blobValue)
    const config = {
      headers: {
        'Content-Type': 'image/jpg'
      }
    }
    return axios.post(url, formData, config).then(response => {
      let user = response.data;
      this.setState({ user: user });
      authService.setLoginUser(user);
      this.handleDialogClose();
    });
  }

  render() {
    let { t, i18n } = this.props;

    let user = this.state.user;
    return (
      <div className="m-sm-30" t={t} i18n={i18n}>
        <div className="mb-sm-30">
          <GlobitsBreadcrumb routeSegments={[
            { name: t('navigation.systemManagement') },
            { name: t('navigation.manage.personal_info') }
          ]} />
        </div>
        <div className="user-profile__sidenav flex-column flex-middle">
          {this.state.user && this.state.user ? (
            <Avatar
              className="avatar mb-20"
              src={ConstantList.API_ENPOINT + this.state.user.imagePath}
              onClick={this.handleOpenUploadDialog}
            />
          ) :
            (
              <div>
                <Avatar
                  className="avatar mb-20"
                  src={ConstantList.ROOT_PATH + "assets/images/avatar.jpg"}
                  onClick={this.handleOpenUploadDialog}
                />
              </div>
            )}
          {user.displayName}
        </div>
        <Grid className="mb-10" container spacing={3}>
          <Grid item md={4} sm={12} xs={12}>
            <FormControl fullWidth={true}>
              <TextField id="standard-basic" disabled label={t('user.display_name')} value={user.displayName != null ? user.displayName : ''} />
            </FormControl>
          </Grid>

          <Grid item md={4} sm={12} xs={12}>
            <FormControl fullWidth={true}>
              <TextField id="standard-basic" disabled label={t('user.email')} value={user.email != null ? user.email : ''} />
            </FormControl>
          </Grid>

          <Grid item md={4} sm={12} xs={12}>
            <FormControl fullWidth={true}>
              <TextField id="standard-basic" disabled label={t('user.username')} value={user.username != null ? user.username : ''} />
            </FormControl>
          </Grid>
        </Grid>

        <Grid className="mb-10" container spacing={3}>
          <Grid item md={4} sm={12} xs={12}>
            <FormControl disabled fullWidth={true}>
              <InputLabel htmlFor="gender-simple">
                {t('user.gender')}
              </InputLabel>
              <Select
                value={user.person ? user.person.gender : ''}
                onChange={(gender) => this.handleChange(gender, 'gender')}
                inputProps={{
                  name: 'gender',
                  id: 'gender-simple',
                }}
              >
                {ListGender.map((item) => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              className="btn btn-primary"
              onClick={this.handleOpenPasswordDialog}
            >
              {t('user.change_pass')}
            </Button>
          </Grid>
        </Grid>
        {this.state.shouldOpenPasswordDialog && (
          <ChangePasswordDiaglog
            handleClose={this.handleDialogPasswordClose}
            handleUpdate={this.handleUpdate}
            open={this.state.shouldOpenPasswordDialog}
            user={user}
          />
        )}
      </div >
    );
  }
}

export default withStyles({}, { withTheme: true })(UserProfile);
