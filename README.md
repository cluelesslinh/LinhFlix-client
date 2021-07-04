# myFlix-client

Client side single page application built with React, Redux, and bootstrap using Rest API and database. Application uses state routing to navigate between interface views.

A visitor can register, login, and view a list of movies.

The user can add movies to their list of favorites and view them on their profile page.

[View App](https://myflixcl.netlify.app/)

## Views and Features

### Login View
- Allows user to login with username and password

### Registration View
- Allows user to register new ID (username, password, email, birthdate)

### Main View
- Returns a list of all movies to the user
- May filter movie list by title
- Ability to select a movie to view more details
- Allows user to add a move to list of favorites

### Movie View
- Returns details about a single movie (image, title, description, genre, director)

### Genre View
- Returns details about single genre (image, genre, description)

### Director View
- Returns details about single director (image, name, bio, birthdate, death-date)

### Profile View
- Allows users to update profile info (username, password, email, birthdate)
- Allows user to deactivate account
- Displays a list of favorite movies
- Allows user to remove a movie from favorite list

Parcel path: parcel src/index.html
