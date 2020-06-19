import React, { Component } from "react";
import PaypalButtons from "./PaypalButtons";
import UserService from "../services/user.service";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    UserService.getUserBoard();
  }

  render() {
	  //Sorry,the checkout process is not configured yet. 
    return (
      <div className="col-md-12">
        <div className="jumbotron">
        <h3><center>Your payment is being Processed. </center></h3><br></br>
          <h4><PaypalButtons /></h4>
        </div>
      </div>
    );
  }
}