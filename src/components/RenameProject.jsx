import React, { useState, useContext } from "react";
import ProjectForm from "./ProjectForm";
import { useUpdateProject } from "./firebase/CRUDoperations";
import { TodoContext } from "../contexts/UserContext";

const RenameProject = ({ project, setShowModal }) => {
  const [newProjectName, setNewProjectname] = useState(project.name);

  // Context
  const { selectedProject, setSelectedProject } = useContext(TodoContext);
  //UpdateProject function import
  const manageUpdateProject = useUpdateProject();

  
  function handleSubmit(e) {
    e.preventDefault();

    const oldProjectName = project.name

    manageUpdateProject(newProjectName, project);
    setShowModal(false);
    if (selectedProject === oldProjectName) {
      setSelectedProject(newProjectName);
    }
  }

  return (
    <div className="RenameProject">
      <ProjectForm
        handleSubmit={handleSubmit}
        heading="Edit Project Project"
        projectName={newProjectName}
        setProjectName={setNewProjectname}
        setShowModal={setShowModal}
        confirmButtonText="Confirm Project"
      />
    </div>
  );
};

export default RenameProject;
