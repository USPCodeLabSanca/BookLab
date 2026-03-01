package main

import (
	"log"
	"net/http"
	"os"

	"booklab/backend/internal/collab"
)

func main() {
	addr := ":" + envOrDefault("PORT", "8080")

	hub := collab.NewHub()
	go hub.Run()

	mux := http.NewServeMux()
	mux.HandleFunc("/health", func(w http.ResponseWriter, _ *http.Request) {
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte("ok"))
	})
	mux.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		collab.ServeWS(hub, w, r)
	})

	log.Printf("socket server listening on %s", addr)
	if err := http.ListenAndServe(addr, mux); err != nil {
		log.Fatal(err)
	}
}

func envOrDefault(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}
