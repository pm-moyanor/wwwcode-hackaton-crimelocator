package handlers

import (
	crimeData "crimerate/crimeData"
	"crimerate/responseBuilder"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/gocarina/gocsv"
)

// curl -X GET "http://localhost:9090/crimeByCategory?category=theft&&start_date=09/25/2023&&end_date=11/25/2023"
func (c *Crimes) GetByCategory(rw http.ResponseWriter, r *http.Request) {
	c.l.Println("Handle get crimes rate by category")
	category := r.URL.Query().Get("category")
	category = strings.ToUpper(category)
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

	c.l.Printf("category: %v\n  start_date: %v\n end_date: %v\n ", category, s_date, e_date)

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

	categoryRecordsMap := make(map[int]int)
	for _, record := range records {
		if strings.Contains(record.Category, category) {
			if record.OccurredOn.IsZero() {
				continue
			}
			//c.l.Println(s_date, record.OccurredOn.Time, e_date)

			if e_date.After(record.OccurredOn.Time) && s_date.Before(record.OccurredOn.Time) {

				categoryRecordsMap[record.Zipcode]++

			}
		}

	}

	var results []crimeData.CrimeZipcode

	c.l.Println(categoryRecordsMap)
	for k, v := range categoryRecordsMap {
		results = append(results, crimeData.CrimeZipcode{k, v})
	}
	c.l.Println(results)
	responseBuilder.WithJson(rw, 201, results)
}
