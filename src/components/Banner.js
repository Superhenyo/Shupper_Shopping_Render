import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Banner({ data }) {
  const { title, content, destination, label, quotes } = data;

  return (
    <Container className="text-center bannerStyle">
      <Row className="m-0 p-0 ">
        <Col className="m-0 p-0">
            <h1 className="welcomeShoppers">{title}</h1>
            <p className="shopBuyEnjoy" >{content}</p>
            <Link className="btn btn-success m-3 px-5" to={destination}>
              {label}
            </Link>
        </Col>
      </Row >
      <Row className="textContainerStyle2" >
        <p>{quotes}</p>
      </Row>
    </Container >
  );
}
