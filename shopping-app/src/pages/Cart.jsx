import { useContext } from "react";
import CartContext from "../context/CartContext";

function Cart() {
  const {cart} = useContext(CartContext);
  
  return (
    <div>
      <div className="flex flex-row justify-between">
      <h1>Basket</h1>
      <p>{cart.length} Item(s)</p>
      </div>

      <div className="flex border border-red-500 justify-evenly">
        <p className="flex-grow">PRODUCT DETAILS</p>
        <div className="flex w-3/5 justify-evenly border border-black">
        <p>QUANTITY</p>
        <p>PRICE</p>
        <p>TOTAL</p>
        </div>
      </div>

      <div>
        {cart.map((product) => (
          <div key={product.id}>
            <div>
              <img></img>
              <p>title</p>
              </div>
              

          </div>
        ))}
      </div>
    











    </div>
  )
}

export default Cart