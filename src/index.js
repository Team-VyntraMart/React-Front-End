import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Footer from "./components/Footer";
import "./sass/style.scss";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import AuthService from "./services/auth.service";

import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/home";
import Profile from "./components/profile";
import BoardUser from "./components/board-user";
import BoardAdmin from "./components/board-admin";
import UpdateProduct from "./components/update-product";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAdminBoard: false,
      currentUser: undefined
    };
    this.logOut = this.logOut.bind(this);
  }
  
  componentDidMount() {
	    const user_roles = AuthService.getCurrentUser();

	    if (user_roles) {
	      this.setState({
	        currentUser: AuthService.getCurrentUser(),
	        showAdminBoard:AuthService.getCurrentUser().roles.includes("ROLE_ADMIN")
	      });
	    }
  }
  
  logOut() {
	    AuthService.logout();
  }

  render() {
	  const { currentUser, showAdminBoard } = this.state;
	  
    return (
    		<Router>
            <div>
              <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="navbar-nav mr-auto">
                
	               <li className="logo">
	                <Link to={"/"}>
	                  <img src="https://previews.123rf.com/images/sergdibrova/sergdibrova1202/sergdibrova120200023/12346492-letter-v-made-of-grass-isolated-on-white-background-.jpg"
	                	  alt="Brand" height="40" width="40"/>
	                		  
	                </Link>
	               </li>
              
                  <li className="nav-item">
                    <Link to={"/home"} className="nav-link">
                      Home
                    </Link>
                  </li>

                  {showAdminBoard && (
                    <li className="nav-item">
                      <Link to={"/admin"} className="nav-link">
                        Admin Board
                      </Link>
                    </li>
                  )}

                  {currentUser && (
                    <li className="nav-item">
                      <Link to={"/user"} className="nav-link">
                        Checkout
                      </Link>
                    </li>
                  )}
                </div>

                {currentUser ? (
                  <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link to={"/profile"} className="nav-link">
                        {currentUser.username}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <a href="/login" className="nav-link" onClick={this.logOut}>
                        LogOut
                      </a>
                    </li>
                  </div>
                ) : (
                  <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link to={"/login"} className="nav-link">
                        Login
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link to={"/register"} className="nav-link">
                        Sign Up
                      </Link>
                    </li>
                  </div>
                )}
              </nav>

              <div className="container mt-3">
                <Switch>
                  <Route exact path={["/", "/home"]} component={Home} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/profile" component={Profile} />
                  <Route exact path="/user" component={BoardUser} />
                  <Route exact path="/admin" component={BoardAdmin} />
                  <Route exact path="/edit/:id" exact component={UpdateProduct}/>
                  
                </Switch>
             </div>
           </div>
         <Footer />
       </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));