import React, { ReactElement } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "normalize.css";

import routes from "./routes";
import Navbar from "./components/Navbar/Navbar";

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
    <Router>
      <Navbar />
      <Switch>{Routes}</Switch>
    </Router>
  );
}

export default App;
