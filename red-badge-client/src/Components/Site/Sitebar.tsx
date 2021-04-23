import React, { Component } from 'react'
import { Link, Redirect, Route, Switch } from 'react-router-dom'

import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    NavbarText,
  } from 'reactstrap'

type acceptedProps = {
    token: any
    logout: any
    protectedViews: Function
}

export default class Sitebar extends Component<acceptedProps, {}> {
    constructor(props: acceptedProps) {
        super(props)
        this.state = {
            isOpen: false
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
                <Nav>
                <h1>Caster</h1>
                <NavItem>
                    <NavLink href="#">Podcast Search</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">Notes</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink disabled href="#">{this.logoutButton()}</NavLink>
                </NavItem>
                </Nav>
            </div>
        )
    }
}
