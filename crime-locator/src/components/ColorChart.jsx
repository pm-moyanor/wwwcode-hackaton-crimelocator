import { totalCountColors } from "../../colors";

import React from "react";

const ColorChart = ({}) => {
  return (
    <div className="flex flex-col w-36 chart">
      {totalCountColors.map((item, index) => (
        <div
          key={index}
          style={{
            backgroundColor: item.color,
      
          }}
        >
          <p
            style={{ textAlign: "right" }}
          >{`${item.range[0]} - ${item.range[1]}`}</p>
        </div>
      ))}
    </div>
  );
};
export default ColorChart;
