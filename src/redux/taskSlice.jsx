import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Token from "./Token";
import axios from "axios";

export const getTaskAsync = createAsyncThunk(
  "task/getTaskAsync",
  async (payload) => {
   // console.log(payload);
    var task;
    var config = {
      method: "get",
      url: `https://stage.api.sloovi.com/task/lead_58be137bfde045e7a0c8d107783c4598/${payload.item.id}`,
      headers: {
        Authorization: Token(),
      },
    };
    await axios(config)
      .then(function (response) {
     //   console.log("response.getTodoAsync", response.data.results);
        task = response.data.results;
      })
      .catch(function (error) {
        console.log(error);
      });

    return { task };
  }
);
export const editTaskAsync = createAsyncThunk(
  "task/editTaskAsync",
  async (payload) => {
    console.log(payload);
    var task;
    var data = JSON.stringify({
        assigned_user: payload.user_id,
        task_date: payload.date,
        task_time: payload.time,
        is_completed: 0,
        time_zone: -330,
        task_msg: payload.task_name
      });
      
      var config = {
        method: 'put',
        url: `https://stage.api.sloovi.com/task/lead_58be137bfde045e7a0c8d107783c4598/${payload.id}`,
        headers: { 
          'Authorization': Token(),
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
       // console.log(JSON.stringify(" res data 123123 ",  response.data));
      })
      .catch(function (error) {
        console.log(error);
      });

    return { task };
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState: { isUpdateComponentActice: false, task: {} },
  reducer: {
      updateActive:(state, action)=>{
        
      }
  },
  extraReducers: {
    [getTaskAsync.pending]: (state, action) => {
     // console.log(action);
    },
    [getTaskAsync.fulfilled]: (state, action) => {
      //  console.log(action.payload.todos);
      return action.payload.task;
    },
    [editTaskAsync.fulfilled]: (state, action) => {
       // console.log("edit task async fullfilled", action.payload.task);
        return action.payload.task;
    },
  },
});
export default taskSlice.reducer;
