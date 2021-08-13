import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './genre-view.scss';

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;

    return (
      <Row className="genre-view justify-content-md-center">
        <Col md={8} className="genre-poster rowGap">
          <img className="genreImage" src={genre.ImagePath} />
        </Col>
        <Col md={8} className="genre-title rowGap">
          <span className="label">Genre: </span>
          <span className="value">{genre.Name}</span>
        </Col>
        <Col md={8} className="genre-description rowGap">
          <span className="label">Description: </span>
          <span className="value">{genre.Description}</span>
        </Col>
        <Col md={8}>
        <button className="buttonBottom" onClick={() => { onBackClick(null); }}>Back</button>
        </Col>
      </Row>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }),
  onBackClick: PropTypes.func.isRequired
};
