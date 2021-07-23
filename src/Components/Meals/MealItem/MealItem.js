import { useContext } from 'react';
import CartContext from '../../../Store/cart-context';

import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';

const MealItem = (props) => {
  const price = (mealPrice) => {
    return '$' + mealPrice.toFixed(2);
  };
  const cartCtx = useContext(CartContext);
  const addToCart = (amount) => {
    cartCtx.addItem({
      id: props.meal.id,
      name: props.meal.name,
      amount: amount,
      price: props.meal.price,
    });
  };
  return (
    <>
      <li className={classes.meal}>
        <div>
          <h3>{props.meal.name}</h3>
          <div className={classes.description}>{props.meal.description}</div>
          <div className={classes.price}>{price(props.meal.price)}</div>
        </div>
        <div>
          <MealItemForm mealId={props.meal.id} addToCart={addToCart} />
        </div>
      </li>
    </>
  );
};

export default MealItem;
