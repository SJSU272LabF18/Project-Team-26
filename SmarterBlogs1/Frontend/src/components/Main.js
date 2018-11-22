import React, { Component } from "react";
import { Route } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import Article from "./Article/Article"

class Main extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      <div>
        <Route path="/homepage" component={HomePage} />
        <Route path="/article" component={Article} />
      </div>
    );
  }
}

export default Main;
