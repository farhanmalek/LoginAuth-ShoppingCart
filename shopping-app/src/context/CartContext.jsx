import { createContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({children}) {

    const [cart, setCart] = useState([]); //Create initial cart state
    const [quantity,setQuantity] = useState(1);
    const [totalInCart,setTotalInCart] = useState(0);

    //Update the cart
  function handleAddToCart(singleProduct) {
    //Check if product exists in the cart first.
        const doesProductExist = cart.find((product) => {
         return product === singleProduct
        })
        if (doesProductExist) {
          //it does exist, update the quantity of that product only instead of adding a dupe.
          singleProduct.amount = singleProduct.amount + quantity;
          setCart([...cart])
        } else if (!doesProductExist) {
          singleProduct.amount = quantity; //push in initial quantity into the object e.g 3
          setCart([...cart, singleProduct])
        }
      }
    
    //handle input of quantity
    const handleQuantity = (e) => {
      setQuantity(parseInt(e.target.value))
    }
    //handle manual change of quantity
    const handleOp = (e) => {

      if (e.target.name === "minus" && quantity > 0) {
        setQuantity((quantity) => quantity - 1)
      } else if (e.target.name === "add") {
        setQuantity((quantity) => quantity + 1)
      }
    
    }
//Remove item from cart completely
    function removeItemFromCart(targetProduct) {
        const filteredCart = cart.filter((item) => item != targetProduct)
        setCart(filteredCart);
        const newQuantity = totalInCart - targetProduct.amount;
        setTotalInCart(newQuantity)
      }
    




    return (
        <CartContext.Provider value={{cart,setCart,totalInCart,setTotalInCart,handleAddToCart,handleQuantity,handleOp,quantity,removeItemFromCart}}>{children}</CartContext.Provider> // We will wrap any components around this provide and it will be bale to access what ever is in value.
    )
}

export default CartContext;

