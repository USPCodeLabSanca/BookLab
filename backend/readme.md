# Guia de Instalação do Docker para o Projeto

Este guia fornece as etapas para configurar o ambiente do projeto usando Docker, incluindo PostgreSQL e PgAdmin.

## Pré-requisitos

- **Docker** e **Docker Compose** instalados. Caso não tenha, siga os links para instalação:
  - [Instalação do Docker](https://docs.docker.com/get-docker/)
  - [Instalação do Docker Compose](https://docs.docker.com/compose/install/)

## Passos para Configuração

1. **Clone o repositório** do projeto:
   
2. **Crie o arquivo `.env`**:

   Copie o arquivo `.env.example` para `.env` na raiz do projeto e edite as variáveis conforme necessário para o seu ambiente local:

   ```bash
   cp .env.example .env
   ```

   O arquivo `.env.example` contém as configurações padrão que você pode ajustar conforme sua necessidade.

   **Exemplo de variáveis no `.env`:**

   ```env
   POSTGRES_USER=seu_usuario
   POSTGRES_PASSWORD=sua_senha
   POSTGRES_DB=seu_banco_de_dados
   POSTGRES_PORT=5432

   PG_ADMIN_MAIL=admin@example.com
   PG_ADMIN_PASS=admin_password
   ```

   **Nota**: Ajuste os valores de acordo com a sua configuração local.

3. **Inicie os containers do Docker**:

   Na raiz do projeto (onde o arquivo `docker-compose.yml` está localizado), execute o seguinte comando para construir e iniciar os containers:

   ```bash
   docker-compose up --build
   ```

   Isso iniciará dois serviços:

   * **PostgreSQL**: um banco de dados PostgreSQL configurado conforme as variáveis do arquivo `.env`.
   * **PgAdmin**: uma interface web para gerenciar o banco de dados PostgreSQL.

   O comando `--build` é necessário para garantir que as configurações sejam aplicadas corretamente.

4. **Acesse o PgAdmin**:

   Após o Docker Compose iniciar os containers, você poderá acessar o PgAdmin pela URL:

   ```url
   http://localhost:5051
   ```

   * **Login**:

     * **Email**: O email que você configurou na variável `PG_ADMIN_MAIL`.
     * **Senha**: A senha configurada em `PG_ADMIN_PASS`.

   Depois de acessar o PgAdmin, adicione uma nova conexão ao PostgreSQL usando as credenciais definidas no arquivo `.env`:

   * **Host**: `db`
   * **Porta**: `5432` (ou a porta definida em `POSTGRES_PORT`)
   * **Usuário**: O usuário configurado em `POSTGRES_USER`
   * **Senha**: A senha configurada em `POSTGRES_PASSWORD`
   * **Banco de Dados**: O banco de dados configurado em `POSTGRES_DB`

5. **Parar os containers**:

   Para parar os containers, execute:

   ```bash
   docker-compose down
   ```

6. **Outros Comandos Úteis**:

   * **Reiniciar os containers**:

     ```bash
     docker-compose restart
     ```
   * **Verificar logs dos containers**:

     ```bash
     docker-compose logs
     ```

## Detalhes dos Serviços

* **PostgreSQL (db)**:

  * A imagem usada é `postgres:16`.
  * O banco de dados é configurado com as variáveis de ambiente definidas no arquivo `.env`.
  * A configuração de saúde (`healthcheck`) garante que o banco de dados só será considerado "pronto" quando ele estiver acessível.

* **PgAdmin**:

  * A imagem usada é `dpage/pgadmin4:8`.
  * O PgAdmin será acessível na porta `5051` no seu navegador.
  * As credenciais de login do PgAdmin são configuradas nas variáveis de ambiente `PGADMIN_DEFAULT_EMAIL` e `PGADMIN_DEFAULT_PASSWORD` no arquivo `.env`.

## Conclusão

Agora, você tem um ambiente com PostgreSQL e PgAdmin rodando via Docker, pronto para desenvolvimento.
