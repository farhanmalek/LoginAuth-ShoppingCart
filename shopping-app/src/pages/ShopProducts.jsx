import { Link, NavLink } from "react-router-dom";

function ShopProducts({ allProducts, loading }) {
  console.log(allProducts);
  if (loading) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <>
        <div className="flex flex-wrap justify-center border gap-5">
          {allProducts.map((product) => (
            <Link
              to={`${product.id}`}
              className="w-96 h-72 rounded shadow-lg m-2 bg-white flex flex-col
               justify-end gap-2"
              key={product.id}
            >
              <img
                className="h-28 object-contain self-center justify-center  flex-grow w-[100%]"
                src={product.images[1]}
                alt={product.title}
              />
              <div className="flex flex-col items- justify-end ">
                <div className="font-bold text-xl mb-2">{product.title}</div>
                <p className="text-gray-700 text-base">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  }
}

export default ShopProducts;
