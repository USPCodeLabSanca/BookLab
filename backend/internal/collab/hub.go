package collab

import (
	"time"
)

type Hub struct {
	register   chan *Client
	unregister chan *Client
	edits      chan EditCommand
	rooms      map[string]*Room
}

type Room struct {
	BookID    string
	Content   string
	UpdatedAt time.Time
	Clients   map[*Client]bool
}

type EditCommand struct {
	Client  *Client
	Content string
}

func NewHub() *Hub {
	return &Hub{
		register:   make(chan *Client),
		unregister: make(chan *Client),
		edits:      make(chan EditCommand),
		rooms:      make(map[string]*Room),
	}
}

func (h *Hub) Run() {
	for {
		select {
		case c := <-h.register:
			room := h.getOrCreateRoom(c.BookID)
			room.Clients[c] = true

			c.SendJSON(ServerMessage{
				Type:      "snapshot",
				BookID:    room.BookID,
				Content:   room.Content,
				UserID:    c.UserID,
				UpdatedAt: room.UpdatedAt,
			})
		case c := <-h.unregister:
			room := h.rooms[c.BookID]
			if room == nil {
				continue
			}
			if _, ok := room.Clients[c]; ok {
				delete(room.Clients, c)
				close(c.Send)
			}
			if len(room.Clients) == 0 {
				delete(h.rooms, room.BookID)
			}
		case edit := <-h.edits:
			room := h.getOrCreateRoom(edit.Client.BookID)
			room.Content = edit.Content
			room.UpdatedAt = time.Now().UTC()

			msg := ServerMessage{
				Type:      "update",
				BookID:    room.BookID,
				Content:   room.Content,
				UserID:    edit.Client.UserID,
				UpdatedAt: room.UpdatedAt,
			}

			for client := range room.Clients {
				client.SendJSON(msg)
			}
		}
	}
}

func (h *Hub) getOrCreateRoom(bookID string) *Room {
	room, ok := h.rooms[bookID]
	if ok {
		return room
	}
	room = &Room{
		BookID:    bookID,
		Content:   "",
		UpdatedAt: time.Now().UTC(),
		Clients:   make(map[*Client]bool),
	}
	h.rooms[bookID] = room
	return room
}
