import React, { Component } from 'react'
// import { render } from 'react-dom'

type acceptedProps = {
    token: any
    logout: any
}

export default class Navbar extends Component<acceptedProps, {}> {
    constructor(props: acceptedProps) {
        super(props)
        this.state = {

        }
    }

    logoutButton = () => {
        return localStorage.getItem('sessionToken') === null
        ? (
            ''
        )
        : (
            <button onClick={this.props.logout}>Logout</button>
        )
    }

    render() {
        return(
            <div>
                {this.logoutButton()}
            </div>
        )
    }
}