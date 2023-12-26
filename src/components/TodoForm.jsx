import React, { useContext } from "react";
import { Bell, CalendarDay, Clock, Palette, X } from "react-bootstrap-icons";


// npm install @date-io/date-fns date-fns @mui/material @mui/lab @emotion/react @emotion/styled
import  {DatePicker}  from "@mui/x-date-pickers";
import  {TimePicker} from "@mui/x-date-pickers";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { TodoContext } from "../contexts/UserContext";

const TodoForm = ({
  handleSubmit,
  heading = false,
  text,
  setText,
  todoProject,
  setTodoProject,
  day,
  setDay,
  time,
  setTime,
  projects,
  showButtons = false,
  setShowModal = false,
}) => {
  //Context
  const { selectedProject } = useContext(TodoContext);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form className="TodoForm">
        <div className="text">
          {heading && <h3>{heading}</h3>}

          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="To Do ..."
            autoFocus
          />
        </div>

        <div className="remind">
          <Bell />
          <p>Remind Me!</p>
        </div>

        <div className="pick-day">
          <div className="title">
            <CalendarDay />
            <p>Choose a day</p>
          </div>
          {/* <DatePicker value={day} onChange={(day) => setDay(day)} /> */}
          <DatePicker
            // label="Controlled picker"
            value={day}
            onChange={(day) => setDay(day)}
          />
        </div>

        <div className="pick-time">
          <div className="title">
            <Clock />
            <p>Choose a Time</p>
          </div>
          <TimePicker
            // label="Controlled picker"
            value={time}
            onChange={(time) => setTime(time)}
          />
        </div>

        <div className="pick-project">
          <div className="title">
            <Palette />
            <p>Choose a project</p>
          </div>
          <div className="projects">
            {projects.length > 0 ? (
              projects.map((project) => (
                <div
                  className={`project ${
                    todoProject === project.name ? "active" : ""
                  }`}
                  key={project.id}
                  onClick={() => setTodoProject(project.name)}
                >
                  {project.name}
                </div>
              ))
            ) : (
              <div style={{ color: "#ff0000" }}>
                Please add a project before proceeding
              </div>
            )}
          </div>
        </div>

        <div className="submitButtons">
          {/* {
              showButtons && (
                <div
              className="cancel"
              onClick={() => {    
                setTodoProject(selectedProject)
                setText("")
                setShowModal(false) 
              }}
            >
              <X size="40" />
            </div>
              )
            } */}

          <div
            className="cancel"
            onClick={() => {
              if (showButtons) {
                setTodoProject(selectedProject);
                setText("");
                setShowModal(false);
              } else {
                setShowModal(undefined); //setShowModal here is setSelectedTodo
              }
            }}
          >
            <X size="40" />
          </div>

          <div className="confirm">
            <button
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              {showButtons ? "+ Add to do" : "Update Todo"}
            </button>
          </div>
        </div>
      </form>
    </LocalizationProvider>
  );
};

export default TodoForm;
