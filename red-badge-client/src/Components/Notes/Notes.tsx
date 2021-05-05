import React, { Component } from 'react';
import { IResult } from "../Podcast/Interfaces";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";

type acceptedProps = {
  token: string;
  // result: string;
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

  updateNotes = (id: number) => {
    fetch(`http://localhost:3000/notes/${id}`, {
      method: "PUT",
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: this.props.token
      }),
      body: JSON.stringify({
        notes: this.state.notes,
      })
    }).then(() => {
      this.handleSubmit()
    })
  }


  deleteNotes = (id: any) => {
    fetch(`http://localhost:3000/notes/${id}`, {
      method: "DELETE",
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: this.props.token
      })
    })
      .then(() => {
        this.handleSubmit
      })
  }


  render() {
    return (
      <div>
        <h1>Notes</h1>
           <div style={{ display: "flex", flexWrap: "wrap" }}>
        {this.state.results?.map((result) => {


          return (
            <Card key={result.id} style={{ margin: "2em", width: "30%" }}>
              <CardBody>
                <CardTitle>{result.podcast.publisher}: </CardTitle>
                <p>{result.note}</p>
                <input style={{ margin: "0 0 .5rem" }} onChange={(e) => this.setState({ notes: e.target.value })}></input>
                <br />
                <Button onClick={() => { this.updateNotes(result.id) }}>Update Note</Button>
                <br />
                <br />
                <Button onClick={() => { this.deleteNotes(result.id) }}>Delete Note</Button>
              </CardBody>
            </Card>
          );
        })}
        
      </div>
      </div>
    )
  }
}



export default Notes