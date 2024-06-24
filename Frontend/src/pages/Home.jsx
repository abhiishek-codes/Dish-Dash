import React, { useEffect, useState } from "react";
import useFetchResaurant from "../utils/useFetchResaurant";
import { MINDIMGURL } from "../assets/Constant";
import RestroCard from "../components/RestroCard";
import RestroList from "../components/RestroList";
import Skeleton from "../components/Skeleton";
import { Link } from "react-router-dom";

const Home = () => {
  const [restroList, setRestroList] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredRestro, setFilteredRestro] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedFilters, setSelectedFilters] = useState("");
  const [allrestro, setAllRestro] = useState([]);

  useFetchResaurant(setRestroList);
  //console.log(restroList);
  useEffect(() => {
    let restaurants;

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
    <div className="w-[95%] h-full mx-auto font-['customSans']">
      {restroList.length > 0 && restroList != undefined ? (
        <div className="flex flex-col justify-between gap-y-5 ">
          {restroList.length == 12 ? (
            <div className="flex flex-col justify-between gap-3">
              <h1 className="text-xl font-black  tracking-tight pl-2">
                {restroList[0].card.card.header.title}
              </h1>
              <div className="flex gap-x-4 gap-y-3 flex-wrap justify-center items-center mx-auto">
                {restroList[0].card.card.imageGridCards.info.map(
                  (curr, index) =>
                    index < 8 && (
                      <div
                        key={index}
                        className="w-[131px] h-auto flex items-center justify-center duration-200 hover:active:scale-95"
                      >
                        {/* //{console.log(curr)} */}
                        <Link
                          to={`/filter/${curr.action.text}/restaurants`}
                          state={{ entityId: curr.entityId }}
                        >
                          <img
                            src={MINDIMGURL + curr.imageId}
                            alt="Img"
                            className="max-w-full max-h-full "
                          />
                        </Link>
                      </div>
                    )
                )}
              </div>
              <div className="flex justify-between items-center flex-wrap w-full mx-auto">
                <h1 className="text-2xl font-black  tracking-tight pt-2 pl-2">
                  {restroList[2].card.card.title}
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
                        restroList[4].card.card.gridElements.infoWithStyle.restaurants.filter(
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
                      allrestro &&
                        setFilteredRestro(
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
                          restroList[4].card.card.gridElements.infoWithStyle
                            .restaurants
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-between items-center pt-3 pb-5">
                {filteredRestro &&
                  filteredRestro.map((curr) => {
                    return <RestroCard key={curr.info.id} {...curr.info} />;
                  })}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-7">
              <RestroList restroList={restroList} idx={2} />
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center">
          <Skeleton />
        </div>
      )}
    </div>
  );
};

export default Home;
