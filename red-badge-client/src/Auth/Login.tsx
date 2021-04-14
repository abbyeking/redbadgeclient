import React, { Component } from "react"
import { FormGroup, Label, Form, Button, Input } from "reactstrap"

type acceptedProps = {
    token: any
}

type valueTypes = {
    email: string,
    password: string
}

export default class Login extends Component<acceptedProps, valueTypes> {
    constructor(props: acceptedProps) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = (event: any) => {
        event.preventDefault()
        fetch('http://localhost:3000/user/login', {
            method: 'POST',
            body: JSON.stringify({
                user:{email: this.state.email,
                password: this.state.password}
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then(res => res.json())
        .then(data => {
            this.props.token(data.sessionToken)
            console.log(data);
        })
    }

    render() {
        return(
            <div>
                <h4>Login</h4>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="email">Email</Label>
                        <Input name="email" type="text" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value})} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="password">Password</Label>
                        <Input name="password" type="password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value})} />
                    </FormGroup>
                    <Button type="submit" color="primary">Login</Button>
                </Form>
            </div>
        )
    }
}