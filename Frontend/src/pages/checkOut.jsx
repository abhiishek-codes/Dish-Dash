import React, { useState } from "react";
import StripeWrapper from "../components/Payment";

const CheckOut = () => {
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-between items-center gap-x-2 w-[95%] mx-auto">
      <div className="flex items-center justify-center p-12 flex-1">
        <div className="mx-auto w-full">
          <form method="POST">
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    htmlFor="firstName"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    required
                    placeholder="First Name"
                    value={address.firstName}
                    onChange={handleChange}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    htmlFor="lastName"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    required
                    placeholder="Last Name"
                    value={address.lastName}
                    onChange={handleChange}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
            </div>
            <div className="mb-5">
              <label
                htmlFor="address"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                required
                placeholder="Address"
                value={address.address}
                onChange={handleChange}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    htmlFor="city"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    required
                    placeholder="City"
                    value={address.city}
                    onChange={handleChange}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    htmlFor="state"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    id="state"
                    required
                    placeholder="State"
                    value={address.state}
                    onChange={handleChange}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="flex items-center justify-center w-full flex-1">
        <StripeWrapper address={address}></StripeWrapper>
      </div>
    </div>
  );
};

export default CheckOut;
