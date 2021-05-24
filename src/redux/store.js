import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";
import teamReducer from "./teamSlice";
export default configureStore({
  reducer: {
    todos: todoReducer,
    team: teamReducer,
  },
});
