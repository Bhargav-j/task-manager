import React, { useContext, useEffect, useRef } from "react";
import { TodoContext } from "../contexts/UserContext";

const Sidebar = ({ children }) => {

  //Context
  const {setSelectedTodo} = useContext(TodoContext)

  // If clicked on the sidebar, edit Todo window should close
  // For that we are listening the document click events once the sidebar is mounted.
  // To know the click events are on the sidebar, we used useRef hook to know, whether the click event belong to side bar or other.
  // If sidebar, we close the Edit Todo form
  const sidebarRef = useRef()

  useEffect(() => {
    document.addEventListener('click', handleClick)

    return () => document.removeEventListener('click', handleClick)
  })

  const handleClick = e => {
    if(e.target === sidebarRef.current || sidebarRef.current.contains(e.target)){
      setSelectedTodo(undefined)
    }
  }

  return (
    <div className="Sidebar" ref={sidebarRef}>
      {children}
    </div>
  );
};

export default Sidebar;
