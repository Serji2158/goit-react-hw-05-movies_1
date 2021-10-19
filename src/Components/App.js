import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "react-loader-spinner";
import Header from "./header/Header";
const HomePage = lazy(() =>
  import("../Pages/homePage/HomePage" /* webpackChunkName: "HomePage" */)
);
const MoviePage = lazy(() =>
  import("../Pages/moviePage/MoviePage" /* webpackChunkName: "MoviePage" */)
);
const MovieDetailsPage = lazy(() =>
  import(
    "../Pages/movieDetailsPage/MovieDetailsPage" /* webpackChunkName: "MovieDetailsPage" */
  )
);
const NotFoundPage = lazy(() =>
  import(
    "../Pages/notFoundPage/NotFoundPage" /* webpackChunkName: "NotFoundPage" */
  )
);

export default function App() {
  return (
    <>
      <ToastContainer autoClose={3000} />
      <Header />
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
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/movies" exact>
            <MoviePage />
          </Route>

          <Route path="/movies/:slug">
            <MovieDetailsPage />
          </Route>

          <Route>
            <NotFoundPage />
          </Route>

          {/* <Redirect to="/" /> */}
        </Switch>
      </Suspense>
    </>
  );
}
