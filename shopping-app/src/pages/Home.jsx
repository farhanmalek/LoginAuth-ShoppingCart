import { NavLink, useLoaderData, Link } from "react-router-dom";
import FeaturedProducts from "./FeaturedProducts";


function Home() {
  const featuredProducts = useLoaderData().products;


  return (
    <>
      <div className="flex-col justify-around gap-11">
        <div
          className="h-96 bg-cover bg-center flex flex-col gap-[100px]"
          style={{ backgroundImage: `url('../src/images/heroshop.jpg')` }}
        >
          <h1 className="text-white font-extrabold text-3xl self-center">
            {" "}
            All your wants and needs, in one place, indeed.
          </h1>
          <div className="bg-blue-800 text-white rounded-lg py-2 px-4
           hover:bg-blue-700 hover:border-blue-500 hover:scale-105 focus:outline-none w-24 self-center h-10">
            <NavLink
              to="shop"
            >
              Explore.
            </NavLink>
          </div>
        </div>
        <div className="flex flex-col gap-11">
          <h1 className="text-4xl font-bold self-center">Featured Items</h1>
          <FeaturedProducts featuredProducts={featuredProducts} />
        </div>
      </div>
    </>
  );
}

//loader function, pull dummy data from api to prepare before component is rendered.
export const featuredProductsLoader = async () => {
  const skipThisMany = Math.floor(Math.random() * 91) + 10; //Generate random number between 10 - 100, to give illusion of different featured items
  const products = await fetch(
    `https://dummyjson.com/products?limit=10&skip=${skipThisMany}`
  ); //make call to dummy api. limiting to 10 products

  return products.json();
};
export default Home;
