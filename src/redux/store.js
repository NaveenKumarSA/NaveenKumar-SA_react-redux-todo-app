import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";
import taskReducer from "./taskSlice";
import teamReducer from "./teamSlice";
export default configureStore({
  reducer: {
    todos: todoReducer,
/**/       task: taskReducer,
   team: teamReducer,
  },
});
