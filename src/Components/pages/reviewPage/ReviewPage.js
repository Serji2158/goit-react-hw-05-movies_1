import { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { useParams } from 'react-router-dom';
import * as movieAPI from '../../../services/Api';

const ReviewPage = () => {
// const { movieId } = useParams();
const { slug } = useParams();
const movieId = slug.match(/[a-z0-9]+$/)[0];
const [results, setResults] = useState(null);
  

    useEffect(() => {
        movieAPI.fetchFilmReview(movieId).then(res => setResults(res.results));
    }, [movieId]);
    
        return (
        <>
        <hr/>
        {results && (
        <>
            <ul>
            {results.map((result) => 
            <li key={result.id}>
            <p>{result.author}</p>
            <p>{result.content}</p>
            </li>
            )}
            </ul>
        </>)
        }
        </>            
        );
}

  ReviewPage.propType = {
  results: PropTypes.array,
  movieId:PropTypes.string,
  };

export default ReviewPage;