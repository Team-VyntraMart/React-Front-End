import React, { Component } from "react";

import UserService from "../services/user.service";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    UserService.getUserBoard();
  }

  render() {
	  
    return (
      <div className="col-md-12">
        <div className="jumbotron">
          <h3>Sorry, the checkout process is not configured yet. </h3>
        </div>
      </div>
    );
  }
}