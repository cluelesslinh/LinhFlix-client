import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Link} from "react-router-dom";
import { setMovies, setUser } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';

import './main-view.scss';

class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      user: null
    };
  }

  componentDidMount() {
  let accessToken = localStorage.getItem('token');
  let userToken = localStorage.getItem('user');
  if (accessToken !== null) {
    this.setState({
      user: localStorage.getItem('user'),
      token: localStorage.getItem('token')
    });
    this.getUser(accessToken, userToken);
    this.getMovies(accessToken);
    this.getGenres(accessToken);
    this.getDirectors(accessToken);
   }
  }

  newUser(newData) {
    localStorage.setItem('user', newData.Username);
    this.setState({
      userData: newData,
    });
  }

  getUser(token, user) {
    axios.get('https://myflixcl.herokuapp.com/users/${user.user}', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.props.setUser(response.data);
      this.setState({
        userData: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  getMovies(token) {
  axios.get('https://myflixcl.herokuapp.com/movies', {
    headers: { Authorization: `Bearer ${token}`}
  })
  .then(response => {
    this.props.setMovies(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
}

getGenres(token) {
axios.get('https://myflixcl.herokuapp.com/genres', {
  headers: { Authorization: `Bearer ${token}`}
})
.then(response => {
  this.setState({
    genres: response.data
  });
})
.catch(function (error) {
  console.log(error);
});
}

getDirectors(token) {
axios.get('https://myflixcl.herokuapp.com/directors', {
  headers: { Authorization: `Bearer ${token}`}
})
.then(response => {
  this.setState({
    directors: response.data
  });
})
.catch(function (error) {
  console.log(error);
});
}

  onLoggedIn(authData) {
  console.log(authData);
  this.setState({
    user: authData.user.Username
  });

  localStorage.setItem('token', authData.token);
  localStorage.setItem('user', authData.user.Username);
  this.getMovies(authData.token);
}

onLoggedOut() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  this.setState({
    user: null
  });
}

render() {
   let { movies } = this.props;
   let { user } = this.state;

    return (
      <Router>
        <div className="main-view justify-content-md-center">
          <Navbar
            bg="dark"
            expand="lg"
            sticky="top"
            variant="dark"
            expand="lg"
            className="navbar mb-5 bg-dk"
          >
            <Navbar.Brand href="https://myflixcl.netlify.app/" className="navbar-brand">
              myFlix
          </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
              className="justify-content-end"
              id="basic-navbar-nav"
            >
              {!user ? (
                <ul>
                  <Link to={`/`}>
                    <Button variant="link" className="navbar-link text-light">
                      Login
                  </Button>
                  </Link>
                  <Link to={`/register`}>
                    <Button variant="link" className="navbar-link text-light">
                      Register
                  </Button>
                  </Link>
                </ul >
              ) : (
                <ul>
                  <Link to={`/users/${user}`}>
                    <Button variant="link" className="navbar-link text-light">
                      Profile
                  </Button>
                  </Link>
                  <Link to={`/`}>
                    <Button
                      variant="link"
                      className="navbar-link text-light"
                      onClick={() => this.onLoggedOut()}
                    >
                      Logout
                  </Button>
                  </Link >
                </ul >
              )
              }
            </Navbar.Collapse>
          </Navbar >

          <Row className="justify-content-md-center">

          <Route exact path="/" render={() => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <MoviesList movies={movies}/>;
            }} />
            <Route path="/register" render={() => {
              if (user) return <Redirect to="/" />
              return <Col>
                <RegistrationView />
              </Col>
            }} />

          <Route path="/users/:Username" render={({ history }) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} /></Col>
              return <Col md={12}>
                <ProfileView onLoggedIn={user => this.onLoggedIn(user)}
                  movies={movies} user={user}
                  onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route path="/movies/:movieId" render={({ match, history }) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route path="/directors/:name" render={({ match, history }) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
              </Col>
            }
            } />

            <Route path="/genres/:name" render={({ match, history }) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
              </Col>
            }
            } />
         </Row>
        </div >
      </Router >
    );
  }
}

let mapStateToProps = state => {
  return {movies: state.movies }
}

export default connect(mapStateToProps, { setMovies } )(MainView);
