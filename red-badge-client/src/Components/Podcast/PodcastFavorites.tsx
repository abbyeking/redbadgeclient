import React, { Component } from 'react';
import PodcastFavoritesCard from './PodcastFavoritesCard';

type acceptedProps = {
  token: string;
}

type valueTypes = {
  publisher: string;
  results: any[];
  notes: string;
}


export class PodcastFavorites extends Component<acceptedProps, valueTypes> {
  constructor(props: acceptedProps) {
    super(props)
    this.state = {
      publisher: "",
      notes: "",
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
      <>
        <h1>Saved Searches</h1>
        <br />
        <br />
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {this.state.results.map((result, index) => (
            <PodcastFavoritesCard
              token={this.props.token}
              result={result}
              index={index} />
          ))}
        </div>
      </>
    )
  }
}



export default PodcastFavorites