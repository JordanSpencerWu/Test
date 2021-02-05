import React, { ReactElement, useCallback, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "normalize.css";

import routes from "./routes";
import Navbar from "components/Navbar";
import useAppState from "hooks/useAppState";
import MovieService from "services/MovieService";

function App(): ReactElement {
  const [state, dispatch] = useAppState();

  const fetchMovies = useCallback(async () => {
    const popularMovies = await MovieService.getPopular();

    return popularMovies;
  }, []);

  useEffect(() => {
    fetchMovies();
  });

  const Routes = routes.map((route, index) => (
    <Route
      key={index}
      path={route.path}
      exact={route.exact}
      component={route.component}
    />
  ));

  return (
    <Router>
      <Navbar />
      <Switch>{Routes}</Switch>
    </Router>
  );
}

export default App;
