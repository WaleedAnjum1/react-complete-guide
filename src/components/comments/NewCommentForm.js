import { useEffect, useRef, useState } from "react";
import useHttp from "../../hooks/use-http";
import { addComment } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./NewCommentForm.module.css";
import useInput from "../../hooks/use-input";

const NewCommentForm = (props) => {
  const {
    value: commentValue,
    isValid: enteredCommentIsValid,
    hasError: commentInputHasError,
    valueChangeHandler: commentInputChangeHandler,
    inputBlurHandler: commentInputBlurHandler,
    reset: resetCommentInput,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;

  if (enteredCommentIsValid) {
    formIsValid = true;
  }

  const commentTextRef = useRef();

  const { sendRequest, status, error } = useHttp(addComment);

  const { onAddedComment } = props;

  useEffect(() => {
    if (status === "completed" && !error) {
      onAddedComment();
    }
  }, [status, error, onAddedComment]);

  const submitFormHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    // optional: Could validate here

    // send comment to server

    const enteredText = commentTextRef.current.value;

    sendRequest({ commentData: { text: enteredText }, quoteId: props.quoteId });

    resetCommentInput();
  };

  const commentControlClasses = `${classes.control} ${
    commentInputHasError ? classes.invalid : "classes.invalid"
  }`; 

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === "pending" && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      <div className={commentControlClasses} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea
          id="comment"
          rows="5"
          onChange={commentInputChangeHandler}
          onBlur={commentInputBlurHandler}
          ref={commentTextRef}
          value={commentValue}
        ></textarea>
        {commentInputHasError && <p className="error-text">Please enter a valid comment!</p>}
      </div>
      <div className={classes.actions}>
        <button disabled={!formIsValid} className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
