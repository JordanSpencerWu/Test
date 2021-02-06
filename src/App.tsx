import React, { ReactElement } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "normalize.css";

import routes from "./routes";
import Navbar from "components/Navbar";
import { AppStateProvider } from "hooks/useAppState";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

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
        <Container>
          <Switch>{Routes}</Switch>
        </Container>
      </Router>
    </AppStateProvider>
  );
}

export default App;
