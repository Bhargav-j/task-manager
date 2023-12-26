import React, { useState } from "react";
import "../signin/SignIn_style.css";

import {
  handleGoogleLogin,
  handleLogin,
  handlePasswordReset,
  handleRegister,
} from "../firebase/SignIn";

const SignInPage = ({ setSignedIn }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [userError, setUserError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  const [resetPassword, setResetPassword] = useState(false);

  const [signUP, setSignUp] = useState(false);


  // display shifting b/w sign in, sign Up, fotgot password
  const onSignUp = (key) => {
    setUserError("");
    setEmailError("");
    setPasswordError("");
    setLoginError("");

    setUserName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    // console.log(key);

    if (key === "reset") {
      if (signUP) {
        setSignUp(!signUP);
      }
      setResetPassword(!resetPassword);
    } else if (key === "signup") {
      if (resetPassword) {
        setResetPassword(!resetPassword);
      }
      setSignUp(!signUP);
    } else {
      setSignUp(false);
      setResetPassword(false);
    }
  };

  // On Google sign button click
  const googleSignin = async () => {
    const errMsg = await handleGoogleLogin();
    if (!errMsg) {
      setSignedIn(false);
    } else {
      // setSignedIn(false)
      alert(errMsg);
    }
  };

  // on reset password click
  const onResetButtonClick = async () => {
    setUserError("");
    setEmailError("");
    setPasswordError("");
    setLoginError("");

    setEmail(() => email.trim());

    if ("" === email) {
      setEmailError("Please enter your email");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    const resetError = await handlePasswordReset({ email });
    resetError
      ? setLoginError(resetError)
      : (() => {
          alert("Reset mail send to Email");
          setSignedIn(false);
          // setUserName("");
          // setEmail("");
          // setConfirmPassword("")
          // setPassword("");
        })();
  };

  // on Sign in or sign up button click
  const onButtonClick = async () => {
    setUserError("");
    setEmailError("");
    setPasswordError("");
    setLoginError("");

    setUserName(() => userName.trim());
    setEmail(() => email.trim());
    setPassword(() => password.trim());

    if ("" === email) {
      setEmailError("Please enter your email");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    if ("" === password) {
      setPasswordError("Please enter a password");

      return;
    }

    if (signUP) {
      if ("" === userName || userName.length < 5) {
        setUserError("The User Name must be 5 characters or longer");
        return;
      }

      if (confirmpassword !== password) {
        setPasswordError("password and confirm password must be same");

        return;
      }
    }

    if (password.length < 7) {
      setPasswordError("The password must be 8 characters or longer");

      return;
    }

    // Account login, register code here

    if (signUP) {
      const loginError = await handleRegister({ userName, email, password });
      loginError
        ? setLoginError(loginError)
        : (() => {
            setSignedIn(false);
            // setUserName("");
            // setEmail("");
            // setConfirmPassword("")
            // setPassword("");
          })();
    } else {
      const loginError = await handleLogin({ email, password });
      // console.log(loginError);
      loginError
        ? setLoginError("Wrong User Credentials")
        : (() => {
            setSignedIn(false);
            // setUserName("");
            // setEmail("");
            // setConfirmPassword("")
            // setPassword("");
          })();
    }
  };

  return (
    <div className={"mainContainer"}>
      <div className={"titleContainer"}>
        {!resetPassword ? (
          !signUP ? (
            <div>Login</div>
          ) : (
            <div>Welcome User!!!</div>
          )
        ) : (
          <div>Reset Password</div>
        )}

        <div
          className="window_close"
          title="window close"
          onClick={() => setSignedIn(false)}
        >
          X
        </div>
      </div>

      {/* only display of sign Up is true */}

      {signUP ? (
        <div className={"inputContainer"}>
          <input
            type="text"
            value={userName}
            placeholder="Enter your User Name here"
            onChange={(ev) => setUserName(ev.target.value)}
            className={"inputBox"}
          />

          <label className="errorLabel">{userError}</label>
        </div>
      ) : (
        ""
      )}

      <div className={"inputContainer"}>
        <input
          type="email"
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={"inputBox"}
        />

        <label className="errorLabel">{emailError}</label>
      </div>

      {!resetPassword ? (
        <div className={"inputContainer"}>
          <input
            type="password"
            value={password}
            placeholder="Enter your password here"
            onChange={(ev) => setPassword(ev.target.value)}
            className={"inputBox"}
          />

          <label className="errorLabel">{passwordError}</label>
        </div>
      ) : (
        ""
      )}

      {signUP ? (
        <div className={"inputContainer"}>
          <input
            type="password"
            value={confirmpassword}
            placeholder="confirm password"
            onChange={(ev) => setConfirmPassword(ev.target.value)}
            className={"inputBox"}
          />

          <label className="errorLabel">{passwordError}</label>
        </div>
      ) : (
        ""
      )}

      <div className={"inputlogin"}>
        {!resetPassword ? (
          <>
            <input
              style={{ backgroundColor: "greenyellow" }}
              className={"inputButton"}
              type="button"
              onClick={googleSignin}
              value={"Sign In with Google"}
            />
            <input
              style={{ backgroundColor: "yellow" }}
              className={"inputButton"}
              type="button"
              onClick={onButtonClick}
              value={!signUP ? "Log in" : "Register"}
            />
          </>
        ) : (
          <input
            style={{ backgroundColor: "yellow" }}
            className={"inputButton"}
            type="button"
            onClick={onResetButtonClick}
            value={"Reset Password"}
          />
        )}
      </div>

      {loginError ? (
        <div className={"inputContainer"}>
          <label className="errorLabel">{loginError}</label>
        </div>
      ) : (
        ""
      )}

      <div style={{ marginTop: "1rem" }}>
        {!signUP ? (
          <label className="errorLabel">
            Don't Have an account?{" "}
            <a href="#" onClick={() => onSignUp("signup")}>
              Register
            </a>{" "}
            Here
          </label>
        ) : (
          <label className="errorLabel">
            Already Have an account?{" "}
            <a href="#" onClick={() => onSignUp("signin")}>
              Sign In
            </a>{" "}
            Here
          </label>
        )}
      </div>

      <div style={{ marginTop: "1rem" }}>
        {resetPassword ? (
          <label className="errorLabel">
            Already Have an account?{" "}
            <a href="#" onClick={() => onSignUp("signin")}>
              Sign In
            </a>{" "}
            Here
          </label>
        ) : (
          <label className="errorLabel">
            Forget Password?{" "}
            <a href="#" onClick={() => onSignUp("reset")}>
              Click
            </a>{" "}
            Here
          </label>
        )}
      </div>
    </div>
  );
};

export default SignInPage;
