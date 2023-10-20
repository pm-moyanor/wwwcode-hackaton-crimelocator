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


function SearchForm({ setSubmittedValue }) {
  const [selectedSearchMethod, setSelectedSearchMethod] = useState("zipcode");

  const [inputValue, setInputValue] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [errors, setErrors] = useState({}); // Store validation errors

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
    if (!inputValue) {
      newErrors.zipcode = "Zipcode is required";
    }
    if (!selectedStartDate || !selectedEndDate) {
      newErrors.date = "Start and End date are required";
    }
    if (selectedSearchMethod === "city" && !selectedCategory) {
      newErrors.category = "Category is required when searching by city";
    }

    setErrors(newErrors);

    // Return true if there are no errors, indicating that the form is valid
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isFormValid = validateInputs(); // Check form validation
  
    if (isFormValid) {
      setSubmittedValue({
        searchMethod: selectedSearchMethod,
        zipcode: selectedSearchMethod === "zipcode" ? inputValue : null,
        city: selectedSearchMethod === "city" ? inputValue : null,
        dates: { startDate: selectedStartDate, endDate: selectedEndDate },
        category: selectedCategory,
      });
  
      // Reset the form by setting the state variables to their initial values
      setInputValue("");
      setSelectedStartDate("");
      setSelectedEndDate("");
      setSelectedCategory("");
    }
  };
  

  return (
    <div>
      <form className="w-full " onSubmit={handleSubmit}>
        <div className="filters flex items-center justify-center mt-10 mb-10">
          <div className="first input flex items-center justify-center mr-10">
            <select
              value={selectedSearchMethod}
              onChange={handleSearchMethodChange}
            >
              <option value="zipcode">Search by Zipcode</option>
              <option value="city">Search by City</option>
            </select>

            {selectedSearchMethod === "zipcode" && (
              <div>
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                />
                {errors.zipcode && (
                  <p className="text-red-500 text-sm">{errors.zipcode}</p>
                )}
              </div>
            )}
          </div>

          {selectedSearchMethod === "city" && (
            <div>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
              />
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city}</p>
              )}
            </div>
          )}

          <div className="second input flex items-center justify-center mr-10">
            <select value={selectedCategory} onChange={handleCategoryChange}>
              <option value="">Select Category</option>
              {crimeTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="third input flex items-center justify-center">
            <input
              type="date"
              id="start"
              value={selectedStartDate}
              onChange={handleStartDateChange}
              min="2010-01-01"
              max="2023-10-18"
            />
            {errors.date && (
              <p className="text-red-500 text-sm">{errors.date}</p>
            )}

            <span className="align-middle mx-6 text-gray-500 mt-0.5 ">to</span>

            <input
              type="date"
              id="end"
              value={selectedEndDate}
              onChange={handleEndDateChange}
              min="2010-01-01"
              max="2023-10-18"
            />
          </div>

          <button
            className="text-white bg-indigo-600 focus:outline-none focus:ring-cyan-300 shadow-cyan-500/50 dark:shadow-cyan-800/80 font-medium text-sm px-5 py-2.5 text-center ml-2"
            type="submit"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
