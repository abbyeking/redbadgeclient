import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { Signup } from "./Signup";
import { Login } from "./Login";

type AcceptedProps = {
  updateSessionToken: (newToken: string) => void;
  updateUserRole: (newUserRole: string) => void;
};

type UserState = {
  showLogin: boolean;
};

export default class Auth extends Component<AcceptedProps, UserState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      showLogin: false,
    };
  }

  loginToggle = (event: any) => {
    event.preventDefault();
    if (this.state.showLogin === false) {
      return this.setState({
        showLogin: true,
      });
    }
    if (this.state.showLogin === true) {
      return this.setState({
        showLogin: false,
      });
    }
  };

  render() {
    return (
      <div className="auth">
        <div id="signuplogin">
          {this.state.showLogin ? (
            <div>
              <Signup
                updateSessionToken={this.props.updateSessionToken}    
                updateUserRole={this.props.updateUserRole}
              />
              {/* <Home /> */}
            </div>
          ) : (
            <div>
              <Login
                updateSessionToken={this.props.updateSessionToken}
                updateUserRole={this.props.updateUserRole}
              />
            </div>
          )}
          <br />
          <Button
            variant="contained"
            onClick={(e) => {
              this.loginToggle(e);
            }}
          >
            {this.state.showLogin ? "Login Here" : "Signup Here"}
          </Button>
          {/* <Home /> */}
        </div>
      </div>
    );
  }
}