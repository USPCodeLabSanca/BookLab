# Go Socket Backend (MVP)

This backend exposes a WebSocket endpoint for collaborative text editing by `bookId`.

## Run

```bash
cd backend
go mod tidy
go run ./cmd/server
```

Server starts on `http://localhost:8080` by default.

### Environment variables

- `PORT` (default: `8080`)
- `WS_ALLOWED_ORIGINS` (optional, comma-separated). Example:

```bash
export WS_ALLOWED_ORIGINS="http://localhost:3000,http://127.0.0.1:3000"
```

## Endpoints

- `GET /health` -> `ok`
- `GET /ws?bookId=<id>&userId=<id>` -> websocket upgrade

## Message protocol

Client -> server:

```json
{ "type": "edit", "content": "new full text" }
```

Server -> clients in same `bookId` room:

```json
{
  "type": "snapshot",
  "bookId": "123",
  "userId": "alice",
  "content": "",
  "updatedAt": "2026-03-01T12:00:00Z"
}
```

```json
{
  "type": "update",
  "bookId": "123",
  "userId": "bob",
  "content": "updated text",
  "updatedAt": "2026-03-01T12:01:00Z"
}
```

## Quick manual test

Use any websocket client (browser extension, Postman, `wscat`, etc.).

Connect two clients to:

```
ws://localhost:8080/ws?bookId=book-1&userId=u1
ws://localhost:8080/ws?bookId=book-1&userId=u2
```

Send from one:

```json
{ "type": "edit", "content": "Chapter 1 draft..." }
```

Both clients should receive `update` with the same content.
