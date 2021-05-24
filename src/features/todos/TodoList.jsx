import React, { useEffect/* , useState  */} from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
//import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getTodoAsync, removeTodoAsync } from "../../redux/todoSlice";

export default function TodoList() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  useEffect(() => {
    dispatch(getTodoAsync());
  }, [dispatch]);
  const handleDeleteAction = (item) => {
  //  console.log("handle delete action ", item);
    dispatch(removeTodoAsync({ item }));
  };
 // console.log("todos inside ", todos);
  return (
    <div className="list-component">
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
                <EditIcon />
              </span>
              <span>
                <DeleteIcon
                  onClick={() => {
                    handleDeleteAction(item);
                  }}
                />
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
