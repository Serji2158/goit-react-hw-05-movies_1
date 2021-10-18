import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import s from "../pages/MoviePage.module.css";
import * as movieAPI from '../../services/Api';
import RenderMovieList from '../../Helpers/RenderMovieList';
import { toast } from "react-toastify";
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string'


const MoviePage = () => {
  const [query, setQuery] = useState("");
  const [films, setFilms] = useState([]);
  const history = useHistory();
  const location = useLocation();

  const handleQueryChange = (e) => {
    setQuery(e.currentTarget.value.toLowerCase());
  };


    const handleSubmit = (e) => {
    e.preventDefault();

    if (query.trim() === "") {
      return toast.info("Put your query,please !", {
        position: toast.POSITION.TOP_LEFT,
      });
    }

  movieAPI.fetchSearchingFilms(query)
  .then((res) =>
  setFilms(res.results));
  history.push({pathname: location.pathname, search: `query=${query}`})
  };

    useEffect(() => {
    const parsed = queryString.parse(location.search);
    if(parsed){      
    movieAPI.fetchSearchingFilms(parsed.query).then((res) =>
    setFilms(res.results));  
    setQuery(parsed.query);  
    }
    
  }, [location.search])


  return (
    <>
      <form className={s.searchForm} onSubmit={handleSubmit}>
        <input
          className={s.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search films"
          onChange={handleQueryChange}
          value={query}
        />

        <button type="submit" className={s.searchFormButton}>
          <span className={s.searchFormButtonLabel}>Search</span>
        </button>
      </form>

      <RenderMovieList movies={films} />
      </>
  );
};

MoviePage.propType = {
  query: PropTypes.string,
  films: PropTypes.string,
  };

export default MoviePage;
