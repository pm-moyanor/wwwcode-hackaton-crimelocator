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
            <h1 className="main-title mb-5">Why a Crime Locator?</h1>
            <p>
              Welcome to the Crime Locator, your gateway to exploring historical
              crime data in the USA cities. Our platform simplifies the process
              of accessing and visualizing crime statistics on a map, enabling
              you to make informed decisions about safety in your area. What We
              Offer:
            </p>
            <br />
            <p>
              <ul>
                <li>
                  <span>Historical Data:</span> Access comprehensive
                  historical crime statistics to understand past crime trends in
                  the cities.
                </li>
                <li>
                  <span>Interactive Map:</span> Utilize our user-friendly
                  map interface to search for and visualize crime data in
                  specific locations, neighborhoods, or districts.
                </li>
                <li>
                  <span>Customized Search:</span> Tailor your search by
                  selecting a time frame and specific crime types, so you can
                  retrieve information most relevant to your needs.
                </li>
                <li>
                  <span>Crime Type Details:</span> Learn about the specific
                  types of crimes that have occurred
                </li>
                <p>
                  Stay informed, explore crime types, and make data-driven
                  decisions about your safety and surroundings around the cities
                </p>
              </ul>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
