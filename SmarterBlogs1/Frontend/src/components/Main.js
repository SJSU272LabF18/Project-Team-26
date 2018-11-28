import React, { Component } from "react";
import { Route } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import Article from "./Article/Article";
import Autocomplete from "./Autocomplete"
import homescreen from "./homescreen"

class Main extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      <div>
        <Route exact path="/" component={homescreen} />
        <Route exact path="/article" component={Article} />
        <Route exact path="/search" component={Autocomplete} />
      </div>
    );
  }
}

export default Main;
