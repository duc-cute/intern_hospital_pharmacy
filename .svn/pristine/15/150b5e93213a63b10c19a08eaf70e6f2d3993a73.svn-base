import React, { Component, memo } from "react";
import AppContext from "app/appContext";

class AuthGuard extends Component {
  constructor(props, context) {
    super(props);
    let { routes } = context;

    this.state = {
      routes
    };
  }

  shouldComponentUpdate(_, nextState) {
    return nextState.routes !== this.state.routes;
  }

  render() {
    let { children } = this.props;

    return <>{children}</>;
  }
}

AuthGuard.contextType = AppContext;
export default memo(AuthGuard);