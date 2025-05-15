import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "../components/Navbar";

// Screens
import Modeler from "../screens/Modeler";

class Routes extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Modeler} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
