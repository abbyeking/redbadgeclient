import React, { Component, SyntheticEvent } from 'react'
import { FormGroup, Label, Form, Button, Input } from "reactstrap"

// interface Props {
    
// }
interface State {
    searchTerm: string
}

export default class Podcast extends Component<{}, State> {
    constructor (props: {}) {       
    super(props);
    this.state={
        searchTerm: "",
    };
    this.handleSubmit =this.handleSubmit.bind (this);
    }

    spotifyFetch = async () => {
        let base_url: string = 'https://api.spotify.com/v1/episodes';
            const key: string = 'BQCd0Udc9IH7dUklzdGAIDAcLUqE-UTMS00KGtKwxxBBBqgEsFX-Pe51HtdmE-I3oabcdct8-2cijJ8MrBEfah43Tc6pC-79g8f3erUP-I14YJTeSGhZtaKNPS4sVBHrJ0o6E02KW3wOq5VH0uwV'
        let url: string = `${base_url}?api-key=${key}&q=${this.state.searchTerm}`;

        console.log(url);

        const response = await fetch(url);
        const data = await response.json();
            this.setState({
        results: data.response.docs,
    })
  };

  handleSubmit (event: SyntheticEvent): void {
      event.preventDefault();
      this.spotifyFetch();
  }

    

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="searchTerm">Enter a search term</Label>
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
            </div>
        )
    }
}

