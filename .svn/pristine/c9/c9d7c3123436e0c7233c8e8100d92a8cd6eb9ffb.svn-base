import React from "react";
import { Button } from "@material-ui/core";
import Config from "app/appConfig";
import { NavLink } from "react-router-dom";

class NotFound extends React.PureComponent {
  render() {
    let { t } = this.props;

    return (
      <div className="flex flex-center flex-middle w-100 h-100vh">
        <div className="flex flex-column flex-center flex-middle" style={{ maxWidth: "320px" }}>
          <img className="mb-32" src="/assets/images/illustrations/404.svg" alt="" />
          <Button
            className="capitalize"
            variant="contained"
            color="primary"
            component={NavLink}
            to={Config.HOME_PAGE}
          >
            {t('general.to_homepage')}
          </Button>
        </div>
      </div>
    );
  }
}

export default NotFound;
