package responseBuilder

import (
	"encoding/json"
	"log"
	"net/http"
)

func WithErr(w http.ResponseWriter, code int, msg string) {
	type errData struct {
		Error string `json:"error"`
	}
	WithJson(w, code, errData{
		Error: msg,
	})
}

func WithJson(w http.ResponseWriter, code int, payload interface{}) {
	dat, err := json.Marshal(payload)
	if err != nil {
		log.Printf("failed to marshal json response: %v ", err)
		w.WriteHeader(500)
		return
	}
	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(code)
	w.Write(dat)
}
