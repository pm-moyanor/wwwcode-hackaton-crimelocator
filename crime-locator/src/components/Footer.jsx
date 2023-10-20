import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <div className="bg-black text-white">
      <footer>
        <div>
          Made by:
          <article>
            <i class="fa-brands fa-github"></i>
            <a href="#">Radha</a>
          </article>
          <span>|</span>
          <article>
            <i class="fa-brands fa-github"></i>
            <a href="#">Paula</a>
          </article>
          <span>|</span>
          <article>
            <i class="fa-brands fa-github"></i>
            <a href="#">Shirley</a>
          </article>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
