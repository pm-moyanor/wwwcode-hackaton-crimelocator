import { totalCountColors } from "../../colors";

import React from "react";

const ColorChart = ({}) => {
  return (
    <div className="absolute bottom-8 right-28 p-2 bg-white text-black shadow-md">
      <div className="flex flex-col w-36">
        {totalCountColors.map((item, index) => (
          <div
            key={index}
            style={{
              backgroundColor: item.color,
              margin: "1px",
              padding:"2px"
            }}
          >
            <p
              style={{ textAlign: "right",fontSize: "14px" ,  padding:"2px"}}
            >{`${item.range[0]} - ${item.range[1]}`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ColorChart;
