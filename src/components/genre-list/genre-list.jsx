import React from 'react';
import { Link } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';

import './genre-list.scss';

export class GenreList extends React.Component {
  render() {
    const { onBackClick } = this.props;

    return (
      <Row className="genre-list justify-content-md-center">
        {genres.map((genre) =>
          <Col md={8} className="rowGap">
            <Link className="linkButton" to={`/genres/${genre.Name}`} key="_id">
             <span className="label">{genre.Name}</span>
           </Link>
          </Col>
        )}
        <Col md={8}>
         <button class="buttonBottom" onClick={() => { onBackClick(null); }}>Back</button>
        </Col>
      </Row>
  )}}
