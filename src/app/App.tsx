import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Menu } from "./Menu";
import { CMS } from "./CMS";

export const App = () => {
  return (
    <Router>
      <h1>APP</h1>
      <nav>
        <Link to="/">Menu</Link>
        <Link to="/cms">CMS</Link>
      </nav>
      <Route path="/" exact>
        <Menu />
      </Route>
      <Route path="/cms">
        <CMS />
      </Route>
    </Router>
  );
};
