import React, { useContext, useState } from "react";
import {
  ArrowClockwise,
  CheckCircleFill,
  Circle,
  Trash,
} from "react-bootstrap-icons";

import {useCheckTodo, useDeleteTodo, useAddNewTodo } from "./firebase/CRUDoperations";
import moment from "moment";
import { TodoContext } from "../contexts/UserContext";


const Todo = ({ todo}) => {
  const [hover, setHover] = useState(false);

  const {selectedTodo, setSelectedTodo} = useContext(TodoContext)

  const manageAddNewTodo = useAddNewTodo()
  const manageDeleteTodo = useDeleteTodo()
  const manageCheckTodo = useCheckTodo()

  const deleteTodo = (todo) => {
    manageDeleteTodo(todo);

    // To hide the edit todo if opened
    if (selectedTodo === todo){
      setSelectedTodo(undefined)
    }
  };

  const todoCheckedEvent = (todo) => {
    manageCheckTodo(todo);
    // console.log(todo.id)
  };

  const repeatTodoNextday = (todo) => {
    const nextDate = moment(todo.date, "DD/MM/YYYY").add(1, "days");
    
    const newTodo = {
      ...todo,
      date: moment(nextDate).format("DD/MM/YYYY"),
      checked: false,
      day: moment(nextDate).format('d'),
    };

    delete newTodo.id
    
    manageAddNewTodo(newTodo)
  };

  return (
    <div className="Todo">
      <div
        className="todo-container"
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
      >
        <div className="check-todo" onClick={() => todoCheckedEvent(todo)}>
          {todo.checked ? (
            <span className="checked">
              <CheckCircleFill color="#bebebe" />
            </span>
          ) : (
            <span className="unchecked">
              <Circle color={todo.color} />
            </span>
          )}
        </div>

        <div className="text"
          onClick={() => {setSelectedTodo(todo)}}
        >
          <p style={{ color: todo.checked ? "#bebebe" : "#000000" }}>
            {todo.text}
          </p>
          <span style={{ color: todo.checked ? "#bebebe" : "#000000" }}>
            {todo.date} - {todo.time} - {todo.projectName}
          </span>
          <div className={`line ${todo.checked ? "line-through" : ""}`}></div>
        </div>

        {(todo.checked || hover) && (
          <>
            <div
              className="add-to-next-day"
              onClick={() => repeatTodoNextday(todo)}
            >
              <span>
                <ArrowClockwise />
              </span>
            </div>
            <div className="delete-todo" onClick={() => deleteTodo(todo)}>
              <span>
                <Trash />
              </span>
            </div>
          </>
        )}

        {/* <div className="add-to-next-day">
          {todo.checked && (
            <span>
              <ArrowClockwise />
            </span>
          )}
        </div>

        <div className="delete-todo">
          {(todo.checked || hover) && (
            <span>
              <Trash />
            </span>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default Todo;
