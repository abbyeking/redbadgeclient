import React, { Component } from 'react'
import Login from "./Login"
import Signup from "./Signup"
import { Button } from 'reactstrap'

type acceptedProps = {
    token: any
}

type valueTypes = {
    login: boolean;
    setLogin: boolean;
    firstName: string;
    lastName: string;
    email: string;
    password: string
}

export default class Auth extends Component<acceptedProps, valueTypes> {
    constructor(props: acceptedProps) {
        super(props)
        this.state = {
            login: true,
            setLogin: false,
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        }
    }

    authTernary = () => {
        return this.state.login ? (
            <Signup token={this.props.token} />
        ) : (
            <Login token={this.props.token} />
        )
    }

    loginToggle = (event: any) => {
        event.preventDefault()
        this.setState({
            login: !this.state.login,
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        })
    }

    render() {
        return (
            <div>
                {this.authTernary()}
                <Button onClick={this.loginToggle}>Toggle</Button>
            </div>

        )
    }
  }