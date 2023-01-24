import { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./ProfileForm.module.css";
import useInput from "../../hooks/use-input";

const isPassword = (value) =>
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(value);

const ProfileForm = () => {
  const {
    value: passwordValue,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordInputChangeHandler,
    inputBlurHandler: passwordInputBlurHandler,
    reset: resetPasswordInput,
  } = useInput(isPassword);

  let formIsValid = false;

  if (enteredPasswordIsValid) {
    formIsValid = true;
  }

  const history = useHistory();
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const [isLoading, setisLoading] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    //validation
    if (!formIsValid) {
      return;
    }

    setisLoading(true);

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBDwph97gmP68TZyByG2Chlhi-8QLIsQp8",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
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
      .then(() => {
        alert("Password Changed Successfully");
        history.replace("/");
      })
      .catch((err) => {
        alert(err.message);
        resetPasswordInput();
      });
  };

  const passwordControlClasses = `${classes.control} ${
    passwordInputHasError ? classes.invalid : "classes.invalid"
  }`;

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={passwordControlClasses}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          required
          onChange={passwordInputChangeHandler}
          onBlur={passwordInputBlurHandler}
          value={passwordValue}
          ref={newPasswordInputRef}
        />
        {passwordInputHasError && (
          <p className={classes.error}>Invalid Password</p>
        )}
      </div>
      <div className={classes.action}>
        {!isLoading && (<button>Change Password</button>)}
        {isLoading && <p>Changing Password...</p>}
      </div>
    </form>
  );
};

export default ProfileForm;
