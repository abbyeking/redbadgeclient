import React, { Component } from 'react'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import Auth from "./Auth/Auth"
import Sitebar from './Components/Site/Sitebar'
import Podcast from './Components/Podcast/Podcast'
import Notes from './Components/Notes/Notes'
import PodcastFavorites from './Components/Podcast/PodcastFavorites'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

type valueTypes = {
  token: any,
}


class App extends Component<{}, valueTypes> {
  constructor(props: valueTypes) {
    super(props)
    this.state = {
      token: ""
    }
}

componentDidMount() {
  const localToken = (localStorage.getItem("sessionToken"))
  if(localToken) {
    this.setState({
      token: localToken
    })
  } console.log(localToken)
}

updateToken = (newToken: any) => {
  localStorage.setItem("sessionToken", newToken)
  this.setState({ token: newToken})
  console.log("is this updating the token", this.state.token)
}


clearToken (){
  localStorage.clear();
  this.setState({ token: '' })
  console.log('token cleared')
}

// protectedViews = () => {
//   return this.state.token === localStorage.getItem("sessionToken") ? (
//     <Podcast token={this.state.token} />
//   ) : (
//     <Auth token={this.updateToken} />
//   )
// } 

  render() {
    return (
      <div className="App">
      <Router>
       <Sitebar logout={this.clearToken.bind(this)} token={this.state.token} />
       {/* {this.protectedViews()} */}
        <Switch>
          <Route exact path="/">
            {this.state.token === localStorage.getItem("sessionToken") ? (
              <Redirect to="/search" />
            ) : (
              <Auth token={this.updateToken} />
            )}
          </Route>
          <Route exact path="/savedshows">
            <PodcastFavorites token={this.state.token} />
          </Route>
          <Route exact path="/search">
            <Podcast token={this.state.token} />
          </Route>
          <Route exact path="/notes">
            <Notes token={this.state.token} />
          </Route>
        </Switch>
      </Router>
      </div>
    )
  }
}

export default App
