import React from "react";
import { useState } from "react";

// all styles can be changed

function SearchForm({ setSubmittedValue }) {
  const [inputValue, setInputValue] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setSelectedStartDate(e.target.value);
  };
  const handleEndDateChange = (e) => {
    setSelectedEndDate(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setSubmittedValue({
      zipcode: inputValue,
      date: { startDate: selectedStartDate, endDate: selectedEndDate },
    });

    setInputValue("");
  };
// styles need adjust
  return (
    <div className="w-full m-20 max-w-4xl">
      <form className="w-full " onSubmit={handleSubmit}>
        <div className="flex items-center justify-between border-b border-blue-500 py-2">
          <input
            className="appearance-none border border-sky-500 bg-transparent border-none w-56 text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="zipcode"
            value={inputValue}
            onChange={handleInputChange}
          />

          <div className="flex flex-row justify-between py-1">
            <input
              className=" appearance-none bg-transparent text-gray-500 w-full py-1  leading-tight focus:outline-none"
              type="date"
              id="start"
              value={selectedStartDate}
              onChange={handleStartDateChange}
              min="2010-01-01"
              max="2023-10-18"
            />

            <span className=" align-middle mx-6 text-gray-500  mt-0.5 ">to</span>

            <input
              className="appearance-none bg-transparent  w-full text-gray-500  py-1  leading-tight focus:outline-none"
              type="date"
              id="end"
              value={selectedEndDate}
              onChange={handleEndDateChange}
              min="2010-01-01"
              max="2023-10-18"
            />
          </div>

          <button
            className="flex-shrink-0. bg-blue-800 hover:bg-blue-500 border-blue-800 hover:border-blue-500 text-sm border-4 text-white py-1 px-2"
            type="submit"
          >
            search
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
