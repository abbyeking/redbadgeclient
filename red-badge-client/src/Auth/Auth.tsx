import React, { Component } from 'react'
import Login from "./Login"
import Signup from "./Signup"
import { Button } from 'reactstrap'


type acceptedProps = {
    token: (any: string | null) => void
}

type valueTypes = {
    login: boolean;
    setLogin: boolean;
    email: string;
    password: string
}

export default class Auth extends Component<acceptedProps, valueTypes> {
    constructor(props: acceptedProps) {
        super(props)
        this.state = {
            login: true,
            setLogin: false,
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
            email: "",
            password: ""
        })
    }

    render() {
        return (
            <div>
                {this.authTernary()}
                <Button onClick={this.loginToggle}>Already a user?</Button>
            </div>
        )
    }
  }