import React, { Component } from 'react';
import "./Notes.css";
import Note from "./Note";
import axios from "axios"

type acceptedProps = {
  token: any;
}

type valueTypes = {
  notes: string;
  results: any[];
}

export class Notes extends Component<acceptedProps, valueTypes> {
  constructor(props: acceptedProps) {
    super(props)
    this.state = {
      notes: "",
      results: [],
    }
    console.log(this.props.token)
  }


  handleSubmit = () => {
    console.log(this.props.token)
    if (true) {
      fetch(`http://localhost:3000/notes/user`, {
        method: "GET",
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: this.props.token || (localStorage.getItem('sessionToken') as string)
        })
      })
        .then((res) => res.json(),)
        .then((logData) => {
          console.log("hello")
          console.log("this is the data we want", logData)
          this.setState({ results: logData.notes })
        }).catch(error => console.log(error))
    }
  }

  componentDidMount() {
    this.handleSubmit()
  }

  render() {
    return (
      <div>
        <h1>Notes</h1>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {this.state.results?.sort((a, b) => {
            return a.id - b.id
          }).map((result) => {

            return (
              <Note
                handleSubmit={this.handleSubmit}
                token={this.props.token}
                result={result} />
            );
          })}

        </div>
      </div>
    )
  }
}

export default Notes