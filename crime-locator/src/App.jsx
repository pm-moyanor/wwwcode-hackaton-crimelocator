import "./App.css";
import CrimeMap from "./CrimeMap";
import 'mapbox-gl/dist/mapbox-gl.css';
import SearchForm from "./SearchForm";
import { useState } from "react";


function App() {
  const [submittedValue, setSubmittedValue] = useState("");


  return (
    <div >

      <SearchForm submittedValue={submittedValue} setSubmittedValue={setSubmittedValue}/>
      <CrimeMap submittedValue={submittedValue}/>
    </div>
  );
}

export default App;

