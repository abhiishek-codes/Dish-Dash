import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addItemToCart,
  removeItemFromCart,
  clearCart,
} from "../store/cartSlice";
import { MENUURL } from "../assets/Constant.js";
import AddCart from "url:../assets/videos/AddCart.mp4";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const status = useSelector((state) => state.cart.status);
  const error = useSelector((state) => state.cart.error);
  const navigate = useNavigate();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return items.length > 0 ? (
    <div className="w-full h-full flex flex-col overflow-auto">
      <div className="w-[95%] bg-bggray flex flex-col gap-4 items-center justify-center mx-auto h-full p-2 overflow-auto">
        <div className="w-[90%] max-h-full overflow-y-auto hide-scrollbar flex flex-col gap-y-4 bg-bglight rounded-md shadow-2xl p-4 mx-auto">
          <div className="w-full overflow-auto hide-scrollbar">
            <table className="table-fixed sm:table-auto xl:table-fixed w-full font-['Basis'] tracking-tight">
              <thead className="text-xs md:text-xl">
                <tr>
                  <th className="text-left py-2">Food Item</th>
                  <th className="text-center py-2">Price</th>
                  <th className="text-center py-2">Quantity</th>
                  <th className="text-center py-2">Total Price</th>
                </tr>
              </thead>
              <tbody className="font-['customSans'] text-base">
                {items.map((curr, idx) => (
                  <tr key={idx} className="md:table-row">
                    <td className="flex flex-col md:flex-row gap-x-2 items-center justify-start py-4 text-xs md:text-base">
                      <img
                        src={`${MENUURL}${curr.imageId}`}
                        alt="image"
                        className="w-[60px] h-[60px] sm:w-[80px] sm:h-[100px] md:w-[120px] md:h-[140px] object-cover rounded-md shadow-xl"
                      />
                      <div className="flex flex-col gap-y-1 font-bold font-['customSans'] text-center md:text-left">
                        <p className="font-['Basis'] text-lg hidden md:block">
                          {curr.restroname}
                        </p>
                        <p className="text-[0.5rem] sm:text-base font-bold md:font-medium">
                          {curr.name}
                        </p>
                        <p className="text-sm font-normal hidden md:block">
                          {curr.category}
                        </p>
                      </div>
                    </td>
                    <td className="text-center font-['Basis'] py-4 text-[0.7rem] md:text-base">
                      ₹ {curr.price}
                    </td>
                    <td className="text-center font-['Basis'] py-4 text-[0.7rem] md:text-base">
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-x-3">
                        <button
                          className="bg-bggreen px-3 rounded-md duration-200 active:scale-75"
                          onClick={() => dispatch(removeItemFromCart(curr.id))}
                        >
                          -
                        </button>
                        <p>{curr.quantity}</p>
                        <button
                          className="bg-bgred px-3 rounded-md duration-200 active:scale-75"
                          onClick={() => dispatch(addItemToCart(curr))}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="text-center font-['Basis'] py-4 text-[0.7rem] md:text-base">
                      ₹ {curr.totalPrice}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="4" className="py-1">
                    <div className="w-full h-2 bg-bgdarkgrey" />
                  </td>
                </tr>
                <tr>
                  <td className="text-left font-['Basis'] py-4 text-xs md:text-base">
                    Total
                  </td>
                  <td></td>
                  <td className="text-center font-['Basis'] py-4 text-xs md:text-base">
                    {totalQuantity}
                  </td>
                  <td className="text-center font-['Basis'] py-4 text-xs md:text-base">
                    ₹ {totalAmount}
                  </td>
                </tr>
                <tr>
                  <td className="my-3">
                    <button
                      className="bg-bgred px-4 py-1 font-['Basis'] text-bglight text-[0.8rem] sm:text-base rounded-md duration-200 active:scale-75"
                      onClick={() => dispatch(clearCart())}
                    >
                      Clear Cart
                    </button>
                  </td>
                  <td></td>
                  <td></td>
                  <td className="my-3 flex justify-center">
                    <button
                      className="bg-bggreen px-4 py-1 font-['Basis'] text-bglight rounded-md duration-200 active:scale-75 flex justify-center text-[0.8rem] sm:text-base"
                      onClick={() => {
                        const user = JSON.parse(
                          localStorage.getItem("userInfo")
                        );
                        if (!user) {
                          navigate("/auth", { state: { from: "/" } });
                        } else navigate("/order/checkout");
                      }}
                    >
                      Check out
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full h-full overflow-hidden flex items-start justify-center p-5">
      <Link to="/" className="mx-auto">
        <video
          src={AddCart}
          className="w-full h-[80vh] object-contain sm:object-cover"
          autoPlay
          loop
          muted
        />
      </Link>
    </div>
  );
};

export default Cart;
