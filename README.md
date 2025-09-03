API-FINANCEIRO

💰 API para gerenciamento financeiro pessoal, desenvolvida com Node.js, TypeScript e Prisma.

📄 Descrição

A API-FINANCEIRO é uma aplicação backend para controle de finanças pessoais, permitindo ao usuário registrar e visualizar suas receitas e despesas de forma segura e eficiente. Desenvolvida com Node.js, TypeScript e Prisma, a API oferece endpoints RESTful para integração com aplicações frontend.

🚀 Tecnologias Utilizadas

Node.js

TypeScript

Prisma

Express

📂 Estrutura do Projeto

src/: Diretório contendo os arquivos-fonte da aplicação.

prisma/: Diretório contendo o esquema do banco de dados e migrações.

.gitignore: Arquivos e pastas a serem ignorados pelo Git.

.biomeignore: Arquivos e pastas a serem ignorados pelo Biome.

biome.json: Configurações do Biome.

package.json: Gerenciamento de dependências e scripts.

tsconfig.json: Configurações do TypeScript.

yarn.lock: Gerenciamento de versões das dependências.

🧪 Como Rodar o Projeto

Clone o repositório:

git clone https://github.com/analauracano/API-FINANCEIRO.git
cd API-FINANCEIRO


Instale as dependências:

yarn install


Configure o banco de dados:

Crie um banco de dados PostgreSQL.

Atualize as credenciais no arquivo .env.

Execute as migrações do Prisma:

yarn prisma migrate dev


Inicie o servidor:

yarn dev


Acesse a API no navegador ou ferramenta de testes de API: http://localhost:3000.

🛠️ Como Contribuir

Faça um fork deste repositório.

Crie uma branch para sua modificação (git checkout -b feature/nova-funcionalidade).

Realize suas alterações e faça commit (git commit -am 'Adiciona nova funcionalidade').

Envie para o repositório remoto (git push origin feature/nova-funcionalidade).

Abra um pull request.

📌 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE
 para mais detalhes.
