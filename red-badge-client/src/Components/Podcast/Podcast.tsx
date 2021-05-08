import React, {Component, SyntheticEvent} from 'react'
import { FormGroup, Label, Form, Button, Input, Card, CardImg, CardText, CardBody,
    CardTitle, Row, Col} from "reactstrap";
import PodcastDisplay from "./PodcastDisplay";
import {IResult} from "./Interfaces";

interface IState {
    searchTerm: string
    results: IResult []
}
interface IProps {
    token: any
}

export default class Podcast extends React.Component<IProps, IState> {
    constructor (props: IProps) {       
    super(props);
    this.state = {
        searchTerm: "",
        results: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    }

podcastFetch = () => {
    let key:string = "BQConM51c-iC4IFWHyHSN8N5pTdqqRwc0-wT-5AFfz26pUe_9ZoWcIucY0CbTVzf0tnFFFELrXR_6DzMg8n5ip0GUQcGMWA6oNb9nKvB8snolvZLscBDbJQrWpptn0NAw2KBeF2q0iTBBtEa0Aji"
    fetch(`https://api.spotify.com/v1/search?q=${this.state.searchTerm}&type=show`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + key
        }
    })
    .then((res) => res.json())
    .then((data) => {
        this.setState ({
            results: data.shows.items
        })
    })
}

handleSubmit (event: SyntheticEvent):void {
    event.preventDefault();
    this.podcastFetch();
  }
  handleChange(event: SyntheticEvent):void {
    const input = event.target as HTMLInputElement;
    console.log(input.name, input.value);
    this.setState(
      (prevstate: IState)=>
      ({ ...prevstate, [input.name]: input.value} as IState
      )
    );
  }


    render() {
        return (
            <div>
                <br />
                <br />
                <br />
                <br />
                <h1>Search show by genre</h1>
                <Form onSubmit={this.handleSubmit}>
                <Row className="justify-content-lg-center">
                    <Col lg="5">
                    <FormGroup>
                        <Label for="searchTerm"></Label>
                        <Input 
                        type="text"
                        id="searchTerm"
                        name="searchTerm"
                        value={this.state.searchTerm}
                        onChange = {this.handleChange}
                        />
                    </FormGroup>
                    <Button type="submit">Search</Button>
                    </Col>
                    </Row>
                </Form>
                
                {this.state.results  ? (
          <PodcastDisplay 
            results={this.state.results}
            token={this.props.token}
          />
          ) : null}
          </div>
      )
  }
}






