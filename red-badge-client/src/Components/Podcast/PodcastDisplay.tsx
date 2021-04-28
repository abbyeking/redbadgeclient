import { IResult, IName } from "./Interfaces";
import { Component } from "react"

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";

import React from "react";

interface IProps {
  results: IResult[];
  token: any
}

type valueTypes = {
  name: string;
  description: string;
  publisher: string;
}

export default class PodcastDisplay extends Component<IProps, valueTypes> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      name: "",
      description: "",
      publisher: ""
    }
  }

 handleSubmit = (event: any, podcast: any) => {
    event.preventDefault()
    console.log(podcast)
    fetch("http://localhost:3000/podcast/create", {
      method: "POST",
      body: JSON.stringify({
        name: podcast.name,
        images: podcast.images[0].url,
        publisher: podcast.publisher,
        description: podcast.description
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.token
      })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        this.props.token(data.sessionToken)
      }).catch (error => console.log(error))
  }


  // Display = ({results}: IProps) => {
  //   console.log(results)
  render() {
    return (
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {this.props.results.map((result) => {


          return (
            <Card key={result.id} style={{ margin: "2em", width: "30%" }}>
              <CardBody>
                <CardTitle>{result.name}</CardTitle>
                {result.images.length > 1 ? (
                  <CardImg
                    alt="shows"
                    src={result.images[0].url}
                  />
                ) : (
                    ""
                  )}
                <CardSubtitle>
                  <br />
                  {result.publisher ? result.publisher : ""}
                  <br />
                  <br />
                  {result.description ? result.description : ""}
                </CardSubtitle>
                <a href={result.web_url}>
                  <br />
                  <Button onClick={(e) => this.handleSubmit(e, result)}>Save Show</Button>
                </a>
              </CardBody>
            </Card>
          );
        })}
      </div>
    );
  };
}
