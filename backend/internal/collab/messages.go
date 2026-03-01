package collab

import "time"

type ClientMessage struct {
	Type    string `json:"type"`
	Content string `json:"content"`
}

type ServerMessage struct {
	Type      string    `json:"type"`
	BookID    string    `json:"bookId"`
	UserID    string    `json:"userId"`
	Content   string    `json:"content"`
	UpdatedAt time.Time `json:"updatedAt"`
}
