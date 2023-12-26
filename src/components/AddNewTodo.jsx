import React, { useContext, useState, useEffect } from "react";
import Modal from "./Modal";
import TodoForm from "../components/TodoForm";
import { TodoContext } from "../contexts/UserContext";
import moment from "moment";
import randomColor from "randomcolor";
import { calendarItems } from "../constants/index";
import { useAddNewTodo } from "./firebase/CRUDoperations";

const AddNewTodo = () => {
  //context
  const { selectedProject, projects } = useContext(TodoContext);

  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState("");
  const [day, setDay] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [todoProject, setTodoProject] = useState(selectedProject);

  const manageAddNewTodo = useAddNewTodo();


  useEffect(() => {
    // Update todoProject state when selectedProject changes
    setTodoProject(selectedProject);
  }, [selectedProject]); // Watch for changes in selectedProject

  // const projects = [
  //   { id: 1, name: "personal", numOfTodos: 0 },
  //   { id: 2, name: "work", numOfTodos: 2 },
  //   { id: 3, name: "other", numOfTodos: 3 },
  // ];

  function handleSubmit(e) {
    e.preventDefault();

    // console.log(text)
    // console.log(todoProject)

    if (text && !calendarItems.includes(todoProject)) {
      const todoObject = {
        text: text,
        date: moment(day).format("DD/MM/YYYY"),
        day: moment(day).format("d"),
        time: moment(time).format("hh:mm A"),
        projectName: todoProject,
        checked: false,
        color: randomColor(),
      };

      manageAddNewTodo(todoObject)

      setText("");
      setTime(new Date());
      setDay(new Date());
      setTodoProject(selectedProject);
      setShowModal(false);
    }
  }

  return (
    <div className="AddNewTodo">
      <div className="btn">
        <button onClick={() => setShowModal(true)}> + New Todo</button>
      </div>

      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        setTodoProject={setTodoProject}
      >
        <TodoForm
          handleSubmit={handleSubmit}
          heading="Add new Todo"
          text={text}
          setText={setText}
          day={day}
          setDay={setDay}
          time={time}
          setTime={setTime}
          todoProject={todoProject}
          setTodoProject={setTodoProject}
          projects={projects}
          showButtons={true}
          setShowModal={setShowModal}
        />
      </Modal>
    </div>
  );
};

export default AddNewTodo;
