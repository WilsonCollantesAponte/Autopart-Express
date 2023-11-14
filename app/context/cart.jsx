'use client'
import { createContext , useReducer } from "react";

// creamos contexto
export const cartContext =  createContext();

const updateLocalStorage = (state) => {
    window.localStorage.setItem('cart', JSON.stringify(state))
  }

// use reduder
const initialState = typeof window !== 'undefined' ? JSON.parse(window.localStorage.getItem('cart')) || [] : [];
const reducer = (state , action) => {
    const { type: actionType, payload: actionPayload} = action;

    switch(actionType){
        case 'ADD_TO_CART':{
            const {id} = actionPayload;
            const productInTheCartIndex = state.findIndex(item=> item.id===id)
        
            if(productInTheCartIndex >= 0){
                const newState = structuredClone(state)
                newState[productInTheCartIndex].availability == newState[productInTheCartIndex].quantity ? newState[productInTheCartIndex].quantity=newState[productInTheCartIndex].availability : newState[productInTheCartIndex].quantity+=1;
                newState[productInTheCartIndex].newprice=newState[productInTheCartIndex].quantity * newState[productInTheCartIndex].price;
                updateLocalStorage(newState)
                return newState;
            }

            const newState = [
                ...state,
                {
                    ...actionPayload, //product
                    quantity:1,
                    newprice: actionPayload.price,
                }
            ]
            updateLocalStorage(newState)
            return newState;
        }
        case 'DISCOUNT': {
            const {id} = actionPayload;
            const productInTheCartIndex = state.findIndex(item=> item.id===id)
        
            if(productInTheCartIndex >= 0){
                const newState = structuredClone(state)
                newState[productInTheCartIndex].quantity > 0 ? newState[productInTheCartIndex].quantity-=1 : newState[productInTheCartIndex].quantity=0;
                newState[productInTheCartIndex].newprice=newState[productInTheCartIndex].quantity * newState[productInTheCartIndex].price;
                updateLocalStorage(newState)
                return newState;
            }
        }
        case 'REMOVE_FROM_CART':{
            const {id} =  actionPayload;
            const newState = state.filter(item => item.id!==id);
            updateLocalStorage(newState)
            return newState
        }
         case 'CLEAN_CART': {
            updateLocalStorage([])
            return []
         }

        }
        return state;
}


// creamos provider

export function CartProvider ({children}){
   const [state , dispatch] = useReducer(reducer , initialState)

   const addToCart = product => dispatch({
    type: 'ADD_TO_CART',
    payload: product,
   })
    
   const discountToCart = product => dispatch({
    type: 'DISCOUNT',
    payload: product,
   })
    
   const removeFromCart = product => dispatch({
    type: 'REMOVE_FROM_CART',
    payload: product,
   })

   const cleanCart = () => dispatch({
    type: 'CLEAN_CART'
   })
    
    return (
        <cartContext.Provider value={{
            cart: state,
            addToCart,
            discountToCart,
            removeFromCart,
            cleanCart,
        }}>
            {children}
        </cartContext.Provider>
    )
}
 


//const [cart, setCart] = useState([]);
    /* const addToCart = (product) =>{
        //el producto esta en el carrito ??
        const productInTheCartIndex = cart.findIndex(item=> item.id===product.id)
        
        if(productInTheCartIndex >= 0){
            const newCart = structuredClone(cart)
            newCart[productInTheCartIndex].quantity+=1;
            return setCart(newCart)
        }

        setCart(prevState=>([
            ...prevState,
            {
                ...product,
                quantity:1
            }
        ]))
    } */

   /*  const removeFromCart = (product) => {
        setCart(prevState=> prevState.filter(item=> item.id !== product.id))
    }

    const clearCart = () => {
        setCart([])
    } */
