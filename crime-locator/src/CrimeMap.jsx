import React, { useRef, useEffect, useState } from "react";

import axios from "axios";
import mapboxgl from "mapbox-gl";
import ColorChart from "./components/ColorChart";
import "./CrimeMap.css";
import { totalCountColors } from "../colors";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

function getColorAndSize(totalCount) {
  const matchingColorAndSize = totalCountColors.find((option) => {
    const [min, max] = option.range;
    return totalCount >= min && totalCount < max;
  });

  if (matchingColorAndSize) {
    return matchingColorAndSize;
  } else {
    console.log(`Color for ${totalCount}: gray`);
    return { color: "gray", width: 30, height: 30 };
  }
}  

const addCustomMarker = (newMap, longitude, latitude, count, zipcode, matchingColorAndSize) => {
  const customMarkerElement = document.createElement("div");
  customMarkerElement.className = "custom-marker";

  customMarkerElement.innerHTML = `<div>${count || ""}</div>`;

  customMarkerElement.addEventListener("mouseenter", function () {
    customMarkerElement.innerHTML = `<div>${zipcode || ""}</div>`;
  });

  customMarkerElement.addEventListener("mouseleave", function () {
    customMarkerElement.innerHTML = `<div>${count || ""}</div>`;
  });

  customMarkerElement.style.backgroundColor = matchingColorAndSize.color;
  customMarkerElement.style.width = matchingColorAndSize.width + "px";
  customMarkerElement.style.height = matchingColorAndSize.height + "px";

  new mapboxgl.Marker({ element: customMarkerElement })
    .setLngLat([longitude, latitude])
    .addTo(newMap);
};



const CrimeMap = ({ submittedValue }) => {
  const mapContainerRef = useRef(null); 
  const [map, setMap] = useState(null);

  useEffect(() => {
    const newMap = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-112.079417, 33.448271],
      zoom: 9,
      maxZoom: 14,
    });

    newMap.on("load", () => {
      setMap(newMap);

      const phoenixBounds = [
        [-113.5, 32.8], // Southwest corner
        [-111.0, 34.2], // Northeast corner
      ];

      newMap.setMaxBounds(phoenixBounds);
      newMap.addControl(new mapboxgl.NavigationControl(), "top-left");

      const { inputValue, dates, category, searchMethod } =
        submittedValue || {};

      const { startDate, endDate } = dates || {};
      const formattedStartDate = startDate
        ? `${startDate.split("-")[1]}/${startDate.split("-")[2]}/${
            startDate.split("-")[0]
          }`
        : null;
      const formattedEndDate = endDate
        ? `${endDate.split("-")[1]}/${endDate.split("-")[2]}/${
            endDate.split("-")[0]
          }`
        : null;

      let baseURL = "";

      if (searchMethod === "zipcode") {
        if (!category) {
          baseURL = `http://localhost:9090/crimeByZipcode?zipcode=${inputValue}&&start_date=${formattedStartDate}&&end_date=${formattedEndDate}`;
        } else {
          baseURL = `http://localhost:9090/crimeByZipcode?zipcode=${inputValue}&&category=${category}&&start_date=${formattedStartDate}&&end_date=${formattedEndDate}`;
        }
        axios
          .get(baseURL)
          .then((response) => {
            const data = response.data;

            if (data.count) {
              let count = data.count;

              const matchingColorAndSize = getColorAndSize(count);

              fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${inputValue}.json?access_token=${mapboxgl.accessToken}`
              )
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("Network response was not ok");
                  }

                  return response.json();
                })
                .then((geocodingData) => {
                  if (
                    geocodingData.features &&
                    geocodingData.features.length > 0
                  ) {
                    const [longitude, latitude] =
                      geocodingData.features[0].center;
                      addCustomMarker(newMap, longitude, latitude, count, zipcode, matchingColorAndSize);

   
                  } else {
                    alert("No results found for the predefined location.");
                  }
                })
                .catch((error) => {
                  console.error("Geocoding error:", error);
                });
            } else {
              alert("No crimes found for the selected criteria.");
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } else if (searchMethod === "city") {
        axios
          .get(
            `http://localhost:9090/crimeByCity?city=Phoenix&&start_date=${formattedStartDate}&&end_date=${formattedEndDate}`
          )
          .then((cityResponse) => {
            const cityData = cityResponse.data;

            // Extract all unique zip codes fro cityData
            const zipcodes = Array.from(
              new Set(cityData.map((item) => item.zipcode))
            );
            console.log(cityData);
            const fetchCategoriesForZipcodes = (zipcodes) => {
              zipcodes.forEach((zipcode) => {
                axios
                  .get(
                    `http://localhost:9090/crimeByZipcode?zipcode=${zipcode}&&category=${category}&&start_date=${formattedStartDate}&&end_date=${formattedEndDate}`
                  )
                  .then((response) => {
                    const data = response.data;
                    const count = data.count;
                    const matchingColorAndSize =
                      data.count !== 0 && getColorAndSize(data.count);

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
                        if (
                          geocodingData.features &&
                          geocodingData.features.length > 0
                        ) {
                          const [longitude, latitude] =
                            geocodingData.features[0].center;
                            addCustomMarker(newMap, longitude, latitude, count, zipcode, matchingColorAndSize);

                    
                        } else {
                          alert(
                            "No results found for the predefined location."
                          );
                        }
                      })
                      .catch((error) => {
                        console.error("Geocoding error:", error);
                      });
                  })
                  .catch((error) => {
                    console.error(error);
                  });
              });
            };

            fetchCategoriesForZipcodes(zipcodes);
          })
          .catch((cityError) => {
            console.error(cityError);
          });
      } else if (searchMethod === "category" && category) {
        baseURL = `http://localhost:9090/crimeByCategory?category=${category}&&start_date=${formattedStartDate}&&end_date=${formattedEndDate}`;
        axios
          .get(baseURL)
          .then((response) => {
            const data = response.data;
       
            data.forEach((item) => {
              let count = item;

              if (item.count) {
                count = item.count;
              }

              const { zipcode } = item;
              const matchingColorAndSize = getColorAndSize(count);

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
                  if (
                    geocodingData.features &&
                    geocodingData.features.length > 0
                  ) {
                    const [longitude, latitude] =
                      geocodingData.features[0].center;
                      addCustomMarker(newMap, longitude, latitude, count, zipcode, matchingColorAndSize);

                
                  } else {
                    alert("No results found for the predefined location.");
                  }
                })
                .catch((error) => {
                  console.error("Geocoding error:", error);
                });
            });
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });

    return () => newMap.remove();
  }, [submittedValue]);

  return (
    <div className="relative">
      <div className="map relative">
        <div className="map-container  w-full md:w-5/6 relative m-2 md:m-24">
          <div ref={mapContainerRef} className="w-full h-[700px]" />
          <div className="absolute bottom-1 right-0  bg-white text-black shadow-md">
            <ColorChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrimeMap;