import React from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import { Button, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { setUser } from '../../actions/actions';

import './movie-card.scss';

export class MovieCard extends React.Component {
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
    const { movie } = this.props;
    const { showModal, modalMessage } = this.state;

    return (
      <div className="movieCard">
        <Card>
          <Link to={`/movies/${movie._id}`}>
            <Card.Img className="movieImg" variant="top" src={movie.ImagePath} />
            <span className="value">{movie.Title}</span>
          </Link>
          <Card.Body>
            <Link to={`/movies/${movie._id}`}>
              <Button variant="link">Open</Button>
            </Link>
            <Button onClick={() => this.handleAdd(movie)}>Add to favorites</Button>
          </Card.Body>
        </Card>

        <Modal show={showModal} onHide={this.handleCloseModal}>
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>{modalMessage}</Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies, user: state.user }
}

export default connect(mapStateToProps, { setUser })(MovieCard);
