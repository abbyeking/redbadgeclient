import React, { Component } from 'react';
import {
    Card,
    CardBody,
    CardTitle,
    Button,
    Input
} from "reactstrap";

type acceptedProps = {
    token: string;
    result: any;
    handleSubmit: any
}

type valueTypes = {
    note: string;
    results: any[];
}

export class Note extends Component<acceptedProps, valueTypes> {
    constructor(props: acceptedProps) {
        super(props)
        this.state = {
            note: "",
            results: [],
        }
    }

    updateNotes = (id: any) => {
        fetch(`http://localhost:3000/notes/${id}`, {
            method: "PUT",
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: this.props.token
            }),
            body: JSON.stringify({
                note: this.state.note,
            })
        }).then((res) => res.json())
            .then((data) => {
                console.log(data)
                this.props.handleSubmit()
            })
    }

    deleteNotes = (id: any) => {
        fetch(`http://localhost:3000/notes/${id}`, {
          method: "DELETE",
          headers: new Headers({
            'Content-Type': 'application/json',
            Authorization: this.props.token
          })
        })
          .then(() => {
            this.props.handleSubmit()
          })
      }

render(){
    
    return(

        <Card key = { this.props.result.id } style = {{ margin: "2em", width: "30%" }}>
            <CardBody>
                <CardTitle>{this.props.result.podcast.publisher}: </CardTitle>
                    <p>{this.props.result.note}</p>
                        <Input type="textarea" style={{ margin: "0 0 .5rem" }} onChange={(e) => this.setState({ note: e.target.value })}></Input>
                    <br />
                    <Button onClick={() => {
                    console.log(this.props.result.id)
                    this.updateNotes(this.props.result.id)
                    }} className="button">Update Note</Button>
                    <Button onClick={() => { this.deleteNotes(this.props.result.id) }} className="button">Delete Note</Button>
            </CardBody>
        </Card >
        
    )
}
}

export default Note