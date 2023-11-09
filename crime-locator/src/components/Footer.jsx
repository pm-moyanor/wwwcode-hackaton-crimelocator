import React from "react";

const Footer = () => {
  return (
    <div className=" text-gray-200 bg-gray-800 " style={{ boxShadow: "0 1px 32px rgba(241, 159, 71, 0.139)" }}>
      <footer id="footer">
        <div className=" w-[500px] text-sm">
          <span className="text-gray-400">Made by:</span>
          <div className="flex justify-around m-2">
            <div className="flex items-center justify-center">
              <i className="fab fa-github text-gray-400 text-xl"></i>
              <a
                href="https://github.com/KR411-prog"
                target="_blank"
                className="text-white pl-2 hover:underline"
              >
                Radha Ramadoss
              </a>
            </div>

            <div className="flex items-center">
              <i className="fab fa-github text-gray-400 text-xl"></i>
              <a
                href="https://github.com/pm-moyanor"
                target="_blank"
                className="text-white pl-2 hover:underline"
              >
                Paula Moyano
              </a>
            </div>

            <div className="flex items-center">
              <i className="fab fa-github text-gray-400 text-xl"></i>
              <a
                href="https://www.github.com/Shinnmar"
                target="_blank"
                className="text-white pl-2 hover:underline"
              >
                Shirley Ramos
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
