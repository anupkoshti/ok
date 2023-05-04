import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
//   if (action.type === "ADD") {
//     //update the array first

//     ///ALL THIS RANDI RONA ON submiting form in mealItemForm.js
//     const updatedItems = state.items.concat(action.item);
//     console.log(updatedItems);
//     const updatedTotalAmount =
//       state.totalAmount + action.item.amount * action.item.price;

//     console.log(action.item.amount);

//     return {
//       items: updatedItems,
//       totalAmount: updatedTotalAmount,
//     };
//   }


  //NEWLY UPDATED LOGIC FOR ADDING ITEMS
    if(action.type === 'ADD') {
        const updatedTotalAmount = state.totalAmount + action.item.price*action.item.amount;

        //findIndex returns true if item.id === action.item.id
        //returns null if not found
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);    

        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;

        if(existingCartItem) {
            const updatedItem = {
                ...existingCartItem, 
                amount: existingCartItem.amount + action.item.amount
            }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        else {
            updatedItems = state.items.concat(action.item);
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    if(action.type === "REMOVE") {
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);

        const existingCartItem=state.items[existingCartItemIndex];
        console.log(existingCartItem)   
        const updatedTotalAmount=state.totalAmount - existingCartItem.price;

        let updatedItems;

        if(existingCartItem.amount === 1) {
            //function returns true -> kept
            //false - deleted
            //returns a new array   
            updatedItems = state.items.filter(item => item.id !== action.id);
        }

        else {
            const updatedItem = {...existingCartItem, amount: existingCartItem.amount - 1};
            console.log(updatedItem)
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } 

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({type: "REMOVE", id:id})
  };

  const clearCartHandler = () => {
    dispatchCartAction({type: "CLEAR"})
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
