import { useState } from "react";

const BasicForm = (props) => {
  const [enteredFirstName, setEnteredFirstName] = useState("");
  const [enteredLastName, setEnteredLastName] = useState("");
  const [enteredMail, setEnteredMail] = useState("");

  const [enteredFirstNameTouched, setEnteredFirstNameTouched] = useState(false);
  const [enteredLastNameTouched, setEnteredLastNameTouched] = useState(false);
  const [enteredMailTouched, setEnteredMailTouched] = useState(false);

  const enteredFirstNameIsValid = enteredFirstName.trim() !== "";
  const enteredLastNameIsValid = enteredLastName.trim() !== "";
  const enteredMailIsValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
    enteredMail
  );

  const firstNameInputIsInvalid = !enteredFirstNameIsValid && enteredFirstNameTouched;
  const lastNameInputIsInvalid = !enteredLastNameIsValid && enteredLastNameTouched;
  const MailInputIsInvalid = !enteredMailIsValid && enteredMailTouched;

  let formIsValid = false;

  if (enteredFirstNameIsValid && enteredLastNameIsValid && enteredMailIsValid) {
    formIsValid = true;
  }

  const firstNameInputChangeHandler = (event) => {
    setEnteredFirstName(event.target.value);
  };

  const lastNameInputChangeHandler = (event) => {
    setEnteredLastName(event.target.value);
  };

  const mailInputChangeHandler = (event) => {
    setEnteredMail(event.target.value);
  };

  const firstNameInputBlurHandler = (event) => {
    setEnteredFirstNameTouched(true);
  };

  const lastNameInputBlurHandler = (event) => {
    setEnteredLastNameTouched(true);
  };

  const mailInputBlurHandler = (event) => {
    setEnteredMailTouched(true);
  };

  //FORM HANDLER
  const formSubmissionHandler = (event) => {
    event.preventDefault();

    setEnteredFirstNameTouched(true);
    setEnteredLastNameTouched(true);
    setEnteredMailTouched(true);

    if (!enteredFirstNameIsValid) {
      return;
    }

    if (!enteredLastNameIsValid) {
      return;
    }

    if (!enteredMailIsValid) {
      return;
    }

    console.log(enteredFirstName, enteredLastName, enteredMail);

    setEnteredFirstName("");
    setEnteredFirstNameTouched(false);

    setEnteredLastName("");
    setEnteredLastNameTouched(false);

    setEnteredMail("");
    setEnteredMailTouched(false);
  };

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
            onBlur={firstNameInputBlurHandler}
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
            onBlur={lastNameInputBlurHandler}
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
          onBlur={mailInputBlurHandler}
          value={enteredMail}
        />
        {MailInputIsInvalid && <p className="error-text">Invalid Email</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
