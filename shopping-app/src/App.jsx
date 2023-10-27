import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
//Routes
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
//Layouts
import RootLayout from "./layouts/RootLayout";

//loaderfunctions
import { featuredProductsLoader } from "./pages/Home";
import { productsLoader } from "./pages/Shop";
import { singleProductLoader } from "./pages/Product";

//import provider
import { CartProvider } from "./context/CartContext";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <CartProvider>
          <RootLayout />
        </CartProvider>
      }
    >
      <Route loader={featuredProductsLoader} index element={<Home />} />
      <Route loader={productsLoader} path="shop" element={<Shop />} />
      <Route
        loader={singleProductLoader}
        path="shop/:id"
        element={<Product />}
      />
      <Route path="cart" element={<Cart />} />
    </Route>
  )
);


function App() {
  return <RouterProvider router={router} />;
}

export default App;
