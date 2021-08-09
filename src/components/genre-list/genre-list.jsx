import React from 'react';
import { Link } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';

import './genre-list.scss';

export class GenreList extends React.Component {
  render() {
    const { onBackClick } = this.props;

    return (
      <Row className="genre-list justify-content-md-center">
        <Col md={8} className="rowGap">
          <Link className="linkButton" to={`/genres/Action`}>
           <span className="label">Action</span>
         </Link>
        </Col>
        <Col md={8} className="rowGap">
          <Link className="linkButton" to={`/genres/Animation`}>
           <span className="label">Animation</span>
         </Link>
        </Col>
        <Col md={8} className="rowGap">
          <Link className="linkButton" to={`/genres/Comedy`}>
           <span className="label">Comedy</span>
         </Link>
        </Col>
        <Col md={8} className="rowGap">
          <Link className="linkButton" to={`/genres/Fantasy`}>
           <span className="label">Fantasy: </span>
          </Link>
        </Col>
        <Col md={8} className="rowGap">
          <Link className="linkButton" to={`/genres/Martial%20Arts`}>
           <span className="label">Martial Arts</span>
          </Link>
        </Col>
        <Col md={8} className="rowGap">
          <Link className="linkButton" to={`/genres/Thriller`}>
           <span className="label">Thriller</span>
         </Link>
        </Col>
        <Col md={8}>
        <button class="buttonBottom" onClick={() => { onBackClick(null); }}>Back</button>
        </Col>
      </Row>
  )}}
