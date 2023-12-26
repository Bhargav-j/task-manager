import "./App.css";
import AddNewTodo from "./components/AddNewTodo";
import Calendar from "./components/Calendar";
import EditTodo from "./components/EditTodo";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import Projects from "./components/Projects";
import Todos from "./components/Todos";
import User from "./components/User";

import SignInPage from "./components/signin/SignInPage";
import { useEffect, useState } from "react";

import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "./components/firebase/Config";
import { useSignInStatus } from "./components/firebase/SignIn";


function App() {

  const [SignedIn, setSignedIn] = useState(false);

  const { userUID } = useSignInStatus();

  useEffect(() => {

      const defaultProjects = async(projectName) => {
        if (userUID){
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
                  addDoc(collectionRef, {name: projectName});
                  // .then(
                  //   console.log("Added the Data")
                  // )
                } catch (err) {
                  // alert(err.message);
                  // console.log("Data already exists in Firestore!");
                }
              } else {
                // console.log("Data already exists in Firestore!");
                // alert("Project already exists!");
              }
            }
          } catch (err) {
            // alert(err.message);
            console.error('Error getting documents: ', err.message);
          }
        }
    }
    
    defaultProjects('Personal');
    defaultProjects('Office');
    
  }, [userUID]);

  return (
    <div className="App">
      {SignedIn ? (
        <SignInPage setSignedIn={setSignedIn} />
      ) : (
        <>
          <Sidebar>
            <User setSignedIn={setSignedIn} />
            <AddNewTodo />
            <Calendar />
            <Projects />
          </Sidebar>
          <Main>
            <Todos />
            <EditTodo />
          </Main>
        </>
      )}
    </div>
  );
}

export default App;
