import React from "react";
import { useRef, useState } from "react";
import { Prompt } from "react-router-dom";

import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./QuoteForm.module.css";
import useInput from "../../hooks/use-input";

const isNotEmpty = (value) => value.trim() !== "";

const QuoteForm = (props) => {
  const [isEntering, setIsEntering] = useState(false);

  const {
    value: authorNameValue,
    isValid: enteredAuthorNameIsValid,
    hasError: authorNameInputHasError,
    valueChangeHandler: authorNameInputChangeHandler,
    inputBlurHandler: authorNameInputBlurHandler,
    reset: resetAuthorNameInput,
  } = useInput((value) => /^[A-Za-z][A-Za-z ]+$/i.test(value));

  const {
    value: textValue,
    isValid: enteredTextIsValid,
    hasError: textInputHasError,
    valueChangeHandler: textInputChangeHandler,
    inputBlurHandler: textInputBlurHandler,
    reset: resetTextInput,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  if (enteredAuthorNameIsValid && enteredTextIsValid) {
    formIsValid = true;
  }

  const authorInputRef = useRef();
  const textInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    // optional: Could validate here

    props.onAddQuote({ author: enteredAuthor, text: enteredText });

    resetAuthorNameInput();
    resetTextInput();
  }

  const finishEnteringHandler = () => {
    setIsEntering(false);
  };

  const formFocusedHandler = () => {
    setIsEntering(true);
  };

  const authorControlClasses = `${classes.control} ${
    authorNameInputHasError ? classes.invalid : "classes.invalid"
  }`; 

  const textControlClasses = `${classes.control} ${
    textInputHasError ? classes.invalid : "classes.invalid"
  }`; 

  return (
    <React.Fragment>
      <Prompt
        when={isEntering}
        message={(location) => "Are you sure? All data will be lost!"}
      />
      <Card>
        <form
          onFocus={formFocusedHandler}
          className={classes.form}
          onSubmit={submitFormHandler}
        >
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={authorControlClasses}>
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              ref={authorInputRef}
              onChange={authorNameInputChangeHandler}
              onBlur={authorNameInputBlurHandler}
              value={authorNameValue}
            />
            {authorNameInputHasError && (
              <p className="error-text">Invalid Author Name!</p>
            )}
          </div>
          <div className={textControlClasses}>
            <label htmlFor="text">Text</label>
            <textarea
              id="text"
              rows="5"
              ref={textInputRef}
              onChange={textInputChangeHandler}
              onBlur={textInputBlurHandler}
              value={textValue}
            ></textarea>
            {textInputHasError && (
              <p className="error-text">Text must not be empty!</p>
            )}
          </div>
          <div className={classes.actions}>
            <button disabled={!formIsValid} onClick={finishEnteringHandler} className="btn">
              Add Quote
            </button>
          </div>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default QuoteForm;
