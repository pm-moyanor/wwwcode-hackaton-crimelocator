import React from "react";
import "./header.css";

const Header = () => {
  return (
    <div className="header-box">
      <header className="bg-white">
        <div className="container box justify-between lg:justify-center flex flex-row items-center p-6 md:p-0">
          <div>
            <img
              src="../src/assets/logo-crimemap-pro.png"
              alt="Crime Locator logo"
            />
          </div>
          <nav className="nav flex flex-wrap items-center justify-center pl-24 text-base md:ml-auto">
            <a href="#intro" className="mr-20 font-medium hover:text-gray-900">
              About
            </a>
            <a href="#map" className="mr-20 font-medium hover:text-gray-900">
              Map
            </a>
            <a href="#readme" className="mr-20 font-medium hover:text-gray-900">
              READ ME
            </a>
            <a href="#footer" className="font-medium hover:text-gray-900">
              Team
            </a>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
