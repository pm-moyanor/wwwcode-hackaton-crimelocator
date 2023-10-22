import React from "react"
import axios from "axios";


function CustomMarker({newMap,zipcode,getColorAndSize,baseURL}){

    axios
    .get(baseURL)
    .then((response) => {
      const data = response.data;

      if (data.count) {
        let count = data.count;

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
       
            const customMarkerElement = document.createElement("div");
            customMarkerElement.className = "custom-marker";
        
            customMarkerElement.innerHTML = `<div>${count || ""}</div>`;

            customMarkerElement.style.backgroundColor =
              matchingColorAndSize.color;
          
            customMarkerElement.style.width =
              matchingColorAndSize.width + "px";
  
            customMarkerElement.style.height =
              matchingColorAndSize.height + "px";

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
    }

  })
  .catch((error) => {
    console.error(error);
  });
}

export default CustomMarker