import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as movieAPI from "../../../services/Api";
import s from "./castPage.module.css";
import PropTypes from "prop-types";
import noimage from "../../../Images/images/noimage.jpg";

const CastPage = () => {
  const { slug } = useParams();
  const movieId = slug.match(/[a-z0-9]+$/)[0];
  const [cast, setCast] = useState(null);
  // const match = useRouteMatch();
  // const { movieId } = useParams();

  useEffect(() => {
    movieAPI
      .fetchFilmCast(movieId)
      .then((res) => setCast(res.cast))
      .catch((error) => console.log(error));
  }, [movieId]);

  return (
    <>
      <hr />
      {cast && (
        <>
          <ul className={s.castList}>
            {cast.map((actor) => (
              <li key={actor.id} className={s.castListItem}>
                <img
                  className={s.castListItemImg}
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                      : noimage
                  }
                  alt=""
                />
                <p className={s.castListItemInfo}>
                  <span className={s.castListItemTitle}>Name:</span>{" "}
                  {actor.name}
                </p>
                <p className={s.castListItemInfo}>
                  <span className={s.castListItemTitle}>Character:</span>{" "}
                  {actor.character}
                </p>
              </li>
            ))}
            ;
          </ul>
        </>
      )}
      ;
    </>
  );
};
CastPage.propType = {
  cast: PropTypes.array,
  movieId: PropTypes.number,
};

export default CastPage;
