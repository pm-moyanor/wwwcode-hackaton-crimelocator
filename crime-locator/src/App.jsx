import "./App.css";
import CrimeMap from "./CrimeMap";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";
import Header from "./components/Header";
import SearchFormC from "./components/SearchFormC";
import Footer from "./components/Footer";
import backgroundImage from "./assets/map-locator.jpg";

function App() {
  const [submittedValue, setSubmittedValue] = useState("");

  return (
    <div>
   <Header />
      <main className="relative py-48">
        <img
          src={backgroundImage}
          alt="Background Image"
          className="absolute inset-0 object-cover w-full h-full z-[-2]"
        />
        <div className="absolute inset-0 bg-stone-300  z-[-1] opacity-95"></div>
     

        <SearchFormC
          submittedValue={submittedValue}
          setSubmittedValue={setSubmittedValue}
        />
        <CrimeMap submittedValue={submittedValue} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
