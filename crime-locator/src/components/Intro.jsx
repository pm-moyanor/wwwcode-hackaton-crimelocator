import React from "react";
import "./intro.css";

const Intro = () => {
  return (
    <div>
      <div className="intro text-white flex items-center justify-center">
        <div
          className="overlay flex flex-col items-center justify-center"
          id="intro"
        >
          <div className="container mx-auto mt-10 mb-10 flex flex-col items-center justify-center">
            <h1 className="main-title mb-5">Why a Crime Locator?</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti
              mollitia consectetur laborum quos, consequuntur sunt ducimus
              adipisci ad veritatis nesciunt aperiam commodi, quia, repellat
              quisquam nostrum omnis ab deleniti! Adipisci! Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Adipisci sunt, laudantium
              odio est inventore nisi delectus asperiores quod debitis ullam,
              ducimus vero, nulla quidem tempora culpa aspernatur cum fugiat
              consequatur!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
