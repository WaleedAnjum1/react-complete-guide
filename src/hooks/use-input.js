import { useReducer, useState } from "react";

const initialInputState = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: state.isTouched };
  }

  if (action.type === "BLUR") {
    return { isTouched: true, value: state.value };
  }

  if (action.type === "RESET") {
    return { isTouched: false, value: "" };
  }
  return inputStateReducer;
};

const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  // const [enteredValue, setenteredValue] = useState("");
  // const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(inputState.value /*enteredValue*/);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    dispatch({
      type: "INPUT",
      value: event.target.value,
    });
    // setenteredValue(event.target.value);
  };

  const inputBlurHandler = (event) => {
    dispatch({ type: "BLUR" });
    // setIsTouched(true);
  };

  const reset = () => {
    dispatch({ type: "RESET" });
    // setenteredValue("");
    // setIsTouched(false);
  };

  return {
    value: inputState.value /*enteredValue*/,
    isValid: valueIsValid,
    hasError: hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
