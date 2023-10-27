import { createContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({children}) {

    const [cart, setCart] = useState([]); //Create initial cart state



    return (
        <CartContext.Provider value={{cart,setCart}}>{children}</CartContext.Provider> // We will wrap any components around this provide and it will be bale to access what ever is in value.
    )
}

export default CartContext;

