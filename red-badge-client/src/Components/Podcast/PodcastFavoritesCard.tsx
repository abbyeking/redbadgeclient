import React, { Component } from 'react';
import "./PodcastFavoritesCard.css"
import PodcastFavoritesCards from "./PodcastFavoritesCards";


type acceptedProps = {
  token: string;
  result: any;
  index: any;
  handleSubmit: () => void
}

type valueTypes = {
  publisher: string;
  results: any[];
  notes: string;
}


export class PodcastFavoritesCard extends Component<acceptedProps, valueTypes> {
  constructor(props: acceptedProps) {
    super(props)
    this.state = {
      publisher: "",
      notes: "",
      results: []
    }
  }

  render() {
    return (
      
            <>
            <PodcastFavoritesCards 
            handleSubmit={this.props.handleSubmit}
            token={this.props.token}
            index={this.props.index}
            result={this.props.result} />
         </>
        
    )
  }
}

export default PodcastFavoritesCard