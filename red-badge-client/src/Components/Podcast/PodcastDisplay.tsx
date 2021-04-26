import {IResult, IName} from "./Interfaces";

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";

import React from "react";

interface IProps{
  results: IResult[];
}
const PodcastDisplay = ({results}: IProps) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {results.map((result) => {


  return (
          <Card key={result.id} style={{ margin: "2em", width: "30%" }}>
            <CardBody>
              <CardTitle>{result.shows.items.name}</CardTitle>
              {result.shows.images.length > 1 ? (
                <CardImg
                  alt="shows"
                  src={`https://api.spotify.com/v1/search/${result.images[1].url}`}
                />
              ) : (
                ""
              )}
              <CardSubtitle>
                <br />
                {result.name.length > 0 ? " Name: " : ""}
              </CardSubtitle>
              {result.name.map((Name: IName) => (
                <CardText key={name}>{name}</CardText>
              ))}
              <a href={result.web_url}>
                <Button>Listen</Button>
              </a>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
};

export default PodcastDisplay;