import React, { Component } from 'react'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import Auth from "./Auth/Auth"
import Sitebar from './Components/Site/Sitebar'
import Podcast from './Components/Podcast/Podcast'

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

clearToken = () => {
  localStorage.clear();
  this.setState({ token: '' })
  console.log('token cleared')
}

protectedViews = () => {
  return this.state.token === localStorage.getItem("sessionToken") ? (
    <Podcast token={this.state.token} />
  ) : (
    <Auth token={this.updateToken} />
  )
} 

  render() {
    return (
      <div className="App">
       {/* <h1 className='text-green-500'>Caster</h1> */}
       <Sitebar logout={this.clearToken} token={this.state.token} />
       {this.protectedViews()}
      </div>
    )
  }
}

export default App
