import { useState } from "react";

const BasicForm = (props) => {
  const [enteredFirstName, setEnteredFirstName] = useState("");
  const [enteredLastName, setEnteredLastName] = useState("");
  const [enteredMail, setEnteredMail] = useState("");

  const [enteredFirstNameIsValid, setEnteredFirstNameIsValid] = useState(false);
  const [enteredLastNameIsValid, setEnteredLastNameIsValid] = useState(false);
  const [enteredMailIsValid, setEnteredMailIsValid] = useState(false);

  const [enteredFirstNameTouched, setEnteredFirstNameTouched] = useState(false);
  const [enteredLastNameTouched, setEnteredLastNameTouched] = useState(false);
  const [enteredMailTouched, setEnteredMailTouched] = useState(false);

  const firstNameInputChangeHandler = (event) => {
    setEnteredFirstName(event.target.value);
  };

  const lastNameInputChangeHandler = (event) => {
    setEnteredLastName(event.target.value);
  };

  const mailInputChangeHandler = (event) => {
    setEnteredMail(event.target.value);
  };

  //FORM HANDLER
  const formSubmissionHandler = (event) => {
    event.preventDefault();

    setEnteredFirstNameTouched(true);
    setEnteredLastNameTouched(true);
    setEnteredMailTouched(true);

    if (enteredFirstName.trim() === "") {
      setEnteredFirstNameIsValid(false);
    }

    if (enteredLastName.trim() === "") {
      setEnteredLastNameIsValid(false);
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(enteredMail)) {
      setEnteredMailIsValid(false);
      return;
    }

    setEnteredFirstNameIsValid(true);
    setEnteredLastNameIsValid(true);
    setEnteredMailIsValid(true);

    console.log(enteredFirstName, enteredLastName, enteredMail);

    setEnteredFirstName("");
    setEnteredLastName("");
    setEnteredMail("");
  };

  const firstNameInputIsInvalid =
    !enteredFirstNameIsValid && enteredFirstNameTouched;

  const lastNameInputIsInvalid =
    !enteredLastNameIsValid && enteredLastNameTouched;
    
  const MailInputIsInvalid = !enteredMailIsValid && enteredMailTouched;

  const firstNameInputClasses = firstNameInputIsInvalid
    ? "form-control invalid"
    : "form-control";
  const lastNameInputClasses = lastNameInputIsInvalid
    ? "form-control invalid"
    : "form-control";
  const mailInputClasses = MailInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={"control-group"}>
        <div className={firstNameInputClasses}>
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            id="firstname"
            onChange={firstNameInputChangeHandler}
            value={enteredFirstName}
          />
          {firstNameInputIsInvalid && (
            <p className="error-text">First Name must not be Empty</p>
          )}
        </div>
        <div className={lastNameInputClasses}>
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            id="lastname"
            onChange={lastNameInputChangeHandler}
            value={enteredLastName}
          />
          {lastNameInputIsInvalid && (
            <p className="error-text">Last Name must not be Empty</p>
          )}
        </div>
      </div>
      <div className={mailInputClasses}>
        <label htmlFor="email">E-Mail Address</label>
        <input
          type="email"
          id="email"
          onChange={mailInputChangeHandler}
          value={enteredMail}
        />
        {MailInputIsInvalid && <p className="error-text">Invalid Email</p>}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
