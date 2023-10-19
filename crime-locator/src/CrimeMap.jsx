import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import mapboxgl from "mapbox-gl";
import "./CrimeMap.css";
import { totalCountColors, categoryColors } from "../colors"; // Import both arrays

mapboxgl.accessToken =
  "pk.eyJ1IjoicG1tb3lhbm9yIiwiYSI6ImNsbnVrZzN5bjBkOHkybHFqYXNzb3IxcjUifQ.99b7wHbQY6pShWHiVCNZnA";

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

function getColorAndSize(totalCount) {
  const matchingColorAndSize = totalCountColors.find((option) => {
    const [min, max] = option.range;
    return totalCount >= min && totalCount < max;
  });

  if (matchingColorAndSize) {
    return matchingColorAndSize;
  } else {
    console.log(`Color for ${totalCount}: gray`);
    // If no match found, return a default color and size, replace w/catch error
    return { color: "gray", width: 30, height: 30 };
  }
}

const CrimeMap = ({ submittedValue }) => {
  const mapContainerRef = useRef(null); //save map container
  const [map, setMap] = useState(null);
  const [totalCount, setTotalCount] = useState("");
console.log(submittedValue)
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

  //"201600000594484",11/01/2015  00:00,,"RAPE","13XX E ALMERIA RD","85006","SINGLE FAMILY HOUSE","BD30"

  const { zipcode, dates, category } = submittedValue || {}; 
  const { startDate, endDate } = dates || {}; 

  let baseURL = "";
  const formattedDate = formatDateForURL(startDate, endDate);

  useEffect(() => {
    if (formattedDate) {
      baseURL = `http://localhost:9090/crimeByZipcode?zipcode=${zipcode}&&category=${category}&&start_date=${formattedDate.startDate}&&end_date=${formattedDate.endDate}`;
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
        console.log(response.data.count);
        setTotalCount(response.data.count);
      } catch (error) {
        console.error(error);
      }
    };
    getData(baseURL);
  }, [submittedValue]);

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

      const createMarker = (zipcode, totalCount, totalCountColors) => {
        fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${zipcode}.json?access_token=${mapboxgl.accessToken}`
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((geocodingData) => {
            if (geocodingData.features && geocodingData.features.length > 0) {
              const [longitude, latitude] = geocodingData.features[0].center;

              const customMarkerElement = document.createElement("div");
              customMarkerElement.className = "custom-marker";
              customMarkerElement.innerHTML = `<div class="marker-content">${
                totalCount || ""
              }</div>`;

              const matchingColorAndSize = getColorAndSize(totalCount);
              const matchingColor = matchingColorAndSize.color;
              const matchingSize = matchingColorAndSize;

              customMarkerElement.style.backgroundColor = matchingColor;
              customMarkerElement.style.width = matchingSize.width + "px";
              customMarkerElement.style.height = matchingSize.height + "px";

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
      };
      createMarker(zipcode, totalCount, totalCountColors);

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
      {category ? (
        <h1>crime amount:{totalCount}</h1>
      ) : (
        <>
          <h1>
            amount of {category}: {totalCount}
          </h1>
        </>
      )}
      <div className="map container flex">
        <div className="map-container" ref={mapContainerRef} />
      </div>
    </div>
  );
};

export default CrimeMap;
