import React from 'react';

import mealsImg from '../../assets/meals.jpg';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h2>ReactMeals</h2>
        <HeaderCartButton onShowCart={props.onShowCart}>Cart</HeaderCartButton>
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImg} alt='meals' />
      </div>
    </>
  );
};

export default Header;
