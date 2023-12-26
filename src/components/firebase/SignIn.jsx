import { auth, googleProvider } from "./Config";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail
} from "firebase/auth";

import { useEffect, useState } from "react";

// import { useAddProject } from "../firebase/CRUDoperations";

export const useSignInStatus = () => {
  const [userName, setUserName] = useState("Hello User!");
  const [userUID, setUserUID] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // console.log(user);
        const uid = user.uid;
        setUserUID(uid);
        setUserName(user.displayName);
        // console.log(uid)
        // console.log(user.displayName)
      } else {
        setUserUID(null);
        setUserName("Hello User!");
      }
    });
  }, []);

  return { userName, userUID };
};

//signIn with userName and Password
export const handleLogin = async ({ email, password }) => {
  //   console.log(email);
  //   console.log(password);
  // const err = null
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    // console.log(userCredential.UID)
  } catch (error) {
    // console.log(error.message)
    return error.message;

    // .then((userCredential) => {
    //     // console.log('success')
    //   //   setUserId(userCredential.UID);
    //   //   setUserName(userCredential.displayName);
    //   return null;
    // })

    // alert(error);
  }
};

//signIn with google
export const handleGoogleLogin = async () => {
  try {
    googleProvider.setCustomParameters({
      prompt: "select_account",
    });
    const userCredential = await signInWithPopup(auth, googleProvider);
    if (userCredential) {
      alert("Logged In");
    }
    //   setUserId(userCredential.UID);
    //   setUserName(userCredential.displayName);
  } catch (error) {
    alert(error);
  }
};

//Register an account
export const handleRegister = async ({ userName, email, password }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await updateProfile(user, { displayName: userName });
    window.location.reload(false);

    // Return user data or success indicator if needed
  } catch (error) {
    // Handle registration error
    // console.error("Registration error:", error.message);
    return error.message;
  }
};

// SignOut

export const handleSignOut = async () => {
  try {
    await signOut(auth).then(alert("Signed Out"));
  } catch (error) {
    alert(error.message);
  }
};

// password reset email
export const handlePasswordReset = async({email}) => {
  console.log(email)
  try{
    await sendPasswordResetEmail(auth, email)
    // .then(
    //   console.log("reset send")
    // )
    // .catch((err) => {
    //   console.log(err.message)
    // })
  }catch(error){
    return error.message
  }
};
