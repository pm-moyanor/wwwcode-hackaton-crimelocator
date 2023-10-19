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
    <div className="w-full m-20 max-w-4xl">
      <form className="w-full " onSubmit={handleSubmit}>
      <div className="flex items-center justify-between border-b border-blue-500 py-2">
          <select
            className="appearance-none bg-transparent text-gray-500 w-40 py-1 leading-tight focus:outline-none"
            value={selectedSearchMethod}
            onChange={handleSearchMethodChange}
          >
            <option value="zipcode">Search by Zipcode</option>
            <option value="city">Search by City</option>
          </select>

          {selectedSearchMethod === "zipcode" && (
          <div>
            <input
              className="appearance-none border border-sky-500 bg-transparent border-none w-56 text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
            />
            {errors.zipcode && (
              <p className="text-red-500 text-sm">{errors.zipcode}</p>
            )}
          </div>
        )}

        {selectedSearchMethod === "city" && (
          <div>
            <input
              className="appearance-none border border-sky-500 bg-transparent border-none w-56 text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city}</p>
            )}
          </div>
        )}

          
          <select
            className="appearance-none bg-transparent text-gray-500 w-40 py-1 mr-3 leading-tight focus:outline-none"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">Select Category</option>
            <option value="">All Types</option> {/* Add the "All Types" option */}
  {crimeTypes.map((type) => (
    <option key={type} value={type}>
      {type}
    </option>
  ))}
            {crimeTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <div className="flex flex-row justify-between py-1">
            <input
              className="appearance-none bg-transparent text-gray-500 w-36 py-1 leading-tight focus:outline-none"
              type="date"
              id="start"
              value={selectedStartDate}
              onChange={handleStartDateChange}
              min="2010-01-01"
              max="2023-10-18"
            />
            {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}

            <span className="align-middle mx-6 text-gray-500 mt-0.5 ">to</span>

            <input
              className="appearance-none bg-transparent text-gray-500 w-36 py-1 leading-tight focus:outline-none"
              type="date"
              id="end"
              value={selectedEndDate}
              onChange={handleEndDateChange}
              min="2010-01-01"
              max="2023-10-18"
            />
          </div>

          <button
            className="flex-shrink-0 bg-blue-800 hover:bg-blue-500 border-blue-800 hover:border-blue-500 text-sm border-4 text-white py-1 px-2"
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
