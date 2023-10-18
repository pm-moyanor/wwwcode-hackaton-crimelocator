import React from "react";
import { useState } from "react";


// all styles can be changed

function SearchForm({ submittedValue, setSubmittedValue }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setSubmittedValue(inputValue);

    setInputValue("");
  };

  return (
    <div style={{ margin: "20px" }}>
      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        <div className="flex items-center border-b border-blue-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="zipcode"
            value={inputValue}
            onChange={handleInputChange}
          />
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
