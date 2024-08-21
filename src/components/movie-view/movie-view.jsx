import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";

import './movie-view.scss';

export class MovieView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      modalMessage: ''
    };
  }

  handleAdd() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    axios.post(`https://linhflixdb.adaptable.app/users/${user}/movies/${this.props.movie._id}`, {},
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        console.log(response);
        this.setState({
          modalMessage: `${this.props.movie.Title} has been added to your favorites!`,
          showModal: true
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({
          modalMessage: 'An error occurred while adding the movie to your favorites.',
          showModal: true
        });
      });
  }

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { movie, onBackClick } = this.props;
    const { showModal, modalMessage } = this.state;

    return (
      <>
        <Row className="movie-view justify-content-md-center">
          <Col md={14} className="movie-poster rowGap">
            <img height="450px" src={movie.ImagePath} />
          </Col>
          <Col md={8} className="movie-title rowGap">
            <span className="label">Title: </span>
            <span className="value">{movie.Title}</span>
          </Col>
          <Col md={8} className="movie-description rowGap">
            <span className="label">Description: </span>
            <span className="value">{movie.Description}</span>
          </Col>
          <Col md={8} className="movie-genre rowGap">
            <Link className="linkButton" to={`/genres`}>
              <span className="label">Genre: </span>
            </Link>
            <Link className="linkButton" to={`/genres/${movie.Genre.Name}`}>
              <span className="value">{movie.Genre.Name}</span>
            </Link>
          </Col>
          <Col md={8} className="movie-director rowGap">
            <Link className="linkButton" to={`/directors`}>
              <span className="label">Director: </span>
            </Link>
            <Link className="linkButton" to={`/directors/${movie.Director.Name}`}>
              <span className="value">{movie.Director.Name}</span>
            </Link>
          </Col>
          <Col md={8}>
            <button className="buttonBottom" onClick={() => { onBackClick(null); }}>Back</button>
            <button className="buttonBottom" onClick={() => this.handleAdd()}>Add to favorite</button>
          </Col>
        </Row>

        <Modal show={showModal} onHide={this.handleCloseModal}>
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>{modalMessage}</Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}