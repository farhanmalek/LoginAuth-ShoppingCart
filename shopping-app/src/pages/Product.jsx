import { useContext } from "react";
import { useLoaderData, Link } from "react-router-dom";
import CartContext from "../context/CartContext";


function Product() {
  const singleProduct = useLoaderData();
  const {cart,handleAddToCart,handleQuantity,handleOp,quantity} = useContext(CartContext);



  return (
    <>
      <div className="flex justify-center items-center mt-8  gap-9">
        <img
          className=" w-92 h-72 "
          src={singleProduct.images[1]}
          alt={singleProduct.title}
        />
        <div className="flex flex-col">
        <div className="mt-8 text-center">
          <h1 className="text-2xl font-bold">{singleProduct.title}</h1>
          <p className="text-xl font-bold mt-2">${singleProduct.price}</p>
          <p className="text-gray-700 mt-2">{singleProduct.description}</p>
          <hr className="my-4" />
        
        <div className="flex items-center justify-center">
          <button name ="minus" onClick={handleOp} className="px-3 py-1 border border-gray-300">-</button>
          <input type="number" onChange={handleQuantity} value ={quantity} className="mx-4 text-xl text-center"></input>
          <button name ="add" onClick={handleOp} className="px-3 py-1 border border-gray-300">+</button>
        </div>

        <button onClick={() => handleAddToCart(singleProduct)}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add to Cart
        </button>
      
        </div>
        <Link to="/shop" className="mt-4 bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded flex justify-center">
          Back to Shop
        </Link>
        </div>
     {console.log(cart)}
      </div>
      
    </>
  );
}

export default Product;

//loader function for displaying single product
export const singleProductLoader = async ({ params }) => {
  const products = await fetch(`https://dummyjson.com/products/${params.id}`); //make call to dummy api. limiting to 10 products

  return products.json();
};
