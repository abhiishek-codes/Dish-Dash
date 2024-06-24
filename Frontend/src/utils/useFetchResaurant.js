import React, { useEffect, useState } from "react";
import { RESTROURL1, RESTROURL2 } from "../assets/Constant";
import axios from "axios";

const useFetchResaurant = (setrestroList, setFilteredRestro) => {
  var lat, long;
  const [url, setUrl] = useState("");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
  async function showPosition(position) {
    lat = await position.coords.latitude;
    long = await position.coords.longitude;

    setUrl(`${RESTROURL1}lat=${lat}&lng=${long}${RESTROURL2}`);
  }

  useEffect(() => {
    const fetchRestroData = async () => {
      try {
        if (url)
          await axios.post("https://dish-dash.onrender.com/", { url: url });
        if (url) {
          var { data } = await axios.get(
            "https://dish-dash.onrender.com/fetchRestro",
            {
              mode: "cors",
            }
          );

          console.log(data);
          setrestroList(data.data.cards);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRestroData();
  }, [url]);
};

export default useFetchResaurant;
