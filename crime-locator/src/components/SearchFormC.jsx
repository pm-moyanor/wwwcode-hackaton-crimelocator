import React, { useState } from "react";

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
    if (!selectedStartDate || !selectedEndDate) {
      newErrors.date = " *Start and End date are required";
    }
    if (selectedSearchMethod === "category" && !selectedCategory) {
      newErrors.category = " *Category is required";
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
        zipcode: selectedSearchMethod === "zipcode" ? inputValue : null,
        city: selectedSearchMethod === "city" ? "city" : null,
        dates: { startDate: selectedStartDate, endDate: selectedEndDate },
        category: selectedSearchMethod === "category" ? selectedCategory : null,
      });

      setInputValue("");
      setSelectedStartDate("");
      setSelectedEndDate("");
      setSelectedCategory("");
    }
  };

  return (
    <div className="search-box m-auto" id="map">
      <form
        className="flex flex-col items-center justify-center"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-row justify-between py-1 items-center filters-mob">
          <div className="city py-1 mr-3 ">
            <input
              type="radio"
              name="searchMethod"
              id="city"
              value="city"
              checked={selectedSearchMethod === "city"}
              onChange={handleSearchMethodChange}
            />
            <label htmlFor="city">Search by City</label>
          </div>

          <div className="zipcode py-1 mr-3 ">
            <input
              type="radio"
              name="searchMethod"
              id="zipcode"
              value="zipcode"
              checked={selectedSearchMethod === "zipcode"}
              onChange={handleSearchMethodChange}
            />
            <label htmlFor="zipcode">Search by Zipcode</label>
            {selectedSearchMethod === "zipcode" && (
              <div>
                <input
                  className="appearance-none bg-white w-56 text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none input-zipcode"
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="enter a Zipcode"
                />
                {errors.zipcode && (
                  <p className="text-red-500 flex items-center text-sm required">{errors.zipcode}</p>
                )}
              </div>
            )}
          </div>
          <div className="py-1 mr-3 category">
            <input
              type="radio"
              name="searchMethod"
              id="category"
              value="category"
              checked={selectedSearchMethod === "category"}
              onChange={handleSearchMethodChange}
            />
            <label htmlFor="category">Search by Category</label>
            {selectedSearchMethod === "category" && (
              <select
                className="appearance-none bg-white text-gray-500 py-1 mr-3 leading-tight focus:outline-none select-category"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="" className="option-category">Select Category</option>

                {crimeTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            )}
            <>
              {" "}
              {errors.category && (
                <p className="text-red-500 flex items-center required text-sm">{errors.category}</p>
              )}
            </>
          </div>
        </div>
        {selectedSearchMethod !== "category" && (
          <div className=" flex flex-row justify-start py-1">
            {/* <label htmlFor="zipcode" className="py-1 mr-3 ">
              Select category
            </label> */}
            <select
              className="appearance-none bg-white text-gray-500 py-1 mr-3 leading-tight focus:outline-none"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">Select Category </option>

              {crimeTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex flex-row max-w-xl justify-between py-1  mb-5 mt-5">
          <input
            className="appearance-none bg-white text-gray-500 w-36 py-1 leading-tight focus:outline-none"
            type="date"
            id="start"
            value={selectedStartDate}
            onChange={handleStartDateChange}
            min="2010-01-01"
            max="2023-10-18"
          />
          {errors.date && <p className="text-red-500 required flex items-center text-sm">{errors.date}</p>}

          <span className="align-middle mx-6 text-gray-500 mt-0.5 flex items-center">to</span>

          <input
            className="appearance-none bg-white text-gray-500 w-36 py-1 leading-tight focus:outline-none"
            type="date"
            id="end"
            value={selectedEndDate}
            onChange={handleEndDateChange}
            min="2010-01-01"
            max="2023-10-18"
          />
        </div>

        <button
          className="flex-shrink-0 bg-black text-white btn-black"
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchFormC;
