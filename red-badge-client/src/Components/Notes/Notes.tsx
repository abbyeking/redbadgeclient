import React, { Component } from 'react';
import { IResult } from "../Podcast/Interfaces";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";

type acceptedProps = {
  token: string;
  result: string;
  index: any;
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
      results: []
    }
  }

  handleSubmit = (pid: any) => {
    console.log(this.props.token)
    if (true) {
      fetch(`http://localhost:3000/podcast/${pid}`, {
        method: "GET",
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: this.props.token || (localStorage.getItem('sessionToken') as string)
        })
      })
        .then((res) => res.json(),)
        .then((logData) => {
          console.log("this is the data we want", logData)
          this.setState({ results: logData.podcasts })
        }).catch(error => console.log(error))
    }
  }


  updateNotes = (id: number) => {
    fetch(`http://localhost:3000/podcast/${id}`, {
      method: "PUT",
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: this.props.token
      }),
      body: JSON.stringify({
        notes: this.state.notes,
      })
    }).then(() => {
      this.handleSubmit
    })
  }


  deleteNotes = (id: any) => {
    fetch(`http://localhost:3000/podcast/${id}`, {
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
        {this.state.results.map((result) => {


          return (
            <Card key={result.id} style={{ margin: "2em", width: "30%" }}>
              <CardBody>
                <CardTitle>{result.name}</CardTitle>
                {result.images.length > 1 ? (
                  <CardImg
                    alt="shows"
                    src={result.images}
                  />
                ) : (
                    ""
                  )}
                <CardSubtitle>
                  <br />
                  {result.notes ? result.notes : ""}
                  <br />
                  <br />
                </CardSubtitle>
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