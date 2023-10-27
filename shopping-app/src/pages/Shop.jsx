import { useEffect, useState } from "react";
import ShopProducts from "./ShopProducts";
import { Outlet, useLoaderData } from "react-router-dom";

function Shop() {
  const initialAllProducts = useLoaderData().products;
  const [searchInput, setSearchInput] = useState("");
  const [category, setCategory] = useState("");
  const [allProducts, setAllProducts] = useState(initialAllProducts);
  const [loading, setLoading] = useState(false);

  //Set category value
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  //Set search value

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchInput(e.target.elements.search.value);
  };

  //If any category filters are selected
  async function selectCategory(category) {
    try {
      let url;
      if (category !== "" && category !== "All") {
        url = `https://dummyjson.com/products/category/${category}`;
      } else if (category === "All") {
        url = `https://dummyjson.com/products?limit=10`;
      } else {
        return;
      }

      const res = await fetch(url);
      const categoryProducts = await res.json();
      const newCategoryProducts = categoryProducts.products;
      setAllProducts(newCategoryProducts);
    } catch (error) {
      console.error("Error selecting category:", error);
    }
  }
  useEffect(() => {
    selectCategory(category);
  }, [category]);

  //search result
  async function selectSearch(searchInput) {
    try {
      let url;
  
      if (searchInput !== "") {
        url = `https://dummyjson.com/products/search?q=${searchInput}`;
      } else {
        url = `https://dummyjson.com/products?limit=10`;
      }
  
      const res = await fetch(url);
      const resJ = await res.json();
      const searchResults = resJ.products;
      console.log(searchResults);
      setAllProducts(searchResults);
    } catch (err) {
      console.error("Error fetching search results", err);
    }
  }
  
  useEffect(() => {
    selectSearch(searchInput);
  }, [searchInput]);
  

  return (
    <>
      <div className="flex flex-col mx-auto p-4 text-center">
        <div
          className="border border-blue-500 bg-center bg-cover"
          style={{ backgroundImage: `url('../src/images/shophero.jpg')` }}
        >
          <h1 className="text-4xl text-yellow-600 font-bold mb-2">
            myshop.com
          </h1>
          <h6 className="text-sm text-white font-bold mb-8">
            Yes, we have it.
          </h6>

          <h1 className="text-2xl text-white font-bold mb-4">Shop</h1>

          <div className="flex justify-center mb-4">
            <form onSubmit={handleSearchSubmit} className="flex items-center">
              <input
                type="text"
                name="search"
                placeholder="Search items..."
                className="p-2 border border-gray-400 rounded-l focus:outline-none"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-r"
              >
                Search
              </button>
            </form>
          </div>

          <div className="flex justify-center mb-8">
            <div className="mr-4">
              <p className="font-bold text-white mb-2">Category:</p>
              <select
                value={category}
                onChange={handleCategoryChange}
                className="p-2 border border-gray-400 rounded focus:outline-none"
              >
                <option value="" disabled>
                  Select Category
                </option>
                <option value="All">All</option>
                <option value="smartphones">Smartphones</option>
                <option value="laptops">Laptops</option>
                <option value="fragrances">Fragrances</option>
                <option value="skincare">Skincare</option>
                <option value="groceries">Groceries</option>
                <option value="home-decoration">Home Decoration</option>
                <option value="furniture">Furniture</option>
                <option value="tops">Tops</option>
                <option value="womens-dresses">Women's Dresses</option>
                <option value="womens-shoes">Women's Shoes</option>
                <option value="mens-shirts">Men's Shirts</option>
                <option value="mens-shoes">Men's Shoes</option>
                <option value="mens-watches">Men's Watches</option>
                <option value="womens-watches">Women's Watches</option>
                <option value="womens-bags">Women's Bags</option>
                <option value="womens-jewellery">Women's Jewellery</option>
                <option value="sunglasses">Sunglasses</option>
                <option value="automotive">Automotive</option>
                <option value="motorcycle">Motorcycle</option>
                <option value="lighting">Lighting</option>
              </select>
            </div>
          </div>
        </div>

        <ShopProducts allProducts={allProducts} loading={loading} />
      </div>
    </>
  );
}

//loader function, pull dummy data from api to prepare before component is rendered.
export const productsLoader = async () => {
  const products = await fetch(`https://dummyjson.com/products?limit=10`); //make call to dummy api. limiting to 10 products

  return products.json();
};

export default Shop;
