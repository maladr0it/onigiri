import React from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import styled from "styled-components";

import { Menu } from "./Menu";
import { CMS } from "./CMS";

const Container = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
`;

const Main = styled.main``;

export const App = () => {
  return (
    <Router>
      <Container>
        <nav>
          <Link to="/">Menu</Link>
          <Link to="/cms">CMS</Link>
        </nav>
        <Main>
          <Switch>
            <Route path="/" exact>
              <Menu />
            </Route>
            <Route path="/cms">
              <CMS />
            </Route>
          </Switch>
        </Main>
      </Container>
    </Router>
  );
};
