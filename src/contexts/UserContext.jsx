import React, { createContext, useState } from "react";
import { useFilterTodos, useProjects, useTodos } from "../components/hooks";
import { useSignInStatus } from "../components/firebase/SignIn";

const TodoContext = createContext();

const TodoContextProvider = ({ children }) => {
  const defaultProject = "today";
  const [selectedProject, setSelectedProject] = useState(defaultProject);
  const [selectedTodo, setSelectedTodo] = useState(undefined)

  const todos = useTodos();
  const projects = useProjects(todos);
  const filteredTodos = useFilterTodos(todos, selectedProject);
  const { userName, userUID } = useSignInStatus();

  return (
    <TodoContext.Provider
      value={{
        defaultProject,
        selectedProject,
        setSelectedProject,
        selectedTodo,
        setSelectedTodo,
        todos: filteredTodos,
        projects,
        userName,
        userUID,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export { TodoContextProvider, TodoContext };
