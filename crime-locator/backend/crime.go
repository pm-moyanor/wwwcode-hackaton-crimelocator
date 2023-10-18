package handlers

import "log"



type Crimes struct {
	l *log.Logger
}

func NewCrimes(l *log.Logger) *Crimes {
	return &Crimes{l}
}
