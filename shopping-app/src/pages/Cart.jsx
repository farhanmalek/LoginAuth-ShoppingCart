import { useContext } from "react";
import CartContext from "../context/CartContext";

function Cart() {
  const { cart,setCart,removeItemFromCart} = useContext(CartContext);

  function handleQuantityFromCart (actionType,product) {
    if (actionType === "minus" && product.amount > 0) {
      product.amount = product.amount - 1;
    } else if (actionType === "add") {
      product.amount = product.amount + 1;
    }
    setCart([...cart])

  }

  function handleQuantityInputFromCart(e,product) {
    product.amount = parseInt(e.target.value);
    setCart([...cart])
  }


  return (
    <div className="p-4">
    <div className="flex justify-between">
      <h1 className="text-2xl font-bold">Basket</h1>
      <p>{cart.length} Item(s)</p>
    </div>
  
    <div className="flex border justify-between items-center mt-4">
      <p className="flex-grow">PRODUCT DETAILS</p>
      <div className="flex w-3/5 justify-evenly">
        <p className="text-lg">QUANTITY</p>
        <p className="text-lg">PRICE</p>
        <p className="text-lg">TOTAL</p>
      </div>
    </div>
  
    <div>
      {cart.map((product) => (
        <div key={product.id} className="flex justify-between items-center border-b border-gray-300 py-2">
          <div className="flex items-center border border-black p-2">
            <img src={product.images[1]} alt={product.title} className="w-52"></img>
            <p>{product.title}</p>
          </div>
          <div className="flex items-center justify-center">
            <button
              name="minus"
              onClick={() => handleQuantityFromCart("minus",product)}
              className="px-3 py-1 border border-gray-300"
            >
              -
            </button>
            <input
              type="number"
              onChange={(e) => handleQuantityInputFromCart(e,product)}
              value={product.amount}
              className="mx-4 text-xl text-center w-10"
            ></input>
            <button
              name="add"
              onClick={() => handleQuantityFromCart("add",product)}
              className="px-3 py-1 border border-gray-300"
            >
              +
            </button>
          </div>
          <p>{product.amount}</p>
          <p>${product.price}</p>
          <p>{(product.price * product.amount).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</p>
          <button onClick={() => removeItemFromCart(product)}>Remove Item</button>
        </div>
      ))}
    </div>
  </div>
  
  );
}

export default Cart;
