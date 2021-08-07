import React from 'react';

import './genre-list.scss';

export class GenreList extends React.Component {
  render() {
    const { onBackClick } = this.props;

    return (
      <Row className="genre-list justify-content-md-center">
       <Col>
         <h1>hello</h1>
       </Col>
        <button className="buttonBottom" onClick={() => { onBackClick(null); }}>Back</button>
      </Row>
  )}}
