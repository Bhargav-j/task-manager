import React, { useContext, useState } from "react";
import AddNewProject from "./AddNewProject";
import Project from "./Project";
import { CaretUp, Palette, PencilFill } from "react-bootstrap-icons";
import { TodoContext } from "../contexts/UserContext"



const Projects = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [edit, setEdit] = useState(false);
  const PencilColor = edit ? "#1EC94C" : "#000000";


  // context projects from firebase
  const {projects} = useContext(TodoContext);

  // const projects = [
  //   { id: 1, name: "personal", numOfTodos: 0 },
  //   { id: 2, name: "work", numOfTodos: 2 },
  //   { id: 3, name: "other", numOfTodos: 3 },
  // ];

  return (
    <div className="Projects">
      <div className="header">
        <div className="title">
          <Palette size="18" />
          <p>Projects</p>
        </div>
        <div className="btns">
          {showMenu && projects.length > 0 && (
            <span
              className="edit"
              onClick={() => {
                setEdit((edit) => !edit);
              }}
            >
              <PencilFill size="15" color={PencilColor} />
            </span>
          )}
          <AddNewProject />
          <span
            className="arrow"
            onClick={() => {
              setShowMenu(!showMenu);
              if (edit){
                setEdit(!edit)
              }
            }}
          >
            <CaretUp size="20" />
          </span>
        </div>
      </div>

      {showMenu && (
        <div className="items">
          {projects.map((project) => (
            <Project project={project} key={project.id} edit={edit} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
