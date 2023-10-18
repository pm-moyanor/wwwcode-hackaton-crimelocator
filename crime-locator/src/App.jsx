import "./App.css";
import CrimeMap from "./CrimeMap";
import 'mapbox-gl/dist/mapbox-gl.css';
import SearchForm from "./SearchForm";
import { useState } from "react";
import DataFetched from "./DataFetched";

function App() {
  const [submittedValue, setSubmittedValue] = useState("");


  return (
    <div >
      <DataFetched/>
      <SearchForm submittedValue={submittedValue} setSubmittedValue={setSubmittedValue}/>
      <CrimeMap submittedValue={submittedValue}/>
    </div>
  );
}

export default App;

