import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";

function FeaturedProducts({ featuredProducts }) {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 10,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel responsive={responsive}>
      {featuredProducts.map((product) => (
        <div
          key={product.id}
          className='className="flex flex-wrap justify-center gap-5"'
        >
          <Link
            to={`shop/${product.id}`}
            className="w-96 h-72 rounded shadow-lg m-2 bg-white flex flex-col
         justify-end gap-2"
          >
            <img
              className="h-28 object-contain self-center justify-center flex-grow w-[100%]"
              src={product.images[1]}
              alt={product.title}
            />
            <div className="flex flex-col items- justify-end ">
              <div className="font-bold text-xl mb-2">{product.title}</div>
              <p className="text-gray-700 text-base">${product.price}</p>
            </div>
          </Link>
        </div>
      ))}
    </Carousel>
  );
}

export default FeaturedProducts;
