import React, { useContext, useState } from "react";
import RenameProject from "./RenameProject";
import { Pencil, XCircle } from "react-bootstrap-icons";
import Modal from "./Modal";
import { TodoContext } from "../contexts/UserContext"
import { useDeleteProject } from "./firebase/CRUDoperations";

const Project = ({ project, edit }) => {

  // Context
  const {selectedProject, setSelectedProject, defaultProject} = useContext(TodoContext)

  const [showModal, setShowModal] = useState(false);

  const manageDeleteProject = useDeleteProject();

  const deleteProject = async(project) => {
    await manageDeleteProject(project)
    .then(() => {
      if (selectedProject === project.name) {
        setSelectedProject(defaultProject);
      }
    });
  }

  return (
    <div className="Project">
      <div className="name" onClick={() => {setSelectedProject(project.name)}}>{project.name}</div> 
      <div className="btns">
        {edit ? (
          <div className="edit-delete">
            <span className="edit" onClick={() => setShowModal(true)}>
              <Pencil size="13" />
            </span>
            <span className="delete"
              onClick={() => deleteProject(project)}
            >
              <XCircle size="13" />
            </span>
          </div>
        ) : project.numOfTodos > 0 ? (
          <div className="total-todos">{project.numOfTodos}</div>
        ) : (
          ""
        )}
      </div>

      <Modal showModal={showModal} setShowModal={setShowModal}>
        <RenameProject project={project} setShowModal={setShowModal} />
      </Modal>
    </div>
  );
};

export default Project;
