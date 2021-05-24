import React from "react";
// import logo from "./logo.svg";
// import { Counter } from "./features/counter/Counter";
import "./App.css";
import TodoAppWrapper from "./features/todos/TodoAppWrapper";
import { Grid } from "@material-ui/core";
function App() {
  return (
    <Grid container className="main-wrapper-container">
      <Grid item xs={12} sm={12} md={2} className="appSideBar"></Grid>
      <Grid item xs={12} sm={12} md={3} className="appMainBar">
        <TodoAppWrapper />
      </Grid>
      <Grid item xs={12} sm={12} md={7}></Grid>
    </Grid>
  );
}

export default App;
