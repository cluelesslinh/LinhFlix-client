import React from 'react';
import { Link } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';

import './genre-list.scss';

export class GenreList extends React.Component {
  render() {
    const { genres, onBackClick } = this.props;

    return (
      <Row className="genre-list justify-content-md-center">
        {genres.map((genre) =>
          <Col md={8} className="rowGap" key={genre.Name}>
            <Link className="linkButton" to={`/genres/${genre.Name}`}>
             <span className="label">{genre.Name}</span>
           </Link>
          </Col>
        )}
        <Col md={8}>
         <button className="buttonBottom" onClick={() => { onBackClick(null); }}>Back</button>
        </Col>
      </Row>
  )}}
