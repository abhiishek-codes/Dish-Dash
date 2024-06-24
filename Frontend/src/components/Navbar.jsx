import React from "react";
import logo from "../assets/images/logo.png";
import bag from "../assets/images/bag.png";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const items = useSelector((state) => state.cart.items);

  const user = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <div className="w-[95%] font-['customSans'] mx-auto py-5 md:py-8 text-bglight">
      <div className="flex justify-between xl:justify-between items-center bg-bglightgrey text-[16px] font-semibold tracking-wide relative rounded-md px-4 md:px-12 py-1 sm:py-2 md:py-4">
        <ul className="flex gap-x-3 cursor-pointer">
          <Link to="/">
            <li className="relative transition-all duration-300 before:content-[''] before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-[1.5px] before:rounded-full before:opacity-0 before:transition-all before:duration-300 before:bg-bglight hover:before:w-full hover:before:opacity-100 hidden sm:block">
              Home
            </li>
          </Link>

          <Link to="/aboutus">
            <li className="relative transition-all duration-300 before:content-[''] before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-[1.5px] before:rounded-full before:opacity-0 before:transition-all before:duration-300 before:bg-bglight hover:before:w-full hover:before:opacity-100 hidden sm:block">
              About us
            </li>
          </Link>

          <Link to="/contactus">
            <li className="relative transition-all duration-300 before:content-[''] before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-[1.5px] before:rounded-full before:opacity-0 before:transition-all before:duration-300 before:bg-bglight hover:before:w-full hover:before:opacity-100 hidden sm:block">
              Contact us
            </li>
          </Link>
        </ul>

        <div className="absolute top-0  left-0  sm:left-[50%] transform  sm:-translate-x-[50%] -translate-y-[19%] md:-translate-y-[21%] lg:-translate-y-[23%]">
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              className="w-[90px] h-[90px] sm:w-[120px] sm:h-[120px] md:w-[140px] md:h-[140px] lg:w-[170px] lg:h-[170px] p-0"
            />
          </Link>
        </div>

        <ul className="flex gap-x-5 items-center cursor-pointer">
          <li className="relative">
            <Link to="/order/cart">
              <img src={bag} alt="Cart" className="w-10 h-10 sm:w-14 sm:h-14" />
            </Link>

            <div className="absolute top-0 right-1 bg-bggold  rounded-full">
              {items.length > 0 ? (
                <h1 className="text-sm px-2 sm:px-3 sm:py-1 text-bglightgrey">
                  {items.length}
                </h1>
              ) : (
                ""
              )}
            </div>
          </li>
          <li>
            {!user ? (
              <button
                className="bg-bggreen text-base px-2 py-1 sm:text-base sm:px-5 sm:py-2 rounded-sm active:scale-75 duration-300 transition-all hover:bg-bgred"
                onClick={() => navigate("/auth")}
              >
                Sign in
              </button>
            ) : (
              <button
                className="bg-bggreen text-base px-2 py-1 sm:text-base sm:px-5 sm:py-2 rounded-sm active:scale-75 duration-300 transition-all hover:bg-bgred"
                onClick={() => {
                  navigate("/");
                  localStorage.clear();
                }}
              >
                Logout
              </button>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
