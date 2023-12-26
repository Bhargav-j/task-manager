import React, { useState } from "react";
import { Plus } from "react-bootstrap-icons";
import Modal from "./Modal";
import ProjectForm from "./ProjectForm";
import { useAddProject } from "./firebase/CRUDoperations";

const AddNewProject = () => {
  const [showModal, setShowModal] = useState(false);
  const [projectName, setProjectName] = useState("");

  const manageAddProject = useAddProject()

  async function handleSubmit(e) {
    e.preventDefault();

    if (projectName) {
      manageAddProject(projectName)
    }

    setShowModal(false);
    setProjectName("");
  }

  return (
    <div className="AddNewProject">
      <div className="add-button">
        <span onClick={() => setShowModal(true)}>
          <Plus size="20" />
        </span>
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <ProjectForm
          handleSubmit={handleSubmit}
          heading="New Project"
          projectName={projectName}
          setProjectName={setProjectName}
          setShowModal={setShowModal}
          confirmButtonText="+ Add Project"
        />
      </Modal>
    </div>
  );
};

export default AddNewProject;
