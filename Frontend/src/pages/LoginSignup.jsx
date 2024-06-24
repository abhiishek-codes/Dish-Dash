import React, { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";
import auth from "url:../assets/videos/auth.mp4";

const LoginSignupPage = () => {
  const [isSwapped, setIsSwapped] = useState(false);

  return (
    <div className="w-full h-full flex justify-center items-center bg-white overflow-hidden pb-2 rounded-md">
      <div className="w-[95%] h-full m-auto flex  shadow-2xl">
        <div
          className={`flex-1 transition-transform duration-500 rounded-md ${
            isSwapped ? "md:translate-x-full" : "md:translate-x-0"
          }`}
        >
          <div className="h-full flex flex-col justify-center items-center pt-4 text-bglight bg-bgmedgrey rounded-md">
            {!isSwapped ? (
              <Login setIsSwapped={setIsSwapped} />
            ) : (
              <Signup setIsSwapped={setIsSwapped} />
            )}
          </div>
        </div>
        <div
          className={`flex-1 transition-transform duration-500 hidden rounded-md md:block ${
            isSwapped ? "md:-translate-x-full" : "md:translate-x-0"
          }`}
        >
          <video
            src={auth}
            autoPlay
            loop
            muted
            className="h-full w-full object-cover"
          ></video>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupPage;
