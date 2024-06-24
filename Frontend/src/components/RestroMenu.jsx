import React, { useState, useEffect } from "react";
import useFetchRestroMenu from "../utils/useFetchRestroMenu";
import { useParams } from "react-router-dom";
import Skeleton from "../components/Skeleton";
import Hamburger from "url:../assets/videos/Hamburger.mp4";
import NestedMenuCategory from "./NestedMenuCategory";
import RegularMenuCategory from "./RegularMenuCategory";

const RestroMenu = () => {
  const { id } = useParams();
  const [menu, setMenu] = useState([]);
  const [menuDetails, setMenuDetails] = useState([]);

  useFetchRestroMenu(id, setMenu);

  let areaName,
    avgRatingString,
    locality,
    costForTwoMessage,
    cloudinaryImageId,
    cuisines,
    totalRatingsString,
    name;
  if (menu) {
    ({
      areaName,
      avgRatingString,
      locality,
      costForTwoMessage,
      cloudinaryImageId,
      cuisines,
      totalRatingsString,
      name,
    } = menu[2]?.card?.card?.info || {});
  }

  // console.log(menuDetails);

  useEffect(() => {
    const filteredMenu = menu.filter((curr) => curr.groupedCard);
    let regularCards = filteredMenu.map(
      (curr) => curr.groupedCard.cardGroupMap.REGULAR.cards
    );
    setMenuDetails(regularCards);
  }, [menu]);

  return (
    <div className="w-[80%] lg:w-[70%] xl:w-[60%] mx-auto">
      {menu.length > 0 ? (
        <div className="flex flex-col gap-6 pb-5">
          <div className="flex flex-col gap-4 ">
            <h1 className="font-['Basis'] text-2xl">{name}</h1>
            <div className="bg-bgdarkgrey rounded-md h-2"></div>
            <div className="bg-gradient-to-b from-bglight to bg-bgdarkgrey p-4 rounded-md">
              <div className="border-bgdarkgrey bg-bglight  ring-1  ring-bgdarkgrey flex flex-col gap-y-1 p-2 font-['customSans'] text-sm font-semibold rounded-md">
                <h1>
                  {avgRatingString} 🌟 {totalRatingsString} {costForTwoMessage}
                </h1>
                <p>{cuisines.join(", ")}</p>
                <p>
                  Outlet : {locality},{areaName}
                </p>
              </div>
            </div>
            <div className="font-['Basis'] text-center text-2xl tracking-widest flex gap-x-2 justify-center items-center">
              <video autoPlay loop muted src={Hamburger} />
              <h1>MENU</h1>
              <video autoPlay loop muted src={Hamburger} />
            </div>
          </div>
          <div className="bg-bgdarkgrey rounded-md h-2"></div>
          <div className="flex flex-col items-center justify-center">
            {menuDetails.length > 0 && (
              <div className="flex flex-col items-center justify-center gap-4 w-full">
                {menuDetails.map((curr, idx) =>
                  curr.map((item, itemIdx) => {
                    if (itemIdx > 1 && itemIdx < curr.length - 2) {
                      if (
                        item.card.card["@type"] ===
                        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
                      ) {
                        return (
                          <RegularMenuCategory
                            {...item.card.card}
                            key={itemIdx}
                            name={name}
                          />
                        );
                      } else {
                        return null;
                      }
                    }
                    return null;
                  })
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <Skeleton />
        </div>
      )}
    </div>
  );
};

export default RestroMenu;
