import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { NavLink } from 'react-router-dom';

function FeaturedProducts({featuredProducts}) {
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 10
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 5
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

  return (
    <Carousel responsive={responsive}>
        {featuredProducts.map((product) => (
         <NavLink to={`shop/${product.id}`} className="max-w-xs rounded shadow-lg m-2 bg-white h-52 flex-col" key={product.id}>
           <img className="w-36 h-28 object-contain self-center justify-center" src={product.images[1]} alt={product.title} />
         <div className="px-2 py-2">
           <div className="font-bold text-xl mb-2">{product.title}</div>
           <p className="text-gray-700 text-base">${product.price}</p>
         </div>
         
       </NavLink>
        ))}
    </Carousel>
  )
}

export default FeaturedProducts