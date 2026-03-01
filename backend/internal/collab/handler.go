package collab

import (
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		allowed := os.Getenv("WS_ALLOWED_ORIGINS")
		if strings.TrimSpace(allowed) == "" {
			origin := r.Header.Get("Origin")
			return origin == "http://localhost:3000" || origin == "http://127.0.0.1:3000"
		}
		origin := r.Header.Get("Origin")
		for _, item := range strings.Split(allowed, ",") {
			if strings.TrimSpace(item) == origin {
				return true
			}
		}
		return false
	},
}

func ServeWS(hub *Hub, w http.ResponseWriter, r *http.Request) {
	bookID := strings.TrimSpace(r.URL.Query().Get("bookId"))
	userID := strings.TrimSpace(r.URL.Query().Get("userId"))

	if bookID == "" {
		http.Error(w, "missing query param: bookId", http.StatusBadRequest)
		return
	}
	if userID == "" {
		userID = "anonymous"
	}

	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Printf("upgrade error: %v", err)
		return
	}

	client := NewClient(hub, conn, bookID, userID)
	hub.register <- client

	go client.writePump()
	go client.readPump()
}
