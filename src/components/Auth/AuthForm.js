import { useContext, useRef, useState } from "react";
import classes from "./AuthForm.module.css";

import useInput from "../../hooks/use-input";
import AuthContext from "../../store/auth-context";

const isPassword = (value) =>
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(value);
const isEmail = (value) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);

const AuthForm = () => {
  const {
    value: mailValue,
    isValid: enteredMailIsValid,
    hasError: mailInputHasError,
    valueChangeHandler: mailInputChangeHandler,
    inputBlurHandler: mailInputBlurHandler,
    reset: resetMailInput,
  } = useInput(isEmail);

  const {
    value: passwordValue,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordInputChangeHandler,
    inputBlurHandler: passwordInputBlurHandler,
    reset: resetPasswordInput,
  } = useInput(isPassword);

  let formIsValid = false;

  if (enteredMailIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setisLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (!formIsValid) {
      return;
    }

    setisLoading(true);

    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBDwph97gmP68TZyByG2Chlhi-8QLIsQp8";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBDwph97gmP68TZyByG2Chlhi-8QLIsQp8";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setisLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            // show error
            let errorMessage = "Authentication Failed";
            if (data && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        authCtx.login(data.idToken);
        resetMailInput();
        resetPasswordInput();
      })
      .catch((err) => {
        alert(err.message);
        resetPasswordInput();
      });
  };

  const emailControlClasses = `${classes.control} ${
    mailInputHasError ? classes.invalid : "classes.invalid"
  }`;

  const passwordControlClasses = `${classes.control} ${
    passwordInputHasError ? classes.invalid : "classes.invalid"
  }`;

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={emailControlClasses}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            required
            onChange={mailInputChangeHandler}
            onBlur={mailInputBlurHandler}
            value={mailValue}
            ref={emailInputRef}
          />
          {mailInputHasError && <p className={classes.error}>Invalid Email</p>}
        </div>
        <div className={passwordControlClasses}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            onChange={passwordInputChangeHandler}
            onBlur={passwordInputBlurHandler}
            value={passwordValue}
            ref={passwordInputRef}
          />
          {passwordInputHasError && (
            <p className={classes.error}>Invalid Password</p>
          )}
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending Request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
