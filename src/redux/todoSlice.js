import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Token from "./Token";
import axios from "axios";

export const getTodoAsync = createAsyncThunk("todos/getTodoAsync", async () => {
  var todos;
  var config = {
    method: "get",
    url: "https://stage.api.sloovi.com/task/lead_58be137bfde045e7a0c8d107783c4598",
    headers: {
      Authorization: Token(),
    },
  };
  await axios(config)
    .then(function (response) {
      console.log("response.getTodoAsync", response.data.results);
      todos = response.data.results;
    })
    .catch(function (error) {
      console.log(error);
    });

  return { todos };
});
/* add item to the end point */
export const addTodoAsync = createAsyncThunk(
  "todos/addTodoAsync",
  async (payload) => {
    console.log("payload", payload);
    var todo;
    var config = {
      method: "POST",
      url: "https://stage.api.sloovi.com/task/lead_58be137bfde045e7a0c8d107783c4598",
      headers: {
        Authorization: Token(),
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        assigned_user: payload.assigned_user,
        task_date: payload.date,
        task_time: payload.time,
        is_completed: 0,
        time_zone: 6568,
        task_msg: payload.task_name,
      }),
    };
    console.log("add Check", config.body);
    await axios(config)
      .then(function (response) {
        console.log(JSON.stringify("post response", response));
        todo = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    return { todo };
  }
);
/* remove item from the end point */
export const removeTodoAsync = createAsyncThunk(
  "todos/removeTodoAsync",

  async (payload) => {
    var todo = payload.item;
    console.log("remove payload", todo);
    var config = {
      method: "delete",
      url: `https://stage.api.sloovi.com/task/lead_58be137bfde045e7a0c8d107783c4598/${payload.item.id}`,
      headers: {
        Authorization: Token(),
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
    return { todo };
  }
);
const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducer: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        task_name: action.payload.task_name,
        task_date: action.payload.task_date,
      };
      state.push(newTodo);
    },
  },
  extraReducers: {
    [getTodoAsync.pending]: (state, action) => {
      console.log("fetching todo List");
    },
    [getTodoAsync.fulfilled]: (state, action) => {
      console.log(action.payload.todos);
      return action.payload.todos;
    },
    [addTodoAsync.fulfilled]: (state, action) => {
      console.log(action.payload.todo);
      state.push(action.payload.todo.results);
    },
    [removeTodoAsync.fulfilled]: (state, action) => {
      console.log("action .payload. ", action.payload.todo.id);
      console.log("state ",state);
      console.log("state.pop ",state.pop());
      // console.log("state.filter ",state.filter((todo)=> todo.id !== action.payload.todo.id));
      /* state.map((todo) => {
        console.log(todo);
         todo.id !== action.payload.todo.id;
        return "";    });  */
  
    },
  },
});
export const { addTodo } = todoSlice.actions;
export default todoSlice.reducer;
