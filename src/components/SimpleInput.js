import { useEffect, useRef, useState } from "react";

const SimpleInput = (props) => {
  const nameInputRef = useRef();
  const [enteredName, setenteredName] = useState("");
  const [enteredNameIsValid, setenteredNameIsValid] = useState(false);
  const [enteredNameTouched, setenteredNameTouched] = useState(false);

  useEffect(() => {
    if (enteredNameIsValid) {
      console.log("Name Input is Valid!");
    }
  }, [enteredNameIsValid]);

  const nameInputChangeHandler = (event) => {
    setenteredName(event.target.value);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    setenteredNameTouched(true);

    if (enteredName.trim() === "") {
      setenteredNameIsValid(false);
      return;
    }

    setenteredNameIsValid(true);

    console.log(enteredName);
    const enteredValue = nameInputRef.current.value;
    console.log(enteredValue);

    setenteredName("");
  };

  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  const nameInputClasses = nameInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          ref={nameInputRef}
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
        />
        {nameInputIsInvalid && (
          <p className="error-text">Name must not be empty.</p>
        )}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
