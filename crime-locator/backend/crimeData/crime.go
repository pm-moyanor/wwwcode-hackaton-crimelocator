package crimeData

import (
	"time"
)

type DateTime struct {
	time.Time
}

func (date *DateTime) UnmarshalCSV(d string) (err error) {
	//fmt.Println("record: ", d)
	if d == "" {
		return
	}
	date.Time, err = time.Parse("01/02/2006  15:04", d)
	return err
}

type CrimeCount struct {
	Count int `json:"count"`
}

type CrimeZipcode struct {
		Zipcode int `json:"zipcode"`
		Count int `json:"count"`
}

type CrimeLocation struct {
	IncNumber  string   `csv:"INC NUMBER"`
	OccurredOn DateTime `csv:"OCCURRED ON,omitempty"`
	OccurredTo DateTime `csv:"OCCURRED TO,omitempty"`
	Category   string   `csv:"UCR CRIME CATEGORY"`
	Addr       string   `csv:"100 BLOCK ADDR"`
	Zipcode    int      `csv:"ZIP"`
	Premise    string   `csv:"PREMISE TYPE"`
	Grid       string   `csv:"GRID"`
}
