import { Button, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAssigneeAsync } from "../../redux/teamSlice";
import { addTodoAsync, getTodoAsync } from "../../redux/todoSlice";
//import { addTodo, addTodoAsync, getAssigneeAsync } from "./redux/TodoSlice";
/* import { axiosGetTeam, handleAxios } from "./handleApi";
import Token from "./Api/Token";
import { getUser } from "./Api/getUser"; */

//team_list = getTeamList();
export default function TodoApp(props) {
  const dispatch = useDispatch();
  var task_name,
    date,
    time,
    user = "";
  const [isTaskComponentActive, setisTaskComponentActive] = useState(false);
  const team = useSelector((state) => state.team);
  useEffect(() => {
    // console.log("getAsynd", getAssigneeAsync());
    dispatch(getAssigneeAsync());
  }, [dispatch]);
  const todos = useSelector((state) => state.todos);
  useEffect(() => {
    dispatch(getTodoAsync());
  }, [dispatch]);

  // console.log("TEAM", team);
  const setDate = (e) => {
    e.preventDefault();
    date = e.target.value;
    // console.log("date hai ", typeof date);
  };
  const setTime = (e) => {
    e.preventDefault();
    time = parseInt(e.target.value);
    //   console.log("time hai ", time);
  };
  const setTaskname = (e) => {
    e.preventDefault();
     task_name = e.target.value;
    // console.log("task_name ", task_name);
  };
  const setUser = (e) => {
    e.preventDefault();
    user = e.target.value;
    //  console.log("user ", e.target.value);
  };
  const handleSave = () => {
    // alert("handle save is being called ");
    dispatch(
      addTodoAsync({
        id: Date.now(),
        assigned_user: user === "" ? team[0].name : user,
        date: date,
        time: time,
        task_name: task_name,
      })
    );
  };
  return (
    <div className="task-container-wrapper">
      <div className="task-count-addbutton-wrapper">
        <div className="taskcount">Task : {todos.length}</div>
        <div
          className="add-task-button"
          onClick={() => {
            setisTaskComponentActive(true);
          }}
        >
          <Button> + </Button>
        </div>
      </div>
      {isTaskComponentActive && (
        <div className="task-details-wrapper">
          <div className="task-details">
            <p className="task-title">Task Desctiption</p>
            <input
              required
              type="text"
              onChange={(e) => {
                setTaskname(e);
              }}
              name="todos"
              id=""
            />
          </div>
          <Grid container className="date-Time" spacing={2}>
            <Grid item xs={12} sm={12} md={6} className="date-Time-left">
              <p className="task-title">Date</p>
              <input
                type="date"
                onChange={(e) => {
                  setDate(e);
                }}
                name="todos"
                id=""
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} className="date-Time-right">
              <p className="task-title">Time</p>
              <input
                type="time"
                onChange={(e) => {
                  setTime(e);
                }}
                name="todos"
                id=""
              />
            </Grid>
          </Grid>
          <div className="assign-user-details">
            <p>Assign User</p>
            <select
              required
              name=""
              id=""
              onChange={(e) => {
                setUser(e);
              }}
            >
              {/* <option value="naveen">Naveen</option>
              <option value="danny">Danny </option>
              <option value="nandy">Nandy</option>*/}
              {team.map((item, key) => {
                return (
                  <option
                    key={key}
                    onChange={() => {
                      // console.log(item);
                    }}
                    value={item.name}
                  >
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="action-container">
            <button
              className="cancel-option"
              onClick={() => {
                setisTaskComponentActive(false);
              }}
            >
              Cancel
            </button>
            <button
              className="save-option"
              onClick={() => {
                setisTaskComponentActive(false);
                handleSave();
              }}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
