import React, { useState } from "react";
import { MENUURL } from "../assets/Constant";
import { useSelector, useDispatch } from "react-redux";
import { addItemToCart } from "../store/cartSlice";

const RegularMenuCategory = ({ title, itemCards, name }) => {
  const [toggle, setToggle] = useState(true);
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const addCart = (data, restroname) => {
    const { name, defaultPrice, category, id, imageId } = data;
    const newItem = {
      restroname,
      name,
      price: defaultPrice ? defaultPrice / 100 : 100,
      category: category ? category : "Veg",
      id,
      imageId,
    };
    dispatch(addItemToCart(newItem));
  };

  return (
    <div className={`flex flex-col w-full ${toggle ? "gap-y-8" : "gap-y-4"}`}>
      <button
        className="flex items-center justify-between"
        onClick={() => setToggle(!toggle)}
      >
        <h1 className="font-['Basis'] text-xl pt-1">{title}</h1>
        <h1 className={`${toggle ? "rotate-90" : "-rotate-90"}`}> ⮞</h1>
      </button>
      {toggle && itemCards && (
        <>
          {itemCards.map((item, idx) => {
            return (
              <div
                className="flex w-full items-center justify-between gap-x-3"
                key={idx * 10}
              >
                <div className="flex flex-col justify-center gap-4 w-1/2 sm:w-3/4">
                  <div>
                    <h1 className="text-sm  sm:text-lg font-['Basis']">
                      {item.card.info.name}
                    </h1>
                    {item.card.info.defaultPrice ? (
                      <h1 className="text-sm  sm:text-lg font-['Basis']">
                        {item.card.info.defaultPrice / 100}
                      </h1>
                    ) : (
                      <h1 className="text-sm  sm:text-lg font-['Basis']">
                        100 Rs
                      </h1>
                    )}
                  </div>
                  <div>
                    <p className="text-[0.6rem]  sm:text-sm font-['customSans']">
                      {item.card.info.description}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center w-1/2 sm:w-1/4 relative">
                  <img
                    src={`${MENUURL}${item.card.info.imageId}`}
                    alt=""
                    className="w-full h-auto max-h-[150px] object-cover rounded-md shadow-xl shadow-bgdarkgrey opacity-70"
                  />
                  <div className="absolute -bottom-4 left-1/2 -translate-x-[45%]">
                    <button
                      className="bg-bglight   font-['Basis'] text-sm rounded-md px-10 py-3  duration-300 active:scale-75 hover:bg-bgred hover:text-bglight"
                      onClick={() => addCart(item.card.info, name)}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}

      <div className="bg-bgdarkgrey rounded-md h-2"></div>
    </div>
  );
};

export default RegularMenuCategory;
