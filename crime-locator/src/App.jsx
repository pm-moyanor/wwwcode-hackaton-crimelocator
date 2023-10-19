import "./App.css";
import CrimeMap from "./CrimeMap";
import 'mapbox-gl/dist/mapbox-gl.css';
import SearchForm from "./SearchForm";
import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [submittedValue, setSubmittedValue] = useState("");


  return (
    <div>
      <Header />
      <SearchForm
        submittedValue={submittedValue}
        setSubmittedValue={setSubmittedValue}
      />
      <CrimeMap submittedValue={submittedValue} />
      <Footer />
    </div>
  );
}

export default App;

