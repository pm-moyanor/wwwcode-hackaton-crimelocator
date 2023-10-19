import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import mapboxgl from "mapbox-gl";
import "./CrimeMap.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoicG1tb3lhbm9yIiwiYSI6ImNsbnVrZzN5bjBkOHkybHFqYXNzb3IxcjUifQ.99b7wHbQY6pShWHiVCNZnA";
const zip = [
  "85001",
  "85003",
  "85010",
  "85012",
  "85002",
  "85004",
  "85006",
  "85013",
];
const crimeTypes = [
  "Theft",
  "Burglary",
  "Assault",
  "Robbery",
  "Murder",
  "Rape",
  "Drug",
];

//colors arrays will be moved to another component to show a card with chart
// logic render random zipcodes of Phoenix with random totalcount values
//logic set to add filter for categories
//all colors to be discussed
//the map displays zoom and navigation, and boundries, can be styled differently after MVP

//pendant:
//cards to display color chart
//possibly different map for cities w/comditional rendering
//header,footer,inputs
//

//dummy - adds a "totalcount value to the items to render different sizes and colors"
const zipCodes = zip.map((location) => ({
  location,
  total_count: Math.floor(Math.random() * 250) + 1,
}));

const totalCountColors = [
  { range: [1, 10], color: "rgba(255, 222, 0, 0.8)", width: 25, height: 25 },
  { range: [10, 30], color: "rgba(255, 143, 50, 0.8)", width: 35, height: 35 },
  { range: [30, 60], color: "rgba(102, 102, 0, 0.8)", width: 45, height: 45 },
  { range: [60, 100], color: "rgba(153, 102, 0, 0.8)", width: 50, height: 50 },
  { range: [100, 200], color: "rgba(204, 51, 0, 0.8)", width: 55, height: 55 },
  {
    range: [200, Infinity],
    color: "rgba(255, 0, 51, 0.8)",
    width: 65,
    height: 65,
  },
];

const categoryColors = [
  {
    crimeCategory: "Theft",
    color: "rgba(0, 255, 0, 0.8)",
    width: 25,
    height: 25,
  },
  {
    crimeCategory: "Burglary",
    color: "rgba(51, 153, 0, 0.8)",
    width: 35,
    height: 35,
  },
  {
    crimeCategory: "Assault",
    color: "rgba(102, 102, 0, 0.8)",
    width: 45,
    height: 45,
  },
  {
    crimeCategory: "Robbery",
    color: "rgba(153, 102, 0, 0.8)",
    width: 50,
    height: 50,
  },
  {
    crimeCategory: "Murder",
    color: "rgba(204, 51, 0, 0.8)",
    width: 55,
    height: 55,
  },
  {
    crimeCategory: "Rape",
    color: "rgba(255, 51, 0, 0.8)",
    width: 65,
    height: 65,
  },
  {
    crimeCategory: "Drug",
    color: "rgba(255, 0, 51, 0.8)",
    width: 75,
    height: 75,
  },
];

function getColorAndSize(total_count) {
  const matchingColorAndSize = totalCountColors.find((option) => {
    const [min, max] = option.range;
    return total_count >= min && total_count < max;
  });

  if (matchingColorAndSize) {
    return matchingColorAndSize;
  } else {
    console.log(`Color for ${total_count}: gray`);
    // If no match found, return a default color and size, replace w/catch error
    return { color: "gray", width: 30, height: 30 };
  }
}

const CrimeMap = ({ submittedValue }) => {
  const mapContainerRef = useRef(null); //save map container
  const [map, setMap] = useState(null);

  function formatDateForURL(startDate, endDate) {
    if (!startDate || !endDate) {
      return null;
    }
    // Split the start and end dates by "-"
    const startDateParts = startDate.split("-");
    const endDateParts = endDate.split("-");

    // Rearrange the parts to match the 'MM/DD/YYYY' format
    const formattedStartDate = `${startDateParts[1]}/${startDateParts[2]}/${startDateParts[0]}`;
    const formattedEndDate = `${endDateParts[1]}/${endDateParts[2]}/${endDateParts[0]}`;

    console.log(formattedStartDate, formattedEndDate);
    return { startDate: formattedStartDate, endDate: formattedEndDate };
  }

  const submittedValue1 = {
    zipcode: "85003",
    dates: {
      startDate: "2020-10-03",
      endDate: "2023-10-04",
    },
  };

  const { zipcode, dates } = submittedValue1;
  const { startDate, endDate } = dates;
  let baseURL = "";
  const formattedDate = formatDateForURL(startDate, endDate);

  if (formattedDate) {
    baseURL = `http://localhost:9090/crimeByZipcode?zipcode=${zipcode}&&category=theft&&start_date=${formattedDate.startDate}&&end_date=${formattedDate.endDate}`;
    console.log(baseURL);
  } else {
    console.log("Empty date", startDate, endDate);
  }

  const getData = async (baseURL) => {
    const options = {
      method: "GET",
      url: baseURL,
    };
    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  getData(baseURL);

  useEffect(() => {
    const newMap = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-112.079417, 33.448271],
      zoom: 12,
      maxZoom: 16,
    });
    newMap.on("load", () => {
      // Save the map instance in the state
      setMap(newMap);

      const createMarkers = (data, colorOptions) => {
        data.forEach((item) => {
          //get coordinates for every zipcode provided
          fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${item.location}.json?access_token=${mapboxgl.accessToken}`
          )
            .then((response) => response.json())
            .then((geocodingData) => {
              if (geocodingData.features && geocodingData.features.length > 0) {
                const [longitude, latitude] = geocodingData.features[0].center;

                const customMarkerElement = document.createElement("div");
                customMarkerElement.className = "custom-marker";
                customMarkerElement.innerHTML = `<div class="marker-content">${
                  item.total_count || ""
                }</div>`;

                const matchingColorAndSize = getColorAndSize(
                  item.total_count,
                  colorOptions
                );
                const matchingColor = matchingColorAndSize.color;
                const matchingSize = matchingColorAndSize;

                customMarkerElement.style.backgroundColor = matchingColor;
                customMarkerElement.style.width = matchingSize.width + "px";
                customMarkerElement.style.height = matchingSize.height + "px";

                // Add a marker for each item
                new mapboxgl.Marker({ element: customMarkerElement })
                  .setLngLat([longitude, latitude])
                  .addTo(newMap);
              } else {
                alert("No results found for the predefined location.");
              }
            })
            .catch((error) => {
              console.error("Geocoding error:", error);
            });
        });
      };

      // Create and add markers for zipCodes and crime categories
      createMarkers(zipCodes, totalCountColors);
      //createMarkers(crimeTypes, categoryColors);

      const phoenixBounds = [
        [-112.3411, 33.3062], // Southwest coordinates
        [-111.8652, 33.7873], // Northeast coordinates
      ];

      newMap.setMaxBounds(phoenixBounds);

      newMap.addControl(new mapboxgl.NavigationControl(), "top-left");
    });

    // Clean up on unmount
    return () => newMap.remove();
  }, []);

  return (
    <div>
      <div className="map-container" ref={mapContainerRef} />
    </div>
  );
};

export default CrimeMap;
