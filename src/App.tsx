import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";

import { Menu } from "./Menu";
import { CMS } from "./CMS";

const Main = styled.main`
  height: 100%;
  width: 100%;
  max-width: 375px;
  margin: auto;
  display: grid;
  grid-template-rows: auto 1fr;
  grid-gap: 0.5rem;
`;

export const App = () => {
  return (
    <Router>
      <Main>
        <Switch>
          <Route path="/public/:date?">
            <Menu />
          </Route>
          <Route path="/cms">
            <CMS />
          </Route>
        </Switch>
      </Main>
    </Router>
  );
};
