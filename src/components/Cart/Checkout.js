import { useRef, useState } from "react";
import classes from "./Checkout.module.css";
import useInput from "../../hooks/use-input";

const Checkout = (props) => {
  //   const [formInputValidity, setformInputValidity] = useState({
  //     name: true,
  //     street: true,
  //     postalCode: true,
  //     city: true,
  //   });

  const {
    value: nameValue,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameInputChangeHandler,
    inputBlurHandler: nameInputBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => /^[A-Za-z][A-Za-z ]+$/i.test(value));

  const {
    value: streetValue,
    isValid: enteredtStreetIsValid,
    hasError: streetInputHasError,
    valueChangeHandler: streetInputChangeHandler,
    inputBlurHandler: streetInputBlurHandler,
    reset: resetStreetInput,
  } = useInput((value) => /^[,-@.\/#&+\w\s][,-@.\/#&+\w\s ]*$/i.test(value));
  //Another Regex for address accepts string like Addr# Street Name, City, State ZIP code
  //e.g 3344 W Alameda Avenue, Lakewood, CO 80222
  //   /^(\d{1,}) [a-zA-Z0-9\s]+(\,)? [a-zA-Z]+(\,)? [A-Z]{2} [0-9]{5,6}$/

  const {
    value: postalCodeValue,
    isValid: enteredtPostalCodeIsValid,
    hasError: postalCodeInputHasError,
    valueChangeHandler: postalCodeInputChangeHandler,
    inputBlurHandler: postalCodeInputBlurHandler,
    reset: resetPostalCodeInput,
  } = useInput((value) => /^[0-9]{5}(?:-[0-9]{4})?$/i.test(value));

  const {
    value: cityValue,
    isValid: enteredtCityIsValid,
    hasError: cityInputHasError,
    valueChangeHandler: cityInputChangeHandler,
    inputBlurHandler: cityInputBlurHandler,
    reset: resetCityInput,
  } = useInput((value) => /^[A-Za-z][A-Za-z ]+$/i.test(value));

  //   const nameInputRef = useRef();
  //   const streetInputRef = useRef();
  //   const postalCodeInputRef = useRef();
  //   const cityInputRef = useRef();

  let formIsValid = false;

  if (
    enteredNameIsValid &&
    enteredtStreetIsValid &&
    enteredtPostalCodeIsValid &&
    enteredtCityIsValid
  ) {
    formIsValid = true;
  }

  const confirmHandler = (event) => {
    event.preventDefault();

    // const enteredName = nameInputRef.current.value;
    // const enteredStreet = streetInputRef.current.value;
    // const enteredPostalCode = postalCodeInputRef.current.value;
    // const enteredCity = cityInputRef.current.value;

    // const enteredNameIsValid =
    //   !isEmpty(enteredName) &&
    //   enteredName.trim().length > 3 &&
    //   /^[A-Za-z][A-Za-z ]+$/i.test(enteredName);
    // const enteredStreetIsValid =
    //   !isEmpty(enteredStreet) &&
    //   enteredStreet.trim().length > 3 &&
    //   /^[,-@.\/#&+\w\s]*$/i.test(enteredStreet);
    // const enteredPostalCodeIsValid =
    //   !isEmpty(enteredPostalCode) &&
    //   enteredPostalCode.trim().length === 5 &&
    //   /^[0-9]{5}(?:-[0-9]{4})?$/i.test(enteredPostalCode);
    // const enteredCityIsValid =
    //   !isEmpty(enteredCity) &&
    //   enteredCity.trim().length > 3 &&
    //   /^[A-Za-z][A-Za-z ]+$/i.test(enteredCity);

    // setformInputValidity({
    //   name: enteredNameIsValid,
    //   street: enteredStreetIsValid,
    //   postalCode: enteredPostalCodeIsValid,
    //   city: enteredCityIsValid,
    // });

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: nameValue,
      street: streetValue,
      postalCode: postalCodeValue,
      city: cityValue,
    });

    resetNameInput();
    resetStreetInput();
    resetPostalCodeInput();
    resetCityInput();
  };

  const nameControlClasses = `${classes.control} ${
    nameInputHasError ? classes.invalid : "classes.invalid"
  }`;
  const streetControlClasses = `${classes.control} ${
    streetInputHasError ? classes.invalid : "classes.invalid"
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    postalCodeInputHasError ? classes.invalid : "classes.invalid"
  }`;
  const cityControlClasses = `${classes.control} ${
    cityInputHasError ? classes.invalid : "classes.invalid"
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={nameValue}
        />
        {nameInputHasError && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street Address</label>
        <input
          type="text"
          id="street"
          onChange={streetInputChangeHandler}
          onBlur={streetInputBlurHandler}
          value={streetValue}
        />
        {streetInputHasError && <p>Please enter a valid street address!</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          onChange={postalCodeInputChangeHandler}
          onBlur={postalCodeInputBlurHandler}
          value={postalCodeValue}
        />
        {postalCodeInputHasError && (
          <p>Please enter a valid postal code! (5 characters long)</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          onChange={cityInputChangeHandler}
          onBlur={cityInputBlurHandler}
          value={cityValue}
        />
        {cityInputHasError && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button disabled={!formIsValid} className={classes.submit}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
