import React, { Component } from 'react';
import "./PodcastFavoritesCard.css"
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
  result: any;
  index: any;
  handleSubmit: any;
}

type valueTypes = {
  publisher: string;
  results: any[];
  notes: string;
}


export class PodcastFavoritesCards extends Component<acceptedProps, valueTypes> {
  constructor(props: acceptedProps) {
    super(props)
    this.state = {
      publisher: "",
      notes: "",
      results: []
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
    }).then((res) => res.json())
    .then((data) => {
        console.log(data)
        this.props.handleSubmit()
    })
  }


  deletePodcast = (id: any) => {
    fetch(`http://localhost:3000/podcast/${id}`, {
      method: "DELETE",
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: this.props.token
      })
    }).then(() => {
      this.props.handleSubmit()
    })
  }

  addNotes = ( id: number) => {
    fetch(`http://localhost:3000/notes/${id}`, {
      method: "POST",
      body: JSON.stringify({
        note: this.state.notes
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.token
      })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
      }).catch (error => console.log(error))
  }



  render() {
    return (
      
            <>
              <Card key={this.props.index} style={{margin: "2em",  width: "30%" }}>
                <CardBody>
                  <CardTitle>{this.props.result.name}</CardTitle>
                  {this.props.result.images.length > 1 ? (
                    <CardImg
                      alt="shows"
                      src={this.props.result.images}
                    />
                  ) : (
                      ""
                    )}
                  <CardSubtitle>
                    <br />
                    {this.props.result.publisher ? this.props.result.publisher : ""}
                    <br />
                    <input style={{ margin: "0 0 .5rem" }} onChange={(e) => this.setState({ publisher: e.target.value })}></input>
                    <br />
                    <Button onClick={() => { this.updatePodcast(this.props.result.id) }}>Update Publisher</Button>
                    <br />
                    <br />
                    <FormGroup>
                      <Label for="exampleText">Add Notes</Label>
                      <Input type="textarea" name="text" id="exampleText" value={this.state.notes} onChange={(e) => this.setState({notes: e.target.value})} />
                    </FormGroup>
                    <Button onClick= {() => { this.addNotes(this.props.result.id)}} className="buttonstyles" >Save Notes</Button>
                    <Button onClick={() => { this.deletePodcast(this.props.result.id) }} className="buttonstyles">Delete Show</Button>
                  </CardSubtitle>
                </CardBody>
              </Card>
            
         </>
        
    )
  }
}

export default PodcastFavoritesCards