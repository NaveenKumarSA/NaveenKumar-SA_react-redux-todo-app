import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
var axios = require("axios");

export const getAssigneeAsync = createAsyncThunk(
  "todos/getAssigneeAsync",
  async () => {
    var team;
    var config = {
      method: "get",
      url: "https://stage.api.sloovi.com/team",
      headers: {
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjE2ODY4NDAsIm5iZiI6MTYyMTY4Njg0MCwianRpIjoiN2M5OTFkMTktNjM2Ny00ODcxLThlODYtNWM5NzI2ZmVmYTcxIiwiaWRlbnRpdHkiOnsibmFtZSI6IlNhcmF2YW5hbiAyMyBUZXN0aW5nIiwiZW1haWwiOiJzbWl0aGNoZXJ5bEB5YWhvby5jb20iLCJ1c2VyX2lkIjoidXNlcl85NzlmMjM1OGM3NTU0YzgwOWQwZDY4ODk0M2I4OTY2YiIsImNvbXBhbnlfaWQiOiJjb21wYW55X2RmMTUzNTU4NGE4YzRjNmE5OGZjOTM5Y2UxMDVjMWE2IiwiaWNvbiI6Imh0dHBzOi8vd3d3LmdyYXZhdGFyLmNvbS9hdmF0YXIvYWRlNTIwN2Q1YjQyYzVkYTU5NWVkZDc4MTg5ZDc3MTciLCJieV9kZWZhdWx0Ijoib3V0cmVhY2gifSwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.Bnc2QMsGCxAZ3J__SOpW7hvrZc-qylscIxjH7yTmB88",
      },
    };

    await axios(config)
      .then(function (response) {
      // console.log(response.data.results);
        team = response.data.results;
      })
      .catch(function (error) {
        console.log(error);
      });
    return { team };
  }
);
const teamSlice = createSlice({
  name: "team",
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
    [getAssigneeAsync.fulfilled]: (state, action) => {
   //   console.log("action.payload", action.payload.team);
      return action.payload.team;
    },
  },
});
export const { addTodo } = teamSlice.actions;
export default teamSlice.reducer;
