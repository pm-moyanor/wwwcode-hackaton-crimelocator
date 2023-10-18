package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"time"

	handlers "crimerate/handlers"

	gohandlers "github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func main() {
	l := log.New(os.Stdout, "crime-locator", log.LstdFlags)
	h := handlers.NewCrimes(l)

	sm := mux.NewRouter()
	getRouter := sm.Methods("GET").Subrouter()
	getRouter.HandleFunc("/crimeByZipcode", h.GetByZipcode)
	getRouter.HandleFunc("/crimeByCity", h.GetByCity)
	getRouter.HandleFunc("/crimeByCategory", h.GetByCategory)
	ch := gohandlers.CORS(gohandlers.AllowedOrigins([]string{"http://localhost:3000"}))

	s := &http.Server{
		Addr:         ":9090",
		Handler:      ch(sm),
		IdleTimeout:  120 * time.Second,
		ReadTimeout:  1 * time.Second,
		WriteTimeout: 1 * time.Second,
	}

	//go func here because ListenAndServe going to block the main thread
	go func() {
		err := s.ListenAndServe()
		if err != nil {
			l.Fatal(err)
		}
	}()

	sigChan := make(chan os.Signal)
	signal.Notify(sigChan, os.Interrupt)
	signal.Notify(sigChan, os.Kill)

	sig := <-sigChan //its going to block here because reading from a channel will block until a message is consumed.
	l.Println("Received terminate, graceful shutdown", sig)
	tc, _ := context.WithTimeout(context.Background(), 30*time.Second)
	s.Shutdown(tc)
}
