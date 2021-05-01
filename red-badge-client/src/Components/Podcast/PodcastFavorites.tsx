import React, { Component } from 'react';
import { IResult } from "./Interfaces";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  FormGroup,
  Label,
  Input
} from "reactstrap";

type acceptedProps = {
  token: string;
}

type valueTypes = {
  publisher: string;
  results: any[];
}


export class PodcastFavorites extends Component<acceptedProps, valueTypes> {
  constructor(props: acceptedProps) {
    super(props)
    this.state = {
      publisher: "",
      results: []
    }
  }

  componentDidMount() {
    this.handleSubmit()
  }

handleSubmit = () => {
    console.log(this.props.token)
    if (true) {
      fetch(`http://localhost:3000/podcast/my`, {
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


  updatePodcast = (id: number) => {
    fetch(`http://localhost:3000/podcast/${id}`, {
      method: "PUT",
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: this.props.token
      }),
      body: JSON.stringify({
        publisher: this.state.publisher,
      })
    }).then(() => {
      this.handleSubmit()
    })
  }


  deletePodcast = (id: any) => {
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
        <h1>Saved Searches</h1>
        <br />
        <br />
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
                    {result.publisher ? result.publisher : ""}
                    <br />
                    <input style={{ margin: "0 0 .5rem" }} onChange={(e) => this.setState({ publisher: e.target.value })}></input>
                    <br />
                    <Button onClick={() => { this.updatePodcast(result.id) }}>Update Publishing Company</Button>
                    {/* {result.description ? result.description : ""} */}
                    <br />
                    <br />
                    <Button onClick={() => { this.deletePodcast(result.id) }}>Delete Show</Button>
                    <br />
                    <br />
                    <FormGroup>
                      <Label for="exampleText">Add Notes</Label>
                      <Input type="textarea" name="text" id="exampleText" />
                    </FormGroup>
                    <Button>Save Notes</Button>
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



export default PodcastFavorites