package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
)

type Usuario struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
}

func main() {
	err := godotenv.Load("../.env")
	if err != nil {
		log.Println("Aviso: Arquivo .env não encontrado.")
	}

	dbUser := os.Getenv("POSTGRES_USER")
	dbPass := os.Getenv("POSTGRES_PASSWORD")
	dbName := os.Getenv("POSTGRES_DB")
	dbPort := os.Getenv("POSTGRES_PORT")
	dbHost := "localhost"

	connString := fmt.Sprintf("postgres://%s:%s@%s:%s/%s", dbUser, dbPass, dbHost, dbPort, dbName)

	dbPool, err := pgxpool.New(context.Background(), connString)
	if err != nil {
		log.Fatalf("Erro no pool: %v\n", err)
	}
	defer dbPool.Close()

	err = dbPool.Ping(context.Background())
	if err != nil {
		log.Fatalf("Erro no ping: %v\n", err)
	}
	fmt.Println("Conexão estabelecida com o banco de dados!")

	r := chi.NewRouter()
	r.Use(middleware.Logger)

	// Rotas antigas
	r.Get("/ping", func(w http.ResponseWriter, req *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"status": "sucesso"}`))
	})

	r.Get("/testar-banco", func(w http.ResponseWriter, req *http.Request) {
		var currentDB string
		dbPool.QueryRow(context.Background(), "SELECT current_database()").Scan(&currentDB)
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(fmt.Sprintf(`{"banco_conectado": "%s"}`, currentDB)))
	})

	r.Post("/usuarios", func(w http.ResponseWriter, req *http.Request) {
		var u Usuario

		err := json.NewDecoder(req.Body).Decode(&u)
		if err != nil {
			http.Error(w, `{"erro": "Dados inválidos"}`, http.StatusBadRequest)
			return
		}

		sql := "INSERT INTO users (username, email) VALUES ($1, $2) RETURNING id"
		err = dbPool.QueryRow(context.Background(), sql, u.Username, u.Email).Scan(&u.ID)

		if err != nil {
			log.Println("Erro ao inserir:", err)
			http.Error(w, `{"erro": "Falha ao salvar no banco"}`, http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(u)
	})

	r.Get("/usuarios", func(w http.ResponseWriter, req *http.Request) {

		rows, err := dbPool.Query(context.Background(), "SELECT id, username, email FROM users")
		if err != nil {
			http.Error(w, `{"erro": "Falha ao buscar usuários"}`, http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		usuarios := []Usuario{}

		for rows.Next() {
			var u Usuario
			rows.Scan(&u.ID, &u.Username, &u.Email)
			usuarios = append(usuarios, u)
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(usuarios)
	})

	portaAPI := "8080"
	fmt.Printf("Servidor da API rodando na porta %s \n", portaAPI)
	log.Fatal(http.ListenAndServe(":"+portaAPI, r))
}
