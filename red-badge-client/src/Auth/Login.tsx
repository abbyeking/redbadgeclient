import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";


type AcceptedProps = {
  updateSessionToken: (newToken: string) => void;
  updateUserRole: (newUserRole: string) => void;
};
type UserState = {
  email: string;
  password: string;
};

export class Login extends Component<AcceptedProps, UserState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

    handleSubmit = (e: any) => {
    if (this.state.email !== "" && this.state.password !== "") {
      e.preventDefault();
      fetch('localhost:3000/user/login', {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        }),
      })
        .then((res) => {
          if (res.status !== 200) {
            throw new Error("Wrong credentials or user does not exist");
          } else return res.json();
        })
        .then((data) => {
          // console.log(data);
          this.props.updateSessionToken(data.sessionToken);
          this.props.updateUserRole(data.user.admin);
          console.log("User successfully logged in");
        })
        .catch((err) => alert(err));
    } else {
      alert("Email and/or Password cannot be blank");
    }
  };
  handleEmailChange = (event: any) => {
    const email = event.target.value;
    this.setState({ email: email });
  };

  handlePasswordChange = (event: any) => {
    const password = event.target.value;
    this.setState({ password: password });
  };

  render() {
    return (
      <div id="loginDiv">
        <h1 id="loginHeading">Login</h1>

        <ValidatorForm
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            width: "35%",
            display: "block",
            backgroundColor: "#FFFFFF",
          }}
          ref="form"
          variant="outlined"
          onSubmit={this.handleSubmit}
          onError={(errors) => console.log(errors)}
        >
          <TextValidator
            label="Username"
            onChange={this.handleEmailChange}
            name="username"
            value={this.state.email}
            validators={["minStringLength:6", "required"]}
            autoComplete="off"
          />
          <TextValidator
            label="Password"
            onChange={this.handlePasswordChange}
            name="password"
            type="password"
            validators={["minStringLength:6", "required"]}
            errorMessages={["this field is required"]}
            value={this.state.password}
          />
          <br />
          <Button variant="contained" onClick={this.handleSubmit}>
            Login
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}