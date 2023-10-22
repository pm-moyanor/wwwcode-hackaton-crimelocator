import React from "react";
import "./intro.css";

const Intro = () => {
  return (
    <div>
      <div className="intro text-white flex">
        <div
          className="overlay flex flex-col items-center justify-center"
          id="intro"
        >
          <div className="container mt-10 flex flex-col items-center text-left">
            <h1 className="main-title mb-5">What is CrimeMap Pro?</h1>
            <p>
              CrimeMap Pro can address several challenges on Enhancing public
              safety, Community Awareness to promote awareness of local crime
              statistics, helps government agencies to take an active role in
              keeping the crime prone areas more safe and help in law
              enforcement strategies
            </p>
            <br />
            <p>
              Our project provides user-friendly access to crime data where the
              users can filter and sort data by categories like theft, assault,
              burglary, robbery, murder, rape, and drug crimes. The project
              provies location based insights where it offers crime counts by
              Zipcode and city.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
