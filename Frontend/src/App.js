import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home.jsx";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import RestroMenu from "./components/RestroMenu.jsx";
import LoginSignupPage from "./pages/LoginSignup.jsx";
import FilteredRestaurant from "./components/FilteredRestaurant.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import Cart from "./pages/Cart.jsx";
import store from "./store/store.js";
import { Provider } from "react-redux";
import CheckoutPage from "./pages/checkOut.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx";
import Error from "./pages/Error.jsx";

const Layout = () => (
  <div className="w-screen h-screen flex flex-col overflow-hidden hide-scrollbar">
    <Navbar className="h-auto" />
    <div className="flex-1 h-full overflow-y-auto hide-scrollbar bg-bglight">
      <Outlet />
    </div>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/filter/:type/restaurants",
        element: <FilteredRestaurant />,
      },
      {
        path: "/auth",
        element: <LoginSignupPage />,
      },
      {
        path: "/:name/menu/:id",
        element: <RestroMenu />,
      },
      {
        path: "/aboutus",
        element: <AboutUs />,
      },
      {
        path: "/contactus",
        element: <ContactUs />,
      },
      {
        path: "/order/cart",
        element: <Cart />,
      },
      {
        path: "/order/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/order/success",
        element: <OrderSuccess />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
