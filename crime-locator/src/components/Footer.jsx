import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <div className="text-white">
      <footer id="footer">
        <div className="team">
          <span className="team-subtitle">Made by:</span>
          <div className="team-members">
            <article className="pr-10">
              <i class="fa-brands fa-github"></i>
              <a
                href="https://github.com/KR411-prog"
                target="_blank"
                className="name pl-2"
              >
                Radha Ramadoss
              </a>
            </article>

            <article className="pr-10">
              <i class="fa-brands fa-github"></i>
              <a
                href="https://github.com/pm-moyanor"
                target="_blank"
                className="name pl-2"
              >
                Paula Moyano
              </a>
            </article>

            <article>
              <i class="fa-brands fa-github"></i>
              <a
                href="https://www.github.com/Shinnmar"
                target="_blank"
                className="name pl-2"
              >
                Shirley Ramos
              </a>
            </article>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
