import React from "react";

const ContactUs = () => {
  return (
    <div className="flex justify-center items-center h-full font-['customSans'] font-bold text-bglight">
      <div className="flex flex-col md:flex-row bg-white shadow-2xl w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 h-5/6">
        <div className="bg-gradient-to-b from-darkblue to-lightblue w-full md:w-1/2 p-8 flex flex-col justify-center text-white rounded-l-lg">
          <h2 className="text-3xl font-bold mb-4">Get in touch</h2>
          <p className="text-lg mb-2">Visit us</p>
          <p className="mb-4">Mumbai Maharashtra India</p>
          <p className="text-lg mb-2">Chat to us</p>
          <p className="mb-4">dishdash@gmail.com</p>
          <p className="text-lg mb-2">Call us</p>
          <p>Mon-Fri from 8am to 5pm</p>
          <p>(+91) 555-55-55-55</p>
        </div>
        <div className="p-8 w-full md:w-1/2 flex flex-col justify-center text-bgmedgrey">
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              placeholder="Company"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <textarea
              placeholder="Message"
              className="w-full p-2 border border-gray-300 rounded-md h-32"
            ></textarea>
            <button
              type="submit"
              className="w-full p-2 bg-darkblue text-white rounded-md"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
