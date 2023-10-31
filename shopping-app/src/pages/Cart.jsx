import { useContext } from "react";
import CartContext from "../context/CartContext";

function Cart() {
  const { cart, setCart, removeItemFromCart } = useContext(CartContext);

  function handleQuantityFromCart(actionType, product) {
    if (actionType === "minus" && product.amount > 0) {
      product.amount = product.amount - 1;
    } else if (actionType === "add") {
      product.amount = product.amount + 1;
    }
    setCart([...cart]);
  }

  function handleQuantityInputFromCart(e, product) {
    product.amount = parseInt(e.target.value);
    setCart([...cart]);
  }

  return (
    <div className="flex flex-col p-4 gap-5 overflow-x-auto">
      <h1 className="text-2xl font-bold">Basket</h1>
      <p>{cart.length} Item(s)</p>
      <table className="min-w-full border border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-sm font-bold">PRODUCT DETAILS</th>
            <th className="py-2 px-4 text-sm font-bold">QUANTITY</th>
            <th className="py-2 px-4 text-sm font-bold">PRICE</th>
            <th className="py-2 px-4 text-sm font-bold">TOTAL</th>
            <th className="py-2 px-4 text-sm font-bold"></th>
          </tr>
        </thead>
        <tbody>
          {cart.map((product) => (
            <tr key={product.id} className="border-b border-gray-300">
              <td className="flex justify-center py-2 px-4">
                <div className="flex flex-col items-center sm:flex">
                  <img
                    src={product.images[1]}
                    alt={product.title}
                    className="w-16 h-16 object-cover mr-4"
                  />
                  <p>{product.title}</p>
                </div>
              </td>
              <td className=" py-2 px-4">
                <div className="flex justify-center ">
                  <button
                    name="minus"
                    onClick={() => handleQuantityFromCart("minus", product)}
                    className="font-extrabold border border-gray-300 px-2"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    onChange={(e) => handleQuantityInputFromCart(e, product)}
                    value={product.amount}
                    className="text-sm text-center w-10 mx-2"
                  />
                  <button
                    name="add"
                    onClick={() => handleQuantityFromCart("add", product)}
                    className="font-extrabold border border-gray-300 px-2"
                  >
                    +
                  </button>
                </div>
              </td>
              <td className="py-2 px-4  text-center">${product.price}</td>
              <td className="py-2 px-4 text-center">
                {(
                  product.price * product.amount
                ).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </td>
              <td className="py-2 px-4">
                <button onClick={() => removeItemFromCart(product)}>x</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Cart;
