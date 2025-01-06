import React, { useState } from "react";
import "./Login.css";

import logo from "../../assets/logo.png";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";

import netflex_spinner from "../../assets/netflix_spinner.gif";

function Login() {
  const [signState, setSignState] = useState("Sign In");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const signup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = response.user;
      await addDoc(collection(db, "user"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
    } catch (error) {
      console.error(error.message);
      toast.error(error.code.split("/")[1].split("-").join(" "));
    }
    setIsLoading(false);
  };

  const login = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error.message);
      toast.error(error.code.split("/")[1].split("-").join(" "));
    }
    setIsLoading(false);
  };

  return isLoading ? (
    <div className="loading-spinner">
      <img src={netflex_spinner} alt="" />
    </div>
  ) : (
    <div className="login">
      <img src={logo} alt="logo" className="login-logo" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form onSubmit={signState === "Sign Up" ? signup : login}>
          {signState === "Sign Up" ? (
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Your name"
            />
          ) : (
            <></>
          )}

          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
          />
          <button type="submit">{signState}</button>
          <div className="form-help">
            <div className="rember">
              <input type="checkbox" />
              <label htmlFor="">Remeber Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState === "Sign In" ? (
            <p>
              New to Netflix?{" "}
              <span
                onClick={() => {
                  setSignState("Sign Up");
                }}
              >
                Sign Up Now
              </span>
            </p>
          ) : (
            <p>
              Already have account?{" "}
              <span
                onClick={() => {
                  setSignState("Sign In");
                }}
              >
                Sign In Now
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
