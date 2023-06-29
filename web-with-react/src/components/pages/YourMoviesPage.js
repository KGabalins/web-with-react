import { useState } from "react";

import classes from "./YourMoviesPage.module.css";
import YourMoviesList from "../lists/YourMoviesList";

const YourMoviesPage = () => {
  const [allUsers, setAllUsers] = useState(
    JSON.parse(localStorage.getItem("allUsers")) || []
  );
  const [availableMovies, setAvailableMovies] = useState(
    JSON.parse(localStorage.getItem("availableMovies")) || []
  );
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || {}
  );
  const currUser = JSON.parse(localStorage.getItem("currentUser")) || [];
  const avlMovies = JSON.parse(localStorage.getItem("availableMovies")) || [];
  const users = JSON.parse(localStorage.getItem("allUsers")) || [];

  function removeMovieHandler(removedMovieData) {

    currUser.rentedMovies.splice(removedMovieData.id, 1);
    for (let i = 0; i < avlMovies.length; i++) {
      if (removedMovieData.name === avlMovies[i].name) {
        avlMovies[i].stock = +avlMovies[i].stock + 1;
        break;
      }
    }
    for (let i = 0; i < users.length; i++) {
      if (currUser.email === users[i].email) {
        users[i] = currUser;
        break;
      }
    }

    localStorage.setItem("currentUser", JSON.stringify(currUser));
    setCurrentUser(currUser);

    localStorage.setItem("availableMovies", JSON.stringify(avlMovies));
    setAvailableMovies(avlMovies);

    localStorage.setItem("allUsers", JSON.stringify(users));
    setAllUsers(users);
  }

  function changeTimeHandler(movie) {
    const movieId = movie.substr(0,1)
    const action = movie.substr(1)
    let currTime = currUser.rentedMovies[movieId].time

    
    if (action === "-") {
      if(currTime !== 0) {
        currTime -= 12
      }
    } else {
      if(currTime !== 168) {
        currTime += 12
      }
    }

    currUser.rentedMovies[movieId].time = currTime

    setCurrentUser(currUser)
    localStorage.setItem("currentUser" ,JSON.stringify(currUser))
  }

  return (
    <div className={classes.main}>
      <h2 className={classes.title}>Your movies</h2>
      <YourMoviesList
        movies={currentUser.rentedMovies}
        onRemoveMovie={removeMovieHandler}
        onChangeTime={changeTimeHandler}
      />
    </div>
  );
};

export default YourMoviesPage;
