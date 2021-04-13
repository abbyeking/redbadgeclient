import React, { Component } from 'react'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import Auth from "./Auth/Auth"

type valueTypes = {
  token: any
}


class App extends Component<{}, valueTypes> {
  constructor(props: valueTypes) {
    super(props)
    this.state = {
      token: ""
    }
}

componentDidMount() {
  if(localStorage.getItem("sessionToken")) {
    this.setState({
      token: localStorage.getItem("sessionToken")
    })
  }
}

updateToken = (newToken: any) => {
  localStorage.setItem("sessionToken", newToken)
  this.setState({ token: newToken})
  console.log("is this updating the token", this.state.token)
}


  render() {
    return (
      <div className="App">
       <h1 className='text-green-500'>Hello</h1>
      <Auth token={this.updateToken} />
      </div>
    )
  }
}

export default App

