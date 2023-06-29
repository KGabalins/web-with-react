import { useState } from "react";
import AvailableMoviesList from "../lists/AvailableMoviesList";
import classes from "./HomePage.module.css";

const HomePage = () => {
  const [allUsers, setAllUsers] = useState(
    JSON.parse(localStorage.getItem("allUsers")) || []
  );
  const [availableMovies, setAvailableMovies] = useState(
    JSON.parse(localStorage.getItem("availableMovies")) || []
  );
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || {}
  );

  // const users = [
  //   {
  //     name: "Raivo Karlis",
  //     surname: "Gabalins",
  //     email: "raivo.k.g@gmail.com",
  //     password: "12345678",
  //     rentedMovies: []
  //   },
  //   {
  //     name: "Test",
  //     surname: "Testing",
  //     email: "test@test.com",
  //     password: "12345678",
  //     rentedMovies: []
  //   }
  // ]

  // localStorage.setItem("allUsers", JSON.stringify(users))

  // const movies = [
  //   {
  //     name: "Batman",
  //     genre: "Action",
  //     price: "2.55$",
  //     stock: "5",
  //   },
  //   {
  //     name: "The Godfather",
  //     genre: "Thriller",
  //     price: "3.99$",
  //     stock: "4",
  //   },
  //   {
  //     name: "The Dark Knight",
  //     genre: "Action and adventure",
  //     price: "5.99",
  //     stock: "2",
  //   },
  //   {
  //     name: "Jaws",
  //     genre: "Action",
  //     price: "2.99$",
  //     stock: "1",
  //   },
  //   {
  //     name: "Star Wars",
  //     genre: "Science fiction",
  //     price: "7.99$",
  //     stock: "0",
  //   },
  //   {
  //     name: "Toy Story",
  //     genre: "Animation",
  //     price: "4.99$",
  //     stock: "2",
  //   },
  //   {
  //     name: "Die Hard",
  //     genre: "Action and adventure",
  //     price: "3.99$",
  //     stock: "5",
  //   },
  //   {
  //     name: "Boyhood",
  //     genre: "Drama",
  //     price: "5.99$",
  //     stock: "4",
  //   },
  // ];

  // localStorage.setItem("availableMovies", JSON.stringify(movies));

  // const curUser =
  //     {
  //       name: "Raivo Karlis",
  //       surname: "Gabalins",
  //       email: "raivo.k.g@gmail.com",
  //       password: "12345678",
  //       rentedMovies: []
  //     }

  //     localStorage.setItem("currentUser", JSON.stringify(curUser))

  function rentMovieHandler(rentedMovieData) {
    const currUser = JSON.parse(localStorage.getItem("currentUser")) || [];
    const avlMovies = JSON.parse(localStorage.getItem("availableMovies")) || [];
    const users = JSON.parse(localStorage.getItem("allUsers")) || [];

    for (let i = 0; i < avlMovies.length; i++) {
      if (
        rentedMovieData.name === avlMovies[i].name &&
        +avlMovies[i].stock > 0
      ) {
        avlMovies[i].stock = +avlMovies[i].stock - 1;
        currUser.rentedMovies.push(rentedMovieData);
        for (let j = 0; j < users.length; j++) {
          if (currUser.email === users[j].email) {
            users[j] = currUser;
            break;
          }
        }
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

  return (
    <div className={classes.main}>
      <h2 className={classes.title}>Available Movies</h2>
      <AvailableMoviesList
        movies={availableMovies}
        user={currentUser}
        onRentMovie={rentMovieHandler}
      />
    </div>
  );
};

export default HomePage;
