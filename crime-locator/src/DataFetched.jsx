import axios from "axios";
import { useState, useEffect } from "react";

const DataFetched = () => {
  const [crimeData, setCrimeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9090/crimeByZipcode?zipcode=85029&&category=theft&&start_date=09/25/2023&&end_date=11/25/2023"
        );
     
       // setCrimeData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div>
    
    </div>
  );
};

export default DataFetched;
