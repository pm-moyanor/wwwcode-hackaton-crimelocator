import React from "react";

const Intro = () => {
  return (
    <div className="intro relative h-[800px]">
      <div className="overlay w-full bg-white h-full absolute"></div>
      <img
        src="/src/assets/map-locator.jpg"
        alt="Background Image"
        className="h-full object-cover absolute inset-0 w-full"
      />
      <div className="w-full h-full bg-slate-900 opacity-90 absolute inset-0"></div>
      <div className="text-container w-full h-full absolute inset-0 flex font-karla flex-col justify-center items-center text-gray-300 z-20">
        <h2 className="text-xl w-1/3 font-thin">
          Crime Map Pro enhances public safety and community awareness. Easily access and explore local crime data, filtering by categories like theft, assault, and more. Get location-based insights with crime counts by Zipcode and city for informed decision-making.
        </h2>
      </div>
    </div>
  );
};

export default Intro;
