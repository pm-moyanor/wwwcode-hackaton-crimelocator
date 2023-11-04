import React from "react";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlassLocation } from "@fortawesome/free-solid-svg-icons";
const Header = () => {
  return (
    <div className="header-box">
      <header className="bg-slate-900 fixed top-0 left-0 right-0 z-50">
        <div className="box justify-between lg:justify-center flex flex-row items-center p-6 md:p-0">
          <div className="flex align-middle h-12">
        
            <h1 className="text-[36px] mt-px font-extrabold text-red-700 font-blackHanSans">CRIME MAP PR</h1>
            <FontAwesomeIcon icon={faMagnifyingGlassLocation} className="text-red-700 mt-[10px] text-[37px]"/>
          </div>
      
        </div>
      </header>
    </div>
  );
};

export default Header;
