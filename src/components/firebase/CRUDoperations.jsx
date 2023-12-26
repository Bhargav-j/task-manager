import { useContext } from "react";
import { db } from "./Config";
import {
  deleteDoc,
  collection,
  doc,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { TodoContext } from "../../contexts/UserContext";

// TO Add the data we need only collectionRef means only the colleciton level  (addDoc)
// addDoc(collection(db, "todos"), todoObject);   ==> CollectionRef = collection(db, "todos")

// TO Update or Delete the data, we need the document level reference (doc, updateDoc or DeleteDoc)
// docRef = doc(db, collectionName, doc.id);  ==> CollectionRef = colleciotn(db, collectionName) & documentRef = doc.id
// updateDoc(docRef, updatedData);
// deleteDoc(docRef)

// For Deleting items obtained using query, we can directly use deleteDoc(doc.ref) where mapping over that array forEach doc

// query & getDocs & querySnapshot.forEach(doc => {})
//getDocs to get the array of documents inside the collection. for this collectioRef is enough.
// const querySnapshot =  getDocs(db, collectionName)  collectionRef = collection(db, collectionName)

// But before that we need to query the collection to get that collection object if any condition need to be applied
// q = query(collectionRef, where("name", "==", projectName));
// const querySnapshot = getDocs(q)

// export async function manageAddNewTodo(todoObject){
export const useAddNewTodo = () => {
  const { userUID } = useContext(TodoContext);
  // console.log(todoObject)
  // console.log(todoObject.date)
  // console.log(todoObject.text)
  const manageAddNewTodo = async (todoObject) => {
    try {
      let collectionRef;

      if (userUID) {
        collectionRef = collection(db, userUID, "SubCollection", "todos");
      } else {
        collectionRef = collection(db, "todos");
      }

      // Check if their any previous data first. Later check if present, previous data matching with adding Data
      const queryTop = await getDocs(collectionRef);
      // console.log("Till Here good")

      if (queryTop.size === 0) {
        addDoc(collectionRef, todoObject);
      } else {
        const q = query(
          collectionRef,
          where("text", "==", todoObject.text),
          where("date", "==", todoObject.date)
        );

        const querySnapshot = await getDocs(q);
        // console.log(querySnapshot)
        if (querySnapshot.size === 0) {
          addDoc(collectionRef, todoObject);
        } else {
          alert("Todo with same title already exists!!!");
        }
      }
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  return manageAddNewTodo;
};

export const useAddProject = () => {
  const { userUID } = useContext(TodoContext);

  const manageAddProject = async (projectName) => {
    try {
      let collectionRef;

      if (userUID) {
        collectionRef = collection(db, userUID, "SubCollection", "projects");
        // console.log("multi collection")
      } else {
        collectionRef = collection(db, "projects");
        // console.log("single collection")
      }

      const queryTop = await getDocs(collectionRef);
      // console.log("Till Here good")

      if (queryTop.size === 0) {
        addDoc(collectionRef, { name: projectName });
      } else {
        const q = query(collectionRef, where("name", "==", projectName));

        const querySnapshot = await getDocs(q);
        // console.log(querySnapshot)
        if (querySnapshot.size === 0) {
          try {
            addDoc(collectionRef, { name: projectName });
            // .then(
            //   console.log("Added the Data")
            // )
          } catch (err) {
            alert(err.message);
          }
        } else {
          console.log("Data already exists in Firestore!");
          alert("Project already exists!");
        }
      }
    } catch (err) {
      alert(err.message);
      // console.error('Error getting documents: ', error);
    }
  };

  return manageAddProject;
};

export const useUpdateProject = () => {
  const { userUID } = useContext(TodoContext);

  const manageUpdateProject = async (newProjectName, project) => {
    try {
      let projectscollectionRef;
      let todoscollectionRef;

      if (userUID) {
        projectscollectionRef = collection(
          db,
          userUID,
          "SubCollection",
          "projects"
        );
        todoscollectionRef = collection(db, userUID, "SubCollection", "todos");
        // console.log("multi collection")
      } else {
        projectscollectionRef = collection(db, "projects");
        todoscollectionRef = collection(db, "todos");
        // console.log("single collection")
      }

      const q = query(
        projectscollectionRef,
        where("name", "==", newProjectName)
      );
      const querySnapshot = await getDocs(q);
      // Check if any...
      if (querySnapshot.size === 0) {
        const docRef = doc(projectscollectionRef, project.id);

        await updateDoc(docRef, { name: newProjectName }).then(async () => {
          // update in the todos also
          const q2 = query(
            todoscollectionRef,
            where("projectName", "==", project.name)
          );
          const querySnapshot2 = await getDocs(q2);

          if (querySnapshot2.size !== 0) {
            querySnapshot2.forEach((tododoc) => {
              const docRef2 = doc(todoscollectionRef, tododoc.id);
              updateDoc(docRef2, { projectName: newProjectName });
            });
          }
        });
      } else {
        alert("Project Name already Exists");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return manageUpdateProject;
};

export const useUpdateTodo = () => {
  const { userUID } = useContext(TodoContext);

  const manageUpdateTodo = (todo) => {
    try {
      let todoscollectionRef;

      if (userUID) {
        todoscollectionRef = collection(db, userUID, "SubCollection", "todos");
        // console.log("multi collection")
      } else {
        todoscollectionRef = collection(db, "todos");
        // console.log("single collection")
      }

      const docRef = doc(todoscollectionRef, todo.id);
      const updateTodo = { ...todo };
      delete updateTodo.id;
      updateDoc(docRef, { ...updateTodo });
    } catch (err) {
      alert(err.message);
    }
  };

  return manageUpdateTodo;
};

export const useCheckTodo = () => {
  const { userUID } = useContext(TodoContext);
  const manageCheckTodo = (todo) => {
    try {
      let todoscollectionRef;

      if (userUID) {
        todoscollectionRef = collection(db, userUID, "SubCollection", "todos");
        // console.log("multi collection")
      } else {
        todoscollectionRef = collection(db, "todos");
        // console.log("single collection")
      }

      const docRef = doc(todoscollectionRef, todo.id);
      updateDoc(docRef, { checked: !todo.checked });
    } catch (err) {
      alert(err.message);
    }
  };

  return manageCheckTodo;
};

export const useDeleteTodo = () => {
  const { userUID } = useContext(TodoContext);
  const manageDeleteTodo = async (todo) => {
    try {
      let todoscollectionRef;

      if (userUID) {
        todoscollectionRef = collection(db, userUID, "SubCollection", "todos");
        // console.log("multi collection")
      } else {
        todoscollectionRef = collection(db, "todos");
        // console.log("single collection")
      }

      const taskDocRef = doc(todoscollectionRef, todo.id);
      try {
        await deleteDoc(taskDocRef);
      } catch (err) {
        alert(err);
      }
    } catch (err) {
      alert(err.message);
    }
  };
  return manageDeleteTodo;
};





export const useDeleteProject = () => {
  const { userUID } = useContext(TodoContext);
  const manageDeleteProject = async (project) => {
    try {
      let projectscollectionRef;
      let todoscollectionRef;

      if (userUID) {
        projectscollectionRef = collection(
          db,
          userUID,
          "SubCollection",
          "projects"
        );
        todoscollectionRef = collection(db, userUID, "SubCollection", "todos");
        // console.log("multi collection")
      } else {
        projectscollectionRef = collection(db, "projects");
        todoscollectionRef = collection(db, "todos");
        // console.log("single collection")
      }

      const taskDocRef = doc(projectscollectionRef, project.id);
      deleteDoc(taskDocRef).then(async () => {
        // console.log("Remove the todos belong to this project")
        const q = query(
          todoscollectionRef,
          where("projectName", "==", project.name)
        );

        try {
          const querySnapshot = await getDocs(q);

          querySnapshot.forEach((doc) => {
            // console.log(doc)
            deleteDoc(doc.ref);
          });
        } catch (err) {
          alert(err.message);
        }
      });
    } catch (err) {
      alert(err);
    }
  };
  return manageDeleteProject;
};
