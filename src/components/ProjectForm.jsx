import React from "react";

const ProjectForm = ({
  handleSubmit,
  heading,
  projectName,
  setProjectName,
  setShowModal,
  confirmButtonText
}) => {
  return (
    <form onSubmit={(e) => handleSubmit(e)} className="ProjectForm">
      <h3>{heading}</h3>
      <input
        type="text"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        placeholder="project name..."
        autoFocus
      />
      <button
        className="cancel"
        onClick={(e) => {
          e.preventDefault();
          setShowModal(false);
        }}
      >
        {" "}
        cancel
      </button>
      <button className="confirm">{confirmButtonText}</button>
    </form>
  );
};

export default ProjectForm;
