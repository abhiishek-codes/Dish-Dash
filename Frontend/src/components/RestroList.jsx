import React, { useState, useEffect } from "react";
import RestroCard from "./RestroCard";

const RestroList = ({ restroList }) => {
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [filteredRestro, setFilteredRestro] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState("");
  const [allrestro, setAllRestro] = useState([]);

  let restaurants;
  useEffect(() => {
    if (
      restroList[4] &&
      restroList[4].card &&
      restroList[4].card.card &&
      restroList[4].card.card.gridElements &&
      restroList[4].card.card.gridElements.infoWithStyle
    ) {
      restaurants =
        restroList[4].card.card.gridElements.infoWithStyle.restaurants;
    } else if (
      restroList[2] &&
      restroList[2].card &&
      restroList[2].card.card &&
      restroList[2].card.card.gridElements &&
      restroList[2].card.card.gridElements.infoWithStyle
    ) {
      restaurants =
        restroList[2].card.card.gridElements.infoWithStyle.restaurants;
    }

    if (restaurants) {
      setFilteredRestro(restaurants);
      setAllRestro(restaurants);
    }
  }, [restroList]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between px-6 flex-wrap gap-y-3 w-full">
        <h1 className="text-2xl font-semibold text-center block lg:inline-block">
          {restroList[0].card.card.title}
        </h1>
        <div className="flex gap-x-2 items-center">
          <input
            type="text"
            className="rounded-md border border-gray-300 px-3 py-1"
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);

              setFilteredRestro(
                restroList[2].card.card.gridElements.infoWithStyle.restaurants.filter(
                  (curr) => {
                    return curr.info.name.includes(e.target.value);
                  }
                )
              );
            }}
          />

          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setFilteredRestro(
                allrestro &&
                  allrestro.filter((curr) => {
                    if (e.target.value === "veg") return curr.info?.veg;
                    else if (e.target.value === "non-veg")
                      return !curr.info?.veg;
                  })
              );
              setSelectedFilters(e.target.value);
            }}
            className=" p-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Filter
            </option>
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
          </select>

          {selectedFilters && (
            <button
              className="bg-bgred px-2 py-1 rounded-lg text-base font-bold text-bglight"
              onClick={() => {
                setFilter("");
                setFilteredRestro(
                  restroList[2].card.card.gridElements.infoWithStyle.restaurants
                );
                setSearch("");
                setSelectedFilters("");
              }}
            >
              {selectedFilters} x
            </button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-between items-center pt-3 pb-5 ">
        {filteredRestro.map((curr, idx) => {
          //console.log(curr);
          return <RestroCard key={curr.info.id} {...curr.info} />;
        })}
      </div>
    </div>
  );
};

export default RestroList;
