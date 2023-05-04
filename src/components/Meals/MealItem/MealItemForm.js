import { useRef, useState } from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css'

const MealItemForm = props => {

    const [amountIsValid, setAmountIsValid] = useState(true);

    const amountInputRef = useRef()


    const submitHandler = event => {
        event.preventDefault();

        //always a string
        const eneteredAmount = amountInputRef.current.value;
        const eneteredAmountNumber = +eneteredAmount;

        if(eneteredAmount.trim().length === 0 || eneteredAmountNumber < 1 || eneteredAmountNumber > 5){
            setAmountIsValid(false);
            return;
        }

        console.log(eneteredAmountNumber)

        //this lavda lasan is where mealItemForm is called i.e in mealItem.js file
        props.onAddToCart(eneteredAmountNumber);
    }

    return (
        <form onSubmit={submitHandler} className={classes.form}>

            {//use forward ref in input.js file
            }
            <Input ref={amountInputRef} label="Amount" input={{
                id: 'Amount',
                type: 'Number',
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1'
            }} />
            <button>+ Add</button>
            {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
        </form>
    )
};

export default MealItemForm;