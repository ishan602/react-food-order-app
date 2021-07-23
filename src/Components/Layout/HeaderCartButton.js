import React, { useContext, useEffect, useState } from 'react';
import classes from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../Store/cart-context';

const HeaderCartButton = (props) => {
  const [btnAnimated, setBtnAnimated] = useState(false);
  const cartCtx = useContext(CartContext);
  const cartItem = cartCtx.items;

  useEffect(() => {
    if (cartItem.length === 0) {
      return;
    }
    setBtnAnimated(true);
    const timer = setTimeout(() => {
      setBtnAnimated(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cartItem]);

  const totalNoOfItems = cartItem.reduce(
    (currentValue, item) => currentValue + item.amount,
    0
  );
  let btnClasses = classes.button;
  if (btnAnimated) {
    btnClasses += ' ' + classes.bump;
  }
  return (
    <button className={btnClasses} onClick={props.onShowCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{totalNoOfItems}</span>
    </button>
  );
};

export default HeaderCartButton;
