import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";


const crimeTypes = [
  "theft",
  "burglary",
  "assault",
  "robbery",
  "murder",
  "rape",
  "drug",
];

function SearchFormC({ setSubmittedValue }) {
  const [selectedSearchMethod, setSelectedSearchMethod] = useState("zipcode");
  const [inputValue, setInputValue] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearchMethodChange = (e) => {
    setSelectedSearchMethod(e.target.value);
    setInputValue(""); // Clear the input field when search method changes
  };

  const handleStartDateChange = (e) => {
    setSelectedStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setSelectedEndDate(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const validateInputs = () => {
    const newErrors = {};
    if (selectedSearchMethod === "zipcode" && !inputValue) {
      newErrors.zipcode = " *Zipcode is required";
    }
    if (selectedSearchMethod === "city" && !inputValue) {
      newErrors.city = " *City is required";
    }
    if (!selectedStartDate || !selectedEndDate) {
      newErrors.date = " *Start and End date are required";
    }
    if (selectedSearchMethod === "category" && !selectedCategory) {
      newErrors.category = "Select a category";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isFormValid = validateInputs();

    if (isFormValid) {
      setSubmittedValue({
        searchMethod: selectedSearchMethod,
        inputValue:
          selectedSearchMethod === "category" ? selectedCategory : inputValue,
        dates: { startDate: selectedStartDate, endDate: selectedEndDate },
        category: selectedCategory,
      });
    }
  };

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [selectedSearchMethod]);
console.log(inputValue)
  return (
    <div
      className="search-box my-2 p-5 h-[500px] w-full z-20 flex justify-center "
      id="map"
    >
      <form
        className="flex flex-col bg-cyan-900 items-center justify-center w-3/5 font-karla p-12"
        style={{ boxShadow: "0 1px 32px rgba(241, 159, 71, 0.109)" }}
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col w-full justify-around py-1  mb-5 mt-5">
          <div className="search-method flex justify-center text-gray-300 text-md uppercase pb-5 w-full">
            <input
              type="radio"
              name="searchMethod"
              id="city"
              value="city"
              checked={selectedSearchMethod === "city"}
              onChange={handleSearchMethodChange}
            />
            <label htmlFor="city" className="mr-10 ml-1">
              Search by City
            </label>

            <input
              type="radio"
              name="searchMethod"
              id="zipcode"
              value="zipcode"
              checked={selectedSearchMethod === "zipcode"}
              onChange={handleSearchMethodChange}
            />
            <label htmlFor="zipcode" className="mr-10 ml-1">
              Search by Zipcode
            </label>

            <input
              type="radio"
              name="searchMethod"
              id="category"
              value="category"
              checked={selectedSearchMethod === "category"}
              onChange={handleSearchMethodChange}
            />
            <label htmlFor="category" className="mr-10 ml-1">
              Search by Category
            </label>
          </div>
          <span className="h-px w-full bg-gray-400"></span>
          {selectedSearchMethod !== "category" && (
            <>
              <input
                className="appearance-none bg-cyan-800 w-full text-gray-500 py-1 px-2 mt-5 h-10 leading-tight border border-gray-700 focus:outline-none"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                ref={inputRef}
                placeholder={
                  selectedSearchMethod === "city"
                    ? "enter a City"
                    : "enter a Zipcode"
                }
              />
              <div
                className={`category-input ${
                  selectedSearchMethod === "category" ? "hidden" : ""
                }`}
              >
                <select
                  className=" bg-cyan-800 w-full text-gray-200 py-2 px-4 mt-5 h-10 focus:outline-none select appearance-none border border-gray-700 "
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="" className=" option flex items-center">
                    ALL CATEGORIES
                  </option>

                  {crimeTypes.map((type) => (
                    <option
                      key={type}
                      value={type}
                      className=" option flex items-center"
                    >
                      {type.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {selectedSearchMethod === "category" && (
            <>
              <select
                className=" bg-cyan-950 w-full text-gray-200 py-2 px-4 mt-5 h-10 focus:outline-none select appearance-none border border-gray-700 "
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="" className=" option flex items-center">
                  ALL CATEGORIES
                </option>

                {crimeTypes.map((type) => (
                  <option
                    key={type}
                    value={type}
                    className=" option flex items-center"
                  >
                    {type.toUpperCase()}
                  </option>
                ))}
              </select>
            </>
          )}

          {errors.zipcode && (
            <p className="text-red-500 flex items-center text-sm required">
              {errors.zipcode}
            </p>
          )}
          {errors.city && (
            <p className="text-red-500 flex items-center text-sm required">
              {errors.city}
            </p>
          )}
          {errors.category && (
            <p className="text-red-500 flex items-center required text-sm">
              {errors.category}
            </p>
          )}
        </div>
        <span className="h-px w-full bg-gray-400"></span>
        <div className="flex flex-row max-w-xl justify-between py-1  mb-5 mt-5">
          <input
            className="appearance-none bg-cyan-800 uppercase text-gray-400 w-34 py-1  px-3 leading-tight focus:outline-none"
            type="date"
            id="start"
            value={selectedStartDate}
            onChange={handleStartDateChange}
            min="2010-01-01"
            max="2023-10-18"
          />
          {errors.date && (
            <p className="text-red-500 required flex items-center text-sm">
              {errors.date}
            </p>
          )}

          <span className="align-middle mx-10 text-gray-200 mt-0.5 flex items-center">
            to
          </span>

          <input
            className="appearance-none bg-cyan-800 uppercase text-gray-400 w-34 py-1 px-3 focus:outline-none"
            type="date"
            id="end"
            value={selectedEndDate}
            onChange={handleEndDateChange}
            min="2010-01-01"
            max="2023-10-18"
          />
        </div>

        <button
          className="flex-shrink-0 w-full h-10 text-md bg-red-600 uppercase  text-gray-200 btn-black"
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchFormC;
