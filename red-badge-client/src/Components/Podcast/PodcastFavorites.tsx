import React, { Component } from 'react';
import {
   Card,
   CardImg,
   CardText,
   CardBody,
   CardTitle,
   CardSubtitle,
   Button,
 } from "reactstrap";

type acceptedProps = {
   token: any;
   favorites: any
}

type valueTypes = {
   publisher: string;
 }


export class PodcastFavorites extends Component<acceptedProps, valueTypes> {
   constructor(props: acceptedProps) {
      super(props)
      this.state = {
         publisher: ""
       }
   }

   handleSubmit = (id: any) => {
    fetch(`http://localhost:3000/podcast/user/${id}`, {
        method: "GET",
        headers: new Headers ({
            'Content-Type': 'application/json',
            Authorization: this.props.token
        })
    })
    .then((res) => {res.json},)
    .then((data) => {
      console.log(data)
    }).catch (error => console.log(error))
}


   updatePodcast = (id: any) => {
      fetch(`http://localhost:3000/podcast/${id}`, {
          method: "PUT",
          headers: new Headers ({
              'Content-Type': 'application/json',
              Authorization: this.props.token
          }),
         body:JSON.stringify({
            publisher: publisher,
         })
      }).then(() => {
         this.handleSubmit
      })
    }


    deletePodcast = (id: any) => {
        fetch(`http://localhost:3000/podcast/${id}`, {
            method: "DELETE",
            headers: new Headers ({
                'Content-Type': 'application/json',
                Authorization: this.props.token
            })
        })
        .then(() => {
           this.handleSubmit
        })
      }


   render() {
      <div style={{ display: "flex", flexWrap: "wrap" }}>
            {this.props.favorites.map((favorites) => {
            
      return(
            <Card key={favorites.id} style={{ margin: "2em", width: "30%" }}>
              <CardBody>
                <CardTitle>{favorites.name}</CardTitle>
                {favorites.images.length > 1 ? (
                  <CardImg
                    alt="shows"
                    src={favorites.images[0].url}
                  />
                ) : (
                    ""
                  )}
                <CardSubtitle>
                  <br />
                  {favorites.publisher ? favorites.publisher : ""}
                  <br />
                  <br />
                  {favorites.description ? favorites.description : ""}
                </CardSubtitle>
                <a href={favorites.web_url}>
                  <br />
                </a>
              </CardBody>
            </Card>
          );
         })}
         </div>
     };
   }


export default PodcastFavorites