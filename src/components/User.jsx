import React, { useContext } from "react";
import logo from "../images/logo.png";

import { TodoContext } from "../contexts/UserContext";
import { handleSignOut } from "./firebase/SignIn";

const User = ({setSignedIn}) => {

  const {userUID, userName} = useContext(TodoContext)
  // console.log(userUID)

  return (
    <div className="User">
      <div className="logo">
        <img src={logo} alt="Logo"/>
      </div>
      <div className="info">
        <p>{userName}</p>
               
        <a href="#" onClick={(e) => {
          if (!userUID){
            setSignedIn(true)
          } else {
            // logout from here
            // console.log('logout')
            try{
              handleSignOut()
            }catch(err){
              console.log(err)
            }
            
          }
          
        }}>{!userUID ? 'Sign In' : 'Sign Out'}</a>
      </div>
    </div>
  );
};

export default User;
