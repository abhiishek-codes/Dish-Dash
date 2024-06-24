import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Skeleton from "./Skeleton";
import useFetchFilteredRestaurant from "../utils/useFetchFilteredRestaurant";
import RestroCard from "./RestroCard";

const FilteredRestaurant = () => {
  const location = useLocation();
  const { entityId } = location.state || {};
  const urlString = entityId;
  const [restaurants, setRestaurants] = useState([]);
  if (urlString.includes("collection")) {
    const url = new URL(urlString.replace("swiggy://", "http://"));
    const collectionId = url.searchParams.get("collection_id");
    const tags = url.searchParams.get("tags");

    useFetchFilteredRestaurant(setRestaurants, collectionId, tags);
  } else {
    const url = entityId;
    const collection_id = entityId;
    const tags = entityId;
    useFetchFilteredRestaurant(setRestaurants, collection_id, tags);
  }

  // console.log(restaurants);

  return (
    <div className="w-[95%] h-full mx-auto font-['customSans']">
      {restaurants.length > 0 ? (
        <div className="flex flex-col  gap-y-4 justify-center">
          <div className="bg-gradient-to-b from-bglight to bg-bgdarkgrey p-4 rounded-md">
            <div className="flex flex-col gap-y-1 justify-center px-2 ">
              <h1 className="text-lg sm:text-2xl font-bold">
                {restaurants[0].card.card.title}
              </h1>
              <p className="text-sm sm:text-lg font-normal">
                {restaurants[0].card.card.description}
              </p>
            </div>
          </div>
          <h1 className="text-lg sm:text-2xl font-bold px-4">
            {restaurants[0].card.card.count} to explore !!
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-between items-center pt-3 pb-5">
            {restaurants &&
              restaurants.map((curr, idx) => {
                if (idx > 2 && idx < restaurants.length - 1) {
                  return (
                    <RestroCard
                      key={curr.card.card.info.id}
                      {...curr.card.card.info}
                    />
                  );
                }
              })}
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

export default FilteredRestaurant;
