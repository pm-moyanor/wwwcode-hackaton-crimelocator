import { totalCountColors } from "../../colors";

import React from "react";

const ColorChart = ({}) => {
  return (
    <div className="absolute bottom-8 right-8 p-1 md:p-2 bg-white text-black shadow-md">
      <div className="flex flex-col justify-center w-20 md:w-36">
        {totalCountColors.map((item, index) => (
          <div
            key={index}
            style={{
              backgroundColor: item.color,
              padding: "2px",
            }}
          >
            <p className="text-right text-xs p-1">{`${item.range[0]} - ${item.range[1]}`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ColorChart;
