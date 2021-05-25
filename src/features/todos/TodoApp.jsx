import { Button, Grid } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTaskAsync, editTaskAsync } from "../../redux/taskSlice";
import { getAssigneeAsync } from "../../redux/teamSlice";
import {
  addTodoAsync,
  getTodoAsync,
  removeTodoAsync,
} from "../../redux/todoSlice";
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
  const [isAddTaskComponentActive, setisAddTaskComponentActive] =
    useState(false);
  const [isEditComponentActive, setisEditTaskComponentActive] = useState(false);
  const [isTodoListReady/* , setisTodoListReady */] = useState(true);
  const team = useSelector((state) => state.team);
  //const task = useSelector((state) => state.task);
  const [taskDetails, settaskDetails] = useState({});
  useEffect(() => {
    dispatch(getAssigneeAsync());
  }, [dispatch]);
  const todos = useSelector((state) => state.todos);
  useEffect(() => {
    dispatch(getTodoAsync());
  }, [dispatch]);
  const handleDeleteAction = (item) => {
    dispatch(removeTodoAsync({ item })).then(()=>{

      setTimeout(()=>{}, 2000);
      window.location.reload() 
    });
  };
  const handleEditAction = (item) => {
    dispatch(getTaskAsync({ item }))
      .then((res) => {
        settaskDetails(res.payload.task)
      })
      .then(() => {
        setisAddTaskComponentActive(false);
        setisEditTaskComponentActive(true);
      });
    setTimeout(() => {
    }, 1000);
  };
  /* local functions */
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
  const handleEditSave = () => {
    // alert("handle save is being called ");
    dispatch(
      editTaskAsync({
        id: taskDetails.id,
        user_id: taskDetails.user_id,
        assigned_user: user === "" ? taskDetails.task_msg : user,
        date: date===""? taskDetails.task_date: date ,
        time: time===""? taskDetails.task_time: time,
        task_name: task_name===""? taskDetails.task_name: task_name,
      })
    ).then(()=>{
      //setisTodoListReady(false)
        //console.log("update pending! ")
       // window.location.reload()
      }).then(()=>{
        setTimeout(()=>{window.location.reload()}, 1000) 
      
        //console.log("update completed! ")
       // window.location.reload()
      });
  };
  return (
    <>
      <>
        {isTodoListReady && <div className="list-component">
          {todos.map((item, key) => {
            return (
              <div className="task-List" key={key}>
                <div className="task-list-item-left">
                  {" "}
                  <div className="assignee_Image">
                    <img
                      src="http://www.gravatar.com/avatar/5ac4b72175c1f95ae2e99d5edaf09164?default=https%3A%2F%2Fhellomail-images-new.s3-ap-southeast-1.amazonaws.com%2Favatar-default-icon.png"
                      width="25px"
                      height="25px"
                      alt=""
                    />
                  </div>
                  <div className="name-and-date">
                    <h3>{item.task_msg}</h3>
                    <h5>{item.task_date}</h5>
                  </div>
                </div>
                <div className="task-list-item-right">
                  <span>
                    <EditIcon
                      onClick={() => {
                        handleEditAction(item);
                      }}
                    />
                  </span>
                  {/* <span>
                    <DeleteIcon
                      onClick={() => {
                        handleDeleteAction(item);
                      }}
                    />
                  </span> */}
                </div>
              </div>
            );
          })}
        </div>}
      </>
      <div className="task-container-wrapper">
        <div className="task-count-addbutton-wrapper">
          <div className="taskcount">Task : {todos.length}</div>
          <div
            className="add-task-button"
            onClick={() => {
              setisAddTaskComponentActive(true);
              setisEditTaskComponentActive(false);
            }}
          >
            <Button> + </Button>
          </div>
        </div>
        {isAddTaskComponentActive && (
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
                  setisAddTaskComponentActive(false);
                }}
              >
                Cancel
              </button>
              <button
                className="save-option"
                onClick={() => {
                  setisAddTaskComponentActive(false);
                  handleSave();
                }}
              >
                Save
              </button>
            </div>
          </div>
        )}
        {/* add component ends here  */}
        {isEditComponentActive && (
          <div className="task-details-wrapper">
            <div className="task-details">
              <p className="task-title">Task Desctiption</p>
              <input
                required
                
                defaultValue={taskDetails.task_msg}
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
                  defaultValue={taskDetails.task_date}
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
                  defaultValue={taskDetails.task_time}
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
                defaultValue={taskDetails.user_name}
                name=""
                id=""
                onChange={(e) => {
                  setUser(e);
                }}
              >
                {/* <option defaultValue="naveen">Naveen</option>
              <option defaultValue="danny">Danny </option>
              <option defaultValue="nandy">Nandy</option>*/}
                {team.map((item, key) => {
                  return (
                    <option
                      key={key}
                      onChange={() => {
                        // console.log(item);
                      }}
                      defaultValue={item.name}
                    >
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="editaction-container">
              <div className="action-container-left">
                 <span>
                    <DeleteIcon
                      onClick={() => {
                        setisEditTaskComponentActive(false);
                        handleDeleteAction(taskDetails);
                      }}
                    />
                  </span> 
              </div>
              <div className="action-container-right"><button
                className="cancel-option"
                onClick={() => {
                  setisEditTaskComponentActive(false);
                }}
              >
                Cancel
              </button>
              <button
                className="save-option"
                onClick={() => {
                  setisEditTaskComponentActive(false);
                  handleEditSave();
                }}
              >
                Update
              </button></div>
              
            </div>
          </div>
        )}
      </div>
    </>
  );
}
