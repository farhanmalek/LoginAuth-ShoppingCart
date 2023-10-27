import { useLoaderData, Link } from "react-router-dom";

function Product() {
  const singleProduct = useLoaderData();
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
          <button className="px-3 py-1 border border-gray-300">-</button>
          <span className="mx-4 text-xl"></span>
          <button className="px-3 py-1 border border-gray-300">+</button>
        </div>

        <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add to Cart
        </button>
      
        </div>
        <Link to="/shop" className="mt-4 bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded flex justify-center">
          Back to Shop
        </Link>
        </div>
     
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
