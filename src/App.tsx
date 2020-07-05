/** @format */

import React from "react";
import "./App.css";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  CssBaseline,
  ThemeProvider,
  createMuiTheme,
  AppBar,
  Toolbar,
} from "@material-ui/core";
import HomePage from "./components/pages/home/HomePage";
import HomeProvider from "./components/models/HomeContext";
import { cyan, blue } from "@material-ui/core/colors";
import DetailPage from "./components/pages/detail/DetailPage";
import DetailProvider from "./components/models/DetailContext";

const theme = createMuiTheme({
  palette: {
    primary: cyan,
    secondary: blue,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <HomeProvider>
        <Router>
          <CssBaseline />
          <Switch>
            <Route path="/" exact>
              <HomePage />
            </Route>
            <Route path="/detail/:id" exact>
              <DetailProvider>
                <DetailPage />
              </DetailProvider>
            </Route>
          </Switch>
        </Router>
      </HomeProvider>
    </ThemeProvider>
  );
}

export default App;
