import React from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import styled from "styled-components";

import { Menu } from "./Menu";
import { CMS } from "./CMS";

const Main = styled.main`
  height: 100%;
  width: 100%;
  max-width: 375px;
  margin: auto;
  display: grid;
  grid-template-rows: 1fr;
`;

export const App = () => {
  return (
    <Router>
      {/* <nav style={{ background: "blue" }}>
          <Link to="/public">Menu</Link>
          <Link to="/cms/menus">CMS</Link>
        </nav> */}
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
