import React, { Component } from 'react';
import "./Notes.css";
import Note from "./Note";

type acceptedProps = {
  token: string;
}

type valueTypes = {
  notes: string;
  results:  any[];
}

export class Notes extends Component<acceptedProps, valueTypes> {
  constructor(props: acceptedProps) {
    super(props)
    this.state = {
      notes: "",
      results: [],
    }
  }

  componentDidMount() {
    this.handleSubmit()
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


  render() {
    return (
      <div>
        <h1>Notes</h1>
           <div style={{ display: "flex", flexWrap: "wrap" }}>
        {this.state.results?.sort((a,b) => {
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