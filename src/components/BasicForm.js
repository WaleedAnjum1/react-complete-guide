import useInput from "../hooks/use-input";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);

const BasicForm = (props) => {
  const {
    value: firstNameValue,
    isValid: enteredFirstNameIsValid,
    hasError: firstNameInputHasError,
    valueChangeHandler: firstNameInputChangeHandler,
    inputBlurHandler: firstNameInputBlurHandler,
    reset: resetFirstNameInput,
  } = useInput(isNotEmpty);
  const {
    value: lastNameValue,
    isValid: enteredLastNameIsValid,
    hasError: lastNameInputHasError,
    valueChangeHandler: lastNameInputChangeHandler,
    inputBlurHandler: lastNameInputBlurHandler,
    reset: resetLastNameInput,
  } = useInput(isNotEmpty);
  const {
    value: mailValue,
    isValid: enteredMailIsValid,
    hasError: mailInputHasError,
    valueChangeHandler: mailInputChangeHandler,
    inputBlurHandler: mailInputBlurHandler,
    reset: resetMailInput,
  } = useInput(isEmail);

  // const [enteredFirstName, setEnteredFirstName] = useState("");
  // const [enteredLastName, setEnteredLastName] = useState("");
  // const [enteredMail, setEnteredMail] = useState("");

  // const [enteredFirstNameTouched, setEnteredFirstNameTouched] = useState(false);
  // const [enteredLastNameTouched, setEnteredLastNameTouched] = useState(false);
  // const [enteredMailTouched, setEnteredMailTouched] = useState(false);

  // const enteredFirstNameIsValid = enteredFirstName.trim() !== "";
  // const enteredLastNameIsValid = enteredLastName.trim() !== "";
  // const enteredMailIsValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
  //   enteredMail
  // );

  // const firstNameInputIsInvalid =
  //   !enteredFirstNameIsValid && enteredFirstNameTouched;
  // const lastNameInputIsInvalid =
  //   !enteredLastNameIsValid && enteredLastNameTouched;
  // const MailInputIsInvalid = !enteredMailIsValid && enteredMailTouched;

  // const firstNameInputChangeHandler = (event) => {
  //   setEnteredFirstName(event.target.value);
  // };

  // const lastNameInputChangeHandler = (event) => {
  //   setEnteredLastName(event.target.value);
  // };

  // const mailInputChangeHandler = (event) => {
  //   setEnteredMail(event.target.value);
  // };

  // const firstNameInputBlurHandler = (event) => {
  //   setEnteredFirstNameTouched(true);
  // };

  // const lastNameInputBlurHandler = (event) => {
  //   setEnteredLastNameTouched(true);
  // };

  // const mailInputBlurHandler = (event) => {
  //   setEnteredMailTouched(true);
  // };
  
  let formIsValid = false;

  if (enteredFirstNameIsValid && enteredLastNameIsValid && enteredMailIsValid) {
    formIsValid = true;
  }

  //FORM HANDLER
  const formSubmissionHandler = (event) => {
    event.preventDefault();

    // setEnteredFirstNameTouched(true);
    // setEnteredLastNameTouched(true);
    // setEnteredMailTouched(true);

    if (!formIsValid) {
      return;
    }

    console.log(firstNameValue, lastNameValue, mailValue);

    resetFirstNameInput();
    resetLastNameInput();
    resetMailInput();

    // setEnteredFirstName("");
    // setEnteredFirstNameTouched(false);

    // setEnteredLastName("");
    // setEnteredLastNameTouched(false);

    // setEnteredMail("");
    // setEnteredMailTouched(false);
  };

  const firstNameInputClasses = firstNameInputHasError /*firstNameInputIsInvalid*/
    ? "form-control invalid"
    : "form-control";
  const lastNameInputClasses = lastNameInputHasError
    ? "form-control invalid"
    : "form-control";
  const mailInputClasses = mailInputHasError
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
            value={firstNameValue}
          />
          {firstNameInputHasError && (
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
            value={lastNameValue}
          />
          {lastNameInputHasError && (
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
          value={mailValue}
        />
        {mailInputHasError && <p className="error-text">Invalid Email</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
