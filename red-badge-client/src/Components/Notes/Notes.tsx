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

  handleSubmit = (event: any, id: any, notes: any) => {
    event.preventDefault()
    fetch(`http://localhost:3000/notes/user/${id}`, {
      method: "POST",
      body: JSON.stringify({
        notes: notes
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.token
      })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
      }).catch (error => console.log(error))
  }


  render() {
    return (
      <div>
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