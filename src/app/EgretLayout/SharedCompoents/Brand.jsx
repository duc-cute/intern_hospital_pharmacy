import React, { Component } from "react";
import ConstantList from "../../appConfig";
import { Link } from "react-router-dom";
// import { Helmet } from 'react-helmet';

class Brand extends Component {
  state = {};
  render() {
    return (
      <div className="flex flex-middle flex-space-between brand-area">
        <div className="flex flex-middle brand">
          <Link to={{ pathname: ConstantList.REDIRECT_URL }} target="_blank">
            {/* <img src={ConstantList.ROOT_PATH + "assets/images/logo.png"} alt="company-logo" /> */}
            <span className="brand__text">Kho</span>
          </Link>
        </div>
        {this.props.children}
      </div>
    );
  }
}
export default Brand;
