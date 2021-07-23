import React, { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (prevState, action) => {
  let updatedItem, updatedItems;
  if (action.type === 'ADD') {
    const newTotalAmount =
      prevState.totalAmount + action.item.price * action.item.amount;
    const existingCartItemIndex = prevState.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = prevState.items[existingCartItemIndex];

    if (existingCartItem) {
      updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...prevState.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = prevState.items.concat(action.item);
    }
    const newCartState = {
      items: updatedItems,
      totalAmount: newTotalAmount,
    };
    return newCartState;
  } else if (action.type === 'REMOVE') {
    const existingCartItemIndex = prevState.items.findIndex(
      (item) => item.id === action.itemId
    );
    const existingCartItem = prevState.items[existingCartItemIndex];
    const existingCartItemAmount = existingCartItem.amount;
    const newTotalAmount = prevState.totalAmount - existingCartItem.price;

    if (existingCartItemAmount === 1) {
      updatedItems = prevState.items.filter((item) => {
        return item.id !== action.itemId;
      });
    } else {
      updatedItem = { ...existingCartItem, amount: existingCartItemAmount - 1 };
      updatedItems = [...prevState.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    const newCartState = {
      items: updatedItems,
      totalAmount: newTotalAmount,
    };
    return newCartState;
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [newCartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemHandler = (item) => {
    dispatchCartAction({ type: 'ADD', item: item });
  };
  const removeItemHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE', itemId: id });
  };

  const cartContext = {
    items: newCartState.items,
    totalAmount: newCartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
