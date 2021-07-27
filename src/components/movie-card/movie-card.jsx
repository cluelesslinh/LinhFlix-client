import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Button, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { setUser } from '../../actions/actions';

import './movie-card.scss';

export class MovieCard extends React.Component {

  handleAdd() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    axios.post(`https://myflixcl.herokuapp.com/users/${user}` + "/movies/" +
      this.props.movie._id, {},
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        this.props.setUser(response.data)
        alert(this.props.movie.Title + " has been added to your favorites!");
      })
  }

  render() {
    const { movie } = this.props;

    return (
      <div className="movieCard">
      <Card>
        <Link to={`/movies/${movie._id}`}>
        <Card.Img variant="top" src={movie.ImagePath}/>
        </Link>
        <Card.Body>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Open</Button>
          </Link>
            <Button onClick={() => this.handleAdd(movie)}>Add to favorite</Button>
        </Card.Body>
      </Card>
    </div>
    );
  }
}

let mapStateToProps = state => {
  return {movies: state.movies, user: state.user }
}

export default connect(mapStateToProps, {setUser})(MovieCard);
