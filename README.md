# Social Network API

API simples de rede social desenvolvida em **.NET 8** com **Entity Framework Core** e **MySQL**.

Permite:

* Cadastro e listagem de usuários.
* Criação e listagem de posts.
* Criação e listagem de comentários.
* Uso de DTOs para retorno seguro e sem referências cíclicas.

## Tecnologias

* .NET 8
* C#
* Entity Framework Core
* MySQL
* BCrypt para hash de senhas

## Estrutura do projeto

* `Program.cs` → configura rotas, DTOs e banco.
* `Models/` → entidades (User, Post, Comment).
* `DTOs/` → Data Transfer Objects.
* `Data/AppDbContext.cs` → contexto EF Core.
* `.gitignore` → ignora arquivos desnecessários.

## Configuração do MySQL

1. Crie um banco de dados no MySQL.
2. Configure a connection string no `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "server=localhost;database=SocialNetworkDb;user=root;password=sua_senha;"
  }
}
```

## Executando o projeto

1. Restaurar pacotes:

```bash
dotnet restore
```

2. Criar migrations e atualizar banco:

```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

3. Executar a API:

```bash
dotnet run
```

A API estará disponível em: `http://localhost:5000` ou `http://localhost:5001` dependendo da configuração.

## Endpoints principais

### Usuários

* `POST /register` → cadastrar usuário
* `GET /users` → listar usuários

### Posts

* `POST /posts` → criar post
* `GET /posts` → listar posts com usuários e comentários

### Comentários

* `POST /comments` → criar comentário
* `GET /comments` → listar comentários com usuário e post


## Como testar:
Com o software Insomnia você pode importar o arquivo `SocialNetworkAPI_Insomnia.json`, na raiz do projeto, nele você já importa a variavies de ambiente, e rotas semi-preenchidadas para um teste melhor da API.

Baixar Insomnia: https://insomnia.rest/download
Como importar o .json: https://developer.konghq.com/how-to/import-an-api-spec-as-a-document 