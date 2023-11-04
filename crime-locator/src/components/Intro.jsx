import React from "react";
import "./intro.css";

const Intro = () => {
  return (
<div className="intro h-2/3 relative" >
  
      <div className="overlay w-full relative z-10">
        <img
          src="/src/assets/map-locator.jpg"
          alt="Background Image"
          className="object-cover absolute inset-0 w-full h-full"
        />
        <div className="w-full h-full bg-sky-800 opacity-80 absolute inset-0"></div>
      </div>
      <div className="text-container w-full h-700 absolute inset-0 flex font-karla flex-col justify-center items-center text-gray-300 z-20">
       <h2 className="text-xl w-1/3 font-karla font-thin">
       Crime Map Pro enhances public safety and community awareness. Easily access and explore local crime data, filtering by categories like theft, assault, and more. Get location-based insights with crime counts by Zipcode and city for informed decision-making.

       </h2>

      </div>
    </div>
  );
};

export default Intro;
