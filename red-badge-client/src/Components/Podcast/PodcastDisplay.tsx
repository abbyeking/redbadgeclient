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
  console.log(results)
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {results.map((result) => {


  return (
          <Card key={result.id} style={{ margin: "2em", width: "30%" }}>
            <CardBody>
              <CardTitle>{result.name}</CardTitle>
              {result.images.length > 1 ? (
                <CardImg
                  alt="shows"
                  src={result.images[0].url}
                />
              ) : (
                ""
              )}
              <CardSubtitle>
                <br />
                {result.description ? result.description : ""}
              </CardSubtitle>
              <a href={result.web_url}>
                <br />
                <Button>Save Show</Button>
              </a>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
};

export default PodcastDisplay;