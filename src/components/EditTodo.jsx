import React, { useContext, useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import { TodoContext } from "../contexts/UserContext";
import moment from "moment";
import { useUpdateTodo } from "./firebase/CRUDoperations";

const EditTodo = () => {
  const [text, setText] = useState("");
  const [day, setDay] = useState();
  const [time, setTime] = useState();
  const [todoProject, setTodoProject] = useState();

  const {selectedTodo, projects, setSelectedTodo} = useContext(TodoContext);

  const manageUpdateTodo = useUpdateTodo();

  useEffect(() => {
    if (selectedTodo) {

      // console.log(selectedTodo.date)
      // const date = moment(selectedTodo.date, "DD/MM/YYYY")
      // console.log(date)

      setText(selectedTodo.text);
      setDay(moment(selectedTodo.date, "DD/MM/YYYY").toDate());
      setTime(moment(selectedTodo.time, "hh:mm A").toDate());
      setTodoProject(selectedTodo.projectName);
    }
  }, [selectedTodo]);

  function handleSubmit(e) {
    e.preventDefault();

    const updatedTodo = {
      ...selectedTodo,
      text: text,
      date: moment(day).format("DD/MM/YYYY"),
      time: moment(time).format("hh:mm A"),
      projectName: todoProject,
    };

    if (text !== ""){
      manageUpdateTodo(updatedTodo)
      setSelectedTodo(undefined)
    }else{
      alert("Todo has no Name")
    }

  }

  return (
    <div>
      {selectedTodo && (
        <div className="EditTodo">
          <div className="header">Edit Todo</div>
          <div className="container">
            <TodoForm
              handleSubmit={handleSubmit}
              text={text}
              setText={setText}
              day={day}
              setDay={setDay}
              time={time}
              todoProject={todoProject}
              setTodoProject={setTodoProject}
              setTime={setTime}
              projects={projects}
              setShowModal = {setSelectedTodo}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EditTodo;
