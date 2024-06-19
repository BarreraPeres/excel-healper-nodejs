## Aplicação web para manipular dados do Excel

Criar uma aplicação web para manipular dados do Excel, esta aplicação auxilia na criação, validação, armazenamento e exportação de dados em formato Excel.

## Requisitos Funcionais
- [x] Deve ser possível enviar dados a uma planilha Excel 
- [x] Deve ser possível armazenar dados válidos em um banco de dados
- [x] Deve ser possível processar e validar os dados.
- [x] Deve ser possivel baixar a planilha Excel validada.
- [x] Deve ser possível inserir novos registros
- [x] Deve ser possível listar registros existentes. 
- [x] Deve ser Possivel deletar registros. 

## Regras De Negocio

- [x] Garantir que nomes tenham mínimo 4 caracteres.
- [x] Garantir emails em formato valídos. 
- [x] Garantir que não tenha dados duplicado.


## Instalação

### Pré-requisitos

- Docker
- Docker Compose

### Passos para Instalação
1. Clone o repositório:

   ```sh
   git clone https://github.com/BarreraPeres/excel-healper-nodejs.git
   cd excel-healper-nodejs/

2. Construa e inicie os contêineres Docker:
 
    ```sh
   docker-compose build
   docker-compose up

3. Documentação da API (Swagger): 
A documentação da API está disponível através do Swagger UI. Após iniciar o servidor, você pode acessá-la em:
   ```sh
   http://localhost:8080/docs


### Caso queira testar no banco de dados:

1. Execute as migrações do banco de dados:
   ```sh
   npm run db:migrate
2. Execute o script de seed do Prisma para popular o banco de dados com dados de teste:
   ```sh
   npx prisma db seed
3. Abra o Prisma Studio para visualizar e interagir com os dados do banco de dados:
   ```sh
   npm run db:studio
