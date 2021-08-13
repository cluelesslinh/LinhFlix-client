import React from 'react';
import { Link } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';

import './director-list.scss';

export class DirectorList extends React.Component {
  render() {
    const { directors, onBackClick } = this.props;

    return (
      <Row className="director-list justify-content-md-center">
        {directors.map((director) =>
          <Col md={8} className="rowGap" key={director.Name}>
            <Link className="linkButton" to={`/directors/${director.Name}`}>
             <span className="label">{director.Name}</span>
           </Link>
          </Col>
        )}
        <Col md={8}>
         <button className="buttonBottom" onClick={() => { onBackClick(null); }}>Back</button>
        </Col>
      </Row>
  )}}
