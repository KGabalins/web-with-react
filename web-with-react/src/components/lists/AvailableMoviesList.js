import MovieItem from "../items/MovieItem";
import MovieItemHeader from "../items/MovieItemHeader";

import classes from "./AvailableMoviesList.module.css"

const AvailableMoviesList = (props) => {
  return (
    <>
      <MovieItemHeader />
      {props.movies.map((movie, index) => (
        <MovieItem
          id={index}
          name={movie.name}
          genre={movie.genre}
          price={movie.price}
          stock={movie.stock}
          image={
            +movie.stock > 0 ? (
              <img src={require("../icons/check.png")} alt="available" className={classes.stockIcon} />
            ) : (
              <img src={require("../icons/cross.png")} alt="not-available" className={classes.stockIcon} />
            )
          }
          onRentMovie={props.onRentMovie}
        />
      ))}
    </>
  );
};

export default AvailableMoviesList;
