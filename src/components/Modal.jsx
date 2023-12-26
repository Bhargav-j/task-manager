import React, { useContext, useRef } from "react";
import { TodoContext } from "../contexts/UserContext";

const Modal = ({ children, showModal, setShowModal, setTodoProject }) => {
  
  //Context
  const {selectedProject} = useContext(TodoContext)
  
  const modalRef = useRef();

  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
      setTodoProject(selectedProject)
    }
  };

  return (
    showModal && (
      <div className="Modal" ref={modalRef} onClick={(e) => closeModal(e)}>
        <div className="container">{children}</div>
      </div>
    )
  );
};

export default Modal;
