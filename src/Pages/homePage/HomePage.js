import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import RenderMovieList from "../../Components/renderMovieList/RenderMovieList";
import * as movieAPI from "../../services/Api";
import s from "./homePage.module.css";

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    movieAPI
      .fetchTrendingFilms()
      .then(({ results }) => setMovies(results))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <h2 className={s.sectionTitle}>Trending today</h2>
      <RenderMovieList movies={movies} />
    </>
  );
}

HomePage.propType = {
  movies: PropTypes.array.isRequired,
};
