import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";


type UserState = {
  email: string;
  password: string;
};

type AcceptedProps = {
  updateSessionToken: (newToken: string) => void;
  updateUserRole: (newUserRole: string) => void;
};

export class Signup extends Component<AcceptedProps, UserState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = (e: any) => {
    if (
      this.state.email !== "" &&
      this.state.password !== ""
    ) {
      e.preventDefault();
      fetch('localhost:3000/user/signup', {
        method: "POST",
        body: JSON.stringify({
          username: this.state.email,
          password: this.state.password,
          admin: "false",
        }),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.props.updateSessionToken(data.sessionToken);
        });
    } else {
      alert("None of the fields can be empty");
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
      <div id="signupDiv">
        <h1 id="signupHeading">Sign Up to Join</h1>

        <ValidatorForm
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            width: "35%",
            display: "block",
            backgroundColor: "#FFFFFF",
          }}
          ref="form"
          onSubmit={this.handleSubmit}
          onError={(errors) => console.log(errors)}
        >
          <TextValidator
            label="Email"
            onChange={(e) => this.handleEmailChange(e)}
            name="Email"
            value={this.state.email}
            validators={["required"]}
            errorMessages={[
              "this field is required",
            ]}
            autoComplete="off"
          />
          <TextValidator
            label="Password"
            onChange={this.handlePasswordChange}
            name="password"
            value={this.state.password}
            type="password"
            validators={["minStringLength:6", "required"]}
            errorMessages={[
              "password should be more than 5 letters",
              "this field is required",
            ]}
          />
          <br />
          <Button variant="contained" onClick={this.handleSubmit}>
            Sign Up
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}