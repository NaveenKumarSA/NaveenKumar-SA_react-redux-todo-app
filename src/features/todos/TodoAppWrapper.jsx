import { /*  Button,  CircularProgress,*/ Grid } from "@material-ui/core";
import React, { Component } from "react";
import TodoApp from "./TodoApp";
// import TodoList from "./TodoList";

export default class TodoAppWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isReady: true,
      isRefreshed: true,
    };
  }
  /*   handleRefresh = () => {
    this.setState({ isRefreshed: false });
    setTimeout(() => {
      this.setState({ isRefreshed: true });
    }, 200);
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isReady: true });
    }, 3000);
   
  } */

  render() {
    return (
      <Grid container className="todo-stack">
        {this.state.isReady && (
          <>
            <TodoApp />
          </>
        )}
      </Grid>
    );
  }
}
