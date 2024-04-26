import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { setUserData } from "../redux/actions/UserActions";
import jwtAuthService from "../services/jwtAuthService";
import localStorageService from "../services/localStorageService";
import history from "history.js";
import ConstantList from "../appConfig";
import axios from "axios";
import { toast } from "react-toastify";

let timeout;

class Auth extends Component {
  state = {
    getUserComplete: false,
  };

  constructor(props) {
    super(props);
    axios.interceptors.response.use(
      response => {
        //2 tiếng nếu không có request thì tự động logout
        if (timeout) {
          clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
          toast.warning('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại.');
          jwtAuthService.setSession(null);
          jwtAuthService.removeUser();
          setTimeout(() => jwtAuthService.logout(), 3000)
        }, 7200000)
        return response
      },
      error => {
        if (401 === error?.response?.status) {
          toast.warning('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại.');
          jwtAuthService.setSession(null);
          jwtAuthService.removeUser();
          jwtAuthService.logout();
          return Promise.reject(error);
        }
        return Promise.reject(error);
      }
    );

    if (ConstantList.AUTH_MODE === "Keycloak") {
      let userToken = localStorageService.getItem("auth_token");
      if (userToken != null) {
        jwtAuthService.setSession(userToken);
        jwtAuthService.getCurrentUser().then((user) => {
          this.props.setUserData(user);
        }).finally(() => {
          this.setState({ getUserComplete: true });
        })
      } else {
        history.push(ConstantList.LOGIN_PAGE)
      }
    } else {
      let user = localStorageService.getItem("auth_user");

      if (user != null) {
        jwtAuthService.setSession(user.token);
        this.props.setUserData(user);
      } else {
        history.push(ConstantList.LOGIN_PAGE)
      }
    }
  }

  render() {
    const { children } = this.props;
    if (ConstantList.AUTH_MODE === "Keycloak") {
      const { getUserComplete } = this.state;

      return (getUserComplete && <>{children}</>);
    }

    return <>{children}</>
  }
}

const mapStateToProps = state => ({
  setUserData: PropTypes.func.isRequired,
  login: state.login
});

export default connect(mapStateToProps, { setUserData })(Auth);