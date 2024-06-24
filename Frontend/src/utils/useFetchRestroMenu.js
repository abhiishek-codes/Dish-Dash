import React, { useEffect, useState } from "react";
import axios from "axios";

const useFetchRestroMenu = (id, setMenu) => {
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
    setUrl(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${long}&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTER`
    );
  }

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        if (url) await axios.post("http://localhost:5000", { url: url });

        if (url) {
          const { data } = await axios.get("http://localhost:5000/fetchMenu");
          setMenu(data.data.cards);
          console.log(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMenu();
  }, [url]);
};

export default useFetchRestroMenu;
