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

podcastFetch = () => {
    let key:string = "BQBIAKTxpgNzF8rK7kpygRjx4ivHHDe3zHvTugNK5XCXYO1Ky3zrGBj4NhOaNjl3r47D_ADGXueq_Vbvw9AYQNvULYougiNVTBZfmR_6h5nJJyI03Gqc4Kr8arWP0JYyHAhAokc8UFydl00QlMhN"
    fetch(`https://api.spotify.com/v1/search?q=${this.state.searchTerm}&type=show`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + key
        }
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
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
                {this.state.results  ? (
          <PodcastDisplay
            results={this.state.results}
          />
        ) : null}
            </div>
        )
    }
}




