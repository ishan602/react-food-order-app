import { useRef, useState } from 'react';

import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';

const MealItemForm = (props) => {
  const [validAmount, setValidAmount] = useState(true);
  const inputRef = useRef();

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = inputRef.current.value;
    const enteredAmountNumber = +enteredAmount;
    if (
      enteredAmountNumber < 1 ||
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber > 5
    ) {
      setValidAmount(false);
      return;
    }

    props.addToCart(enteredAmountNumber);
  };
  const inputDetails = {
    id: 'addToCartNumber' + props.mealId,
    type: 'number',
    min: '0',
    max: '5',
    step: '1',
    defaultValue: '0',
  };
  return (
    <>
      <form className={classes.form} onSubmit={formSubmitHandler}>
        <Input label='Quantity' input={inputDetails} ref={inputRef} />
        <button>Add to Cart</button>
        {!validAmount && <p>Please enter the valid value (1-5)</p>}
      </form>
    </>
  );
};

export default MealItemForm;
