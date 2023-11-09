import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchLocation } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <div>
      <header className="bg-gray-800 top-0 left-0 right-0 z-50 h-24 flex items-center p-6 md:p-0">
        <div className="container mx-auto flex justify-center items-center">
          <div className="flex items-center">
            <h1 className=" text-2xl md:text-5xl font-extrabold text-red-500 font-blackHanSans">
              CRIME MAP PR
            </h1>
            <FontAwesomeIcon
              icon={faSearchLocation}
              className="text-red-500 text-2xl md:text-5xl"
            />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
