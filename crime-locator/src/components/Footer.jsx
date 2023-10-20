import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <div className="bg-indigo-500 text-white">
      <footer>
        <article>
          <img
            src="wwwcode-hackaton-crimelocator/crime-locator/src/assets/ico-github.svg"
            alt="GitHub icon"
          />
          <a href="#">Radha</a>
        </article>
        <span>|</span>
        <article>
          <img
            src="wwwcode-hackaton-crimelocator/crime-locator/src/assets/ico-github.svg"
            alt="GitHub icon"
          />
          <a href="#">Paula</a>
        </article>
        <span>|</span>
        <article>
          <img
            src="wwwcode-hackaton-crimelocator/crime-locator/src/assets/ico-github.svg"
            alt="GitHub icon"
          />
          <a href="#">Shirley</a>
        </article>
      </footer>
    </div>
  );
};

export default Footer;
