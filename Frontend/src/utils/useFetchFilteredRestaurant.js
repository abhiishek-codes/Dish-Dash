import React, { useEffect, useState } from "react";
import axios from "axios";

const useFetchFilteredRestaurant = (setRestaurants, collectionId, tags) => {
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
    if (collectionId == tags) {
      setUrl(
        `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${long}&collection=${collectionId}&tags=layout_BAU_Contextual%2Classi&sortBy=&filters=&type=rcv2&offset=0&page_type=null`
      );
    } else
      setUrl(
        `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${long}&collection=${collectionId}&tags=${tags}&sortBy=&filters=&type=rcv2&offset=0&page_type=null`
      );
  }

  useEffect(() => {
    const fetchRestroData = async () => {
      try {
        if (url)
          await axios.post("https://dish-dash.onrender.com/", { url: url });

        if (url) {
          const { data } = await axios.get(
            "https://dish-dash.onrender.com/fetchFilteredRestro"
          );
          console.log(data);
          setRestaurants(data.data.cards);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRestroData();
  }, [url]);
};

export default useFetchFilteredRestaurant;
