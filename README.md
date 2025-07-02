# ADS - Análise e Desenvolvimento de Sistemas
# Aluno: Ronaldo Ottoni Borges de Carvalho
# RU: 4385395

# MediCare Free - Projeto FullStack, podendo rodar com Docker ou Localmente

## ▶️ 🚀 Como subir e executar o projeto localmente
- Node.JS instalado (https://nodejs.org/en/download)
- MySQL Instalado (https://dev.mysql.com/downloads/installer/)
- Download do projeto no GitHub (https://github.com/ronaldoottoni/medicareFree.git)

1. Extraia o `.zip`

2. Abrir um terminal (pode ser via VSCode)
    - Acessar a pasta do backend e rodar os comandos um de cada vez
        cd medicare-backend 
        python -m venv venv
        .\venv\Scripts\activate
        uvicorn app.main:app --reload

3. Abrir um segundo terminal (pode ser via VSCode)
    - Acessar a pasta do frontend e rodar o comando
        cd medicare-frontend
        npm run dev

4. Acessar
    - Sistema: [http://localhost:3000]
    - Login: admin@medicare.com
    - Senha: admin123

5. Cadastre Novos cuidadores

6. Cadastre Novos Residentes

7. Cadastre Novos medicamentos

8. Cadastre Novos agendamentos

9. Veja o painel de medicações no Dashboard


## ▶️ 🚀 Como subir e executar o projeto com container 

## ✅ Requisitos
- Docker instalado (https://www.docker.com/products/docker-desktop)
- Download do projeto no GitHub (https://github.com/ronaldoottoni/medicareFree.git)

1. Extraia o `.zip`

2. Vá até a pasta medicare-backend:
    cd medicare/medicare-backend

    abrir o arquivo ".env"
    alterar o conteúdo da variável MYSQL_HOST:
        de: localhost
        para: db
        "MYSQL_HOST=localhost" => "MYSQL_HOST=db"

3. volte na pasta  raiz do projeto:
    cd ..

3. Suba os containers:
    docker-compose up --build
    
4. Acesse:
- Sistema: [http://localhost:3000]
- Login: admin@medicare.com
- Senha: admin123

5. Cadastre Novos cuidadores

6. Cadastre Novos Residentes

7. Cadastre Novos medicamentos

8. Cadastre Novos agendamentos

9. Veja o painel de medicações no Dashboard





