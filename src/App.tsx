import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "normalize.css";

import routes from "./routes";
import Navbar from "components/Navbar";
import { AppStateProvider } from "hooks/useAppState";

const NAVBAR_HEIGHT = 64;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: calc(100% - ${NAVBAR_HEIGHT}px);
`;

function App(): ReactElement {
  const Routes = routes.map((route, index) => <Route key={index} {...route} />);

  return (
    <AppStateProvider>
      <Router>
        <Container>
          <Navbar />
          <PageContainer>
            <Switch>{Routes}</Switch>
          </PageContainer>
        </Container>
      </Router>
    </AppStateProvider>
  );
}

export default App;
