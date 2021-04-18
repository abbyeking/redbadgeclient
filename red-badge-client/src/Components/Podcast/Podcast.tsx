import React, {Component, SyntheticEvent} from 'react'
import { FormGroup, Label, Form, Button, Input } from "reactstrap";
import PodcastDisplay from "./PodcastDisplay";
import {IResult} from "./Interfaces";

interface IState {
    searchTerm: string
    results: IResult []
}

export default class Podcast extends React.Component<{}, IState> {
    constructor (props: {}) {       
    super(props);
    this.state = {
        searchTerm: "",
        results: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    }

podcastFetch = async () => {
    let base_url: string = 'https://api.spotify.com/v1/episodes';
    const key: string = 'BQCd0Udc9IH7dUklzdGAIDAcLUqE-UTMS00KGtKwxxBBBqgEsFX-Pe51HtdmE-I3oabcdct8-2cijJ8MrBEfah43Tc6pC-79g8f3erUP-I14YJTeSGhZtaKNPS4sVBHrJ0o6E02KW3wOq5VH0uwV'
    let url: string = `${base_url}?api-key=${key}&q=${this.state.searchTerm}`

   console.log(url);

    const response = await fetch (url);
    const data = await response.json();
    this.setState ({
        results: data.response.docs,
    })
};

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
                <h1>Search for a show</h1>
                <Form onSubmit={this.handleSubmit}>
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
                </Form>
                {this.state.results.length > 0 ? (
          <PodcastDisplay
            results={this.state.results}
          />
        ) : null}
            </div>
        )
    }
}



