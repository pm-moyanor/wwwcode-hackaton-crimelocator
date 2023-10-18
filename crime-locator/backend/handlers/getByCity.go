package handlers

import (
	crimeData "crimerate/crimeData"
	"crimerate/responseBuilder"
	"net/http"
	"os"
	"time"

	"github.com/gocarina/gocsv"
)

// curl -X GET "http://localhost:9090/crimeByCity?city=Phoenix&&start_date=09/25/2023&&end_date=10/25/2023"
//
//	curl -X GET "http://localhost:9090/crimeByCity?city=Phoenix&&start_date=09/25/2023&&end_date=09/25/2023"
func (c *Crimes) GetByCity(rw http.ResponseWriter, r *http.Request) {
	c.l.Println("Handle get crimes rate by city")
	city := r.URL.Query().Get("city")
	start_date := r.URL.Query().Get("start_date")

	s_date, err := time.Parse("01/02/2006", start_date)
	if err != nil {
		panic(err)
	}
	s_date = s_date.Add(-24 * time.Hour)

	end_date := r.URL.Query().Get("end_date")
	e_date, err := time.Parse("01/02/2006", end_date)
	if err != nil {
		panic(err)
	}
	e_date = e_date.Add(24 * time.Hour)

	c.l.Printf("city: %v\n  start_date: %v\n end_date: %v\n ", city, s_date, e_date)

	file, err := os.Open("crime-data_crime-data_crimestat_small.csv")
	if err != nil {
		panic(err)
	}
	defer file.Close()

	// Read the CSV file into a slice of Record structs
	var records []crimeData.CrimeLocation
	if err := gocsv.UnmarshalFile(file, &records); err != nil {
		panic(err)
	}

	//c.l.Println(records)
	// Print the records
	cityRecordsMap := make(map[int]int)
	for _, record := range records {

		if record.OccurredOn.IsZero() {
			continue
		}
		//c.l.Println(s_date, record.OccurredOn.Time, e_date)

		if e_date.After(record.OccurredOn.Time) && s_date.Before(record.OccurredOn.Time) {

			cityRecordsMap[record.Zipcode]++

		}

	}

	var results []crimeData.CrimeZipcode

	c.l.Println(cityRecordsMap)
	for k, v := range cityRecordsMap {
		results = append(results, crimeData.CrimeZipcode{k, v})
	}
	c.l.Println(results)
	responseBuilder.WithJson(rw, 201, results)
}
