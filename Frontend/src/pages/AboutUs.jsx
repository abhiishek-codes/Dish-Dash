import React from "react";
import Aboutus from "url:../assets/videos/Aboutus.mp4";

const AboutUs = () => {
  return (
    <div className="w-full h-full  flex items-center justify-center pb-2  overflow-hidden">
      <div className="border border-bglight w-[95%] h-full m-auto flex items-center justify-center  text-bglight font-['customSans']">
        <div className="flex-1 p-2 bg-bgmedgrey w-full text-center h-full flex  flex-col justify-center gap-y-10">
          <h1 className="font-['Basis'] text-xl">
            "From Click to Crave: Dish Dash Delivers!"
          </h1>
          <h1 className="text-sm  text-center">
            At Dish Dash, we're passionate about connecting hungry customers
            with the best local restaurants in town. Founded in [2024], our
            mission is to make food ordering simple, fast, and delicious. Why
            choose Dish Dash? Diverse cuisine options from top-rated local
            eateries Lightning-fast delivery times User-friendly app interface
            Exclusive deals and promotions Dedicated customer support We're more
            than just a food delivery app – we're your culinary concierge,
            committed to satisfying your cravings one dish at a time.
          </h1>
        </div>
        <div className="flex-1 hidden md:block">
          <video
            className="w-full h-full object-fill"
            autoPlay
            loop
            muted
            src={Aboutus}
          ></video>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
