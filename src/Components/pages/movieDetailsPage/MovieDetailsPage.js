import { useState, useEffect, Suspense } from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import { useParams, useLocation, useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";
import PropTypes from "prop-types";
import * as movieAPI from "../../../services/Api";
import CastPage from "../castPage/CastPage";
import ReviewPage from "../reviewPage/ReviewPage";
import s from "../movieDetailsPage/movieDetailsPage.module.css";

const MovieDetailsPage = () => {
  // const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const { slug } = useParams();
  const movieId = slug.match(/[a-z0-9]+$/)[0];
  const match = useRouteMatch();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    movieAPI.fetchFilmDetails(movieId).then(setMovie);
  }, [movieId]);

  const onGoBack = () => {
    history.push(location?.state?.from?.location ?? "/");
  };

  return (
    <>
      {movie && (
        <>
          <button className={s.goBackBtn} type="button" onClick={onGoBack}>
            {location?.state?.from?.label ?? "Go Back"}
          </button>

          <div className={s.filmPage}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.original_title}
              className={s.filmImg}
            />
            <div className={s.filmInfo}>
              <h2>
                {movie.original_title} ({movie.release_date.substring(0, 4)})
              </h2>
              <p>User score: {movie.vote_average}</p>
              <h3>Overview:</h3>
              <p>{movie.overview}</p>
              <h4>Genres:</h4>
              <ul className={s.filmGenres}>
                {movie.genres.map((genre) => (
                  <li key={genre.id} className={s.filmGenre}>
                    {" "}
                    {genre.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <hr />

          <nav className={s.nav}>
            <h3 className={s.addInfoTitle}>Additional information</h3>
            <Link
              to={{
                pathname: `${match.url}/cast`,
                state: {
                  from: {
                    location: location.state.from.location,
                    label: "Go back",
                  },
                },
              }}
            >
              Cast
            </Link>

            <Link
              to={{
                pathname: `${match.url}/review`,
                state: {
                  from: {
                    location: location.state.from.location,
                    label: "Go back",
                  },
                },
              }}
            >
              Review
            </Link>
            <hr />
          </nav>
          <Suspense
            fallback={
              <div>
                <Loader
                  type="ThreeDots"
                  color="orange"
                  height={60}
                  width={100}
                  timeout={2000}
                />
              </div>
            }
          >
            <Switch>
              <Route path={`${match.path}/cast`} exact>
                <CastPage />
              </Route>

              <Route path={`${match.path}/review`} exact>
                <ReviewPage />
              </Route>

              {/* <Redirect to={`/movies/${movieId}`} /> */}
            </Switch>
          </Suspense>
        </>
      )}
    </>
  );
};

MovieDetailsPage.propType = {
  movie: PropTypes.array,
  movieId: PropTypes.number,
};

export default MovieDetailsPage;
