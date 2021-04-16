import React from 'react'
import { FormGroup, Label, Form, Button, Input } from "reactstrap"

let base_url: string = 'https://api.spotify.com/v1/episodes';
const key: string = 'BQCd0Udc9IH7dUklzdGAIDAcLUqE-UTMS00KGtKwxxBBBqgEsFX-Pe51HtdmE-I3oabcdct8-2cijJ8MrBEfah43Tc6pC-79g8f3erUP-I14YJTeSGhZtaKNPS4sVBHrJ0o6E02KW3wOq5VH0uwV'

export interface PodcastMainProps {
    // URL: (newToken: any) => void;
    token: any;
}

export interface PodcastMainState {
    podcast: string
}

class Podcast extends React.Component<PodcastMainProps, PodcastMainState> {
    constructor (props: PodcastMainProps) {       
    super(props);
    this.state={podcast: ''};
    }

onSearch = (e:any) => {
    e.preventDefault();
    fetch(`${base_url}?api-key=${key}&q=${this.state.podcast}`, {

    headers: new Headers({
        'Content-Type': "application/json"
    })
})

    .then((res) => res.json())
    .then((json) => {
        console.log(json)
        this.setState({podcast:json})
            
    })
}


    render() {
        return (
            
            <div>
                <h1>Search for a Podcast</h1>
                <Button onClick={(e) => this.onSearch(e)}>Submit</Button>
            </div>
        )
    }
}

export default Podcast