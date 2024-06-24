import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const delayTime = 2000;

    const timer = setTimeout(() => {
      navigate("/");
    }, delayTime);

    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <div className="bg-[#e0e0e0] h-full flex items-center justify-center">
      <div className="bg-white p-6 md:mx-auto text-center">
        <svg viewBox="0 0 24 24" className="text-[#34D399] w-16 h-16 mx-auto">
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          ></path>
        </svg>
        <div className="text-center">
          <h3 className="text-[#111827] text-xl font-semibold">
            Payment Done!
          </h3>
          <p className="text-[#4B5563] my-3">
            Thank you for completing your secure online payment.
          </p>
          <p className="text-[#4B5563]">Have a great day!</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
