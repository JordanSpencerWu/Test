import React, { ReactElement } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "normalize.css";

import routes from "./routes";
import Navbar from "components/Navbar";
import { AppStateProvider } from "hooks/useAppState";

function App(): ReactElement {
  const Routes = routes.map((route, index) => (
    <Route
      key={index}
      path={route.path}
      exact={route.exact}
      component={route.component}
    />
  ));

  return (
    <AppStateProvider>
      <Router>
        <Navbar />
        <Switch>{Routes}</Switch>
      </Router>
    </AppStateProvider>
  );
}

export default App;
