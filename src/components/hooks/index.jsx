import { useEffect, useState } from "react";
// import app from "../firebase";
import { db } from "../firebase/Config";
import { collection, onSnapshot } from "firebase/firestore";
import moment from "moment";
import { useSignInStatus } from "../firebase/SignIn";

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const { userUID } = useSignInStatus();

  useEffect(() => {
    // Reference to the Firestore collection "todos"
    // const todoscollectionRef = collection(db, "todos");
    // const todoscollectionRef = collection(db, "todos");
    let todoscollectionRef;

    if (userUID) {
      todoscollectionRef = collection(db, userUID, "SubCollection", "todos");
      // console.log("multi collection")
    } else {
      todoscollectionRef = collection(db, "todos");
      // console.log("single collection")
    }

    // Subscribe to real-time updates using onSnapshot
    const unsubscribe = onSnapshot(todoscollectionRef, (snapshot) => {
      try {
        const fetchedData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setTodos(fetchedData);
      } catch (err) {
        console.error("Error in fetching Projects data", err);
      }
    });

    return () => unsubscribe();
  }, [userUID]);

  return todos;
}

// export function useUserSpecificTodos() {
//   const [userSpecifictodos, setUserSpecifictodos] = useState([]);
//   const { userUID } = useSignInStatus();

//   useEffect(() => {
//     // Reference to the Firestore collection "todos"
//     // const todosRef = collection(db, "todos");
//     let todoscollectionRef;

//     if (userUID) {
//       todoscollectionRef = collection(db, userUID, "SubCollection", "todos");
//       // console.log("multi collection")
//     } else {
//       todoscollectionRef = collection(db, "todos");
//       // console.log("single collection")
//     }

//     // Subscribe to real-time updates using onSnapshot
//     const unsubscribe = onSnapshot(todoscollectionRef, (snapshot) => {
//       try {
//         const fetchedData = snapshot.docs.map((doc) => ({
//           ...doc.data(),
//           id: doc.id,
//         }));

//         setUserSpecifictodos(fetchedData);
//       } catch (err) {
//         console.error("Error in fetching Projects data", err);
//       }
//     });

//     return () => unsubscribe();
//   }, [userUID]);

//   return userSpecifictodos;
// }

export function useProjects(todos) {
  const [projects, setProjects] = useState([]);
  const { userUID } = useSignInStatus();

  const calNumOfTodos = (projectName, todos) =>
    todos.filter((todo) => todo.projectName === projectName && !todo.checked)
      .length;

  useEffect(() => {
    // Reference to the Firestore collection "projects"
    // const projectsRef = collection(db, "projects");
    let projectscollectionRef;

    if (userUID) {
      projectscollectionRef = collection(db, userUID, "SubCollection", "projects");
      // console.log("multi collection")
    } else {
      projectscollectionRef = collection(db, "projects");
      // console.log("single collection")
    }

    // Subscribe to real-time updates using onSnapshot
    const unsubscribe = onSnapshot(projectscollectionRef, (snapshot) => {
      try {
        const fetchedData = snapshot.docs.map((doc) => {
          const projectName = doc.data().name;
          return {
            id: doc.id,
            name: projectName,
            numOfTodos: calNumOfTodos(projectName, todos),
          };
        });
        setProjects(fetchedData);
      } catch (err) {
        console.error("Error in fetching Projects data", err);
      }
    });

    return () => unsubscribe();
  }, [todos, userUID]);

  return projects;
}

export function useFilterTodos(todos, selectedProject) {
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    let data;

    const todayDateFormated = moment().format("DD/MM/YYYY");
    if (selectedProject === "today") {
      data = todos.filter((todo) => todo.date === todayDateFormated);
    } else if (selectedProject === "next 7 days") {
      data = todos.filter((todo) => {
        const todoDate = moment(todo.date, "DD/MM/YYYY");
        const todayDate = moment(todayDateFormated, "DD/MM/YYYY");

        const diffDays = todoDate.diff(todayDate, "days");

        return diffDays >= 0 && diffDays < 7;
      });
    } else if (selectedProject === "all days") {
      data = todos;
    } else {
      data = todos.filter((todo) => todo.projectName === selectedProject);
    }

    setFilteredTodos(data);
  }, [todos, selectedProject]);

  return filteredTodos;
}
