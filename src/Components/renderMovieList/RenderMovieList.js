import React from 'react';
import PropTypes from "prop-types";
import { Link, useLocation  } from 'react-router-dom';
import slugify from 'slugify';

const makeSlug = string => slugify(string, { lower: true });

const RenderMovieList = ({movies}) => {
    const location = useLocation();

    return (
        <>
            {movies && (
        <ul>
        {movies.map(movie => (
            <li key={movie.id}>
            <Link 
            to={{
                pathname: `/movies/${makeSlug(`${movie.title} ${movie.id}`)}`,
                state: {
                from: {location, label: 'Go back'},
                },
                } 
            }
            >
            {movie.title}
            </Link>
            </li>
        ))}
        </ul>
    )}
        </>
    );
}

  RenderMovieList.propType = {
  movies: PropTypes.array.isRequiered,  
  };

export default RenderMovieList;
