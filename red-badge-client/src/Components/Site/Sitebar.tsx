import React, { Component } from 'react'
import { Link, Redirect, Route, Switch } from 'react-router-dom'
import {
    Nav,
    NavItem,
    NavLink,
    Button,
    NavbarToggler,
    Collapse,
    Navbar,
    NavbarBrand,
    NavbarText
} from 'reactstrap'

type acceptedProps = {
    token: any
    logout: any
}

type valueTypes = {
    isOpen: boolean
}

export default class Sitebar extends Component<acceptedProps, valueTypes> {
    constructor(props: acceptedProps) {
        super(props)
        this.state = {
            isOpen: false
        }
    }

    toggle = () => this.setState({ isOpen: !this.state.isOpen })

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
        return (
            <div>
                <Navbar color="dark" sticky="top" expand="lg">
                    <NavbarBrand id="caster" href="/">Caster</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar ></Collapse>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="/search">Podcast Search</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/savedshows">Saved Shows</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/notes">Notes</NavLink>
                        </NavItem>
                        <NavItem>
                            {/* <Button onClick={this.props.logout}>Logout */}
                            <NavbarText>{this.logoutButton()}</NavbarText>
                            <Link to="/"></Link>
                            {/* </Button> */}
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        )
    }
}

