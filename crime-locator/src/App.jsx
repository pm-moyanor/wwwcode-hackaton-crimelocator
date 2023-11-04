import "./App.css";
import CrimeMap from "./CrimeMap";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";
import Header from "./components/Header";
import Intro from "./components/Intro";
import SearchFormC from "./components/SearchFormC";
import ColorChart from "./components/ColorChart";
import Footer from "./components/Footer";

function App() {
  const [submittedValue, setSubmittedValue] = useState("");

  return (
    <div className="bg-gray-900">
      <Header />
      <Intro />
      <SearchFormC
        submittedValue={submittedValue}
        setSubmittedValue={setSubmittedValue}
      />
      <CrimeMap submittedValue={submittedValue} />

      <Footer />
    </div>
  );
}

export default App;
