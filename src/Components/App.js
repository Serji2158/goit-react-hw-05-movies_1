import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router";
import { ToastContainer } from "react-toastify";
import Loader from "react-loader-spinner";
import Header from "./header/Header";
const HomePage = lazy(() =>
  import("./pages/HomePage" /* webpackChunkName: "HomePage" */)
);
const MoviePage = lazy(() =>
  import("./pages/MoviePage" /* webpackChunkName: "MoviePage" */)
);
const MovieDetailsPage = lazy(() =>
  import(
    "./pages/movieDetailsPage/MovieDetailsPage" /* webpackChunkName: "MovieDetailsPage" */
  )
);
const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage" /* webpackChunkName: "MovieDetailsPage" */)
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
