import React, { useContext, useEffect, useState } from "react";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  
  //for re-evaluation and re-rendering of the component because we are changing btnClasses to include the bump animation class, and then setting a timer which removes that class again so that when it's added again in the future, it again plays.
  const [btnIsHighlighted, setbtnIsHighlighted] = useState(false);

  const cartCtx = useContext(CartContext);

  //object de-structuring because, if we add cartCtx as the dependency it would re-run whenever anything about cart context changes
  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((currNumber, item) => {
    return currNumber + item.amount;
  }, 0);

  //updating the state, the whole component will re-execute when state changes. So, this line will also change and updated classes will be picked down there
  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  //effect function and dependencies array for bump animation class
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setbtnIsHighlighted(true);

    //because bump was never removed and was fired only when first item was added in cart. So, an empty string will be added through const btnClass which will remove the bump class and will cause it to be added again whenever an item is added to cart.
    const timer = setTimeout(() => {
      setbtnIsHighlighted(false);
    }, 300);

    //cleanup function to clear timeout
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
