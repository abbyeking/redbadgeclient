import React, { Component } from 'react'
import Login from "./Login"
import Signup from "./Signup"
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'


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
        return this.state.login 
        ? <Login token={this.props.token} />
        : <Signup token={this.props.token} />
      }

    loginToggle = () => {
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
                <Link
                    to=''
                    className='no-underline text-black hover:text-black'
                    onClick={this.loginToggle}
                >
                    Don't have an account?
            </Link>
            </div>
        )
    }
}