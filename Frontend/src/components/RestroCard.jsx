import React from "react";
import { RESTROIMGURL } from "../assets/Constant";
import { Link } from "react-router-dom";

const RestroCard = ({
  name,
  costForTwo,
  locality,
  avgRatingString,
  cloudinaryImageId,
  cuisines,
  id,
}) => {
  return (
    <Link
      className="flex flex-col items-center mx-auto duration-150 hover:scale-95 shadow-sm font-['customSans'] w-[230px]"
      to={`/${name}/menu/${id}`}
    >
      <img
        src={RESTROIMGURL + cloudinaryImageId}
        alt="img"
        className="w-full h-[160px] object-cover rounded-lg"
      />
      <div className="text-left w-full px-2 pt-2">
        <h1 className="text-md font-bold text-ellipsis overflow-hidden whitespace-nowrap">
          {name}
        </h1>
        <h1 className="text-md font-bold text-ellipsis overflow-hidden whitespace-nowrap">{`🌟${avgRatingString}  ${costForTwo}`}</h1>
        <p className="text-sm font-medium  text-ellipsis overflow-hidden whitespace-nowrap">
          {cuisines.join(",")}
        </p>
        <p className="text-sm font-medium  text-ellipsis overflow-hidden whitespace-nowrap">
          {locality}
        </p>
      </div>
    </Link>
  );
};

export default RestroCard;
