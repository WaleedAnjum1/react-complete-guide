import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD_CART_ITEM") {
    //adding items as updated items instead of new items
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    //finds index of item in an array
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    //If item is already part of the array else existingCartItem will be NULL
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    //if existingCartItem is truthy i.e already part of the array
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };

      //new array whith copied old objects without changing the old array
      updatedItems = [...state.items];
      //picked old item and overrided it with updatedItem
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      //when item is added for the first time
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE_CART_ITEM") {
    
    //finds index of item in an array
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];

    //Removing one item of a specific type by removing item entirely or just decreasing the amount
    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems;
    if (existingItem.amount === 1) {
      
      //all items where id !== action id are kept and for one where id === action id we remove that item
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      
      //decrease item by 1
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };

      //copy of state items to create new array with old items
      updatedItems = [...state.items];

      //override old item with updated item
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD_CART_ITEM", item: item });
  };

  const removeItemHandler = (id) => {
    dispatchCartAction({ type: "REMOVE_CART_ITEM", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
