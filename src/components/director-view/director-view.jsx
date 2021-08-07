import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './director-view.scss';

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;

    return (
      <Row className="director-view justify-content-md-center">
        <Col md={8} className="director-poster rowGap">
          <img class="directorImage" src={director.ImagePath} />
        </Col>
        <Col md={8} className="director-title rowGap">
          <span className="label">Director: </span>
          <span className="value">{director.Name}</span>
        </Col>
        <Col md={8} className="director-bio rowGap">
          <span className="label">Bio: </span>
          <span className="value">{director.Bio}</span>
        </Col>
        <Col md={8} className="director-birth rowGap">
          <span className="label">Birthdate: </span>
          <span className="value">{director.Birth}</span>
        </Col>
        <Col md={8} className="director-bio rowGap">
          <span className="label">Deathdate: </span>
          <span className="value">{director.Death}</span>
        </Col>
        <Col md={8}>
        <button className="buttonBottom" onClick={() => { onBackClick(null); }}>Back</button>
        </Col>
      </Row>
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
    Death: PropTypes.string,
  }),
  onBackClick: PropTypes.func.isRequired
};
